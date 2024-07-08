import getDB from "./utils/DBconn.js"
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb"
import { GraphQLUpload } from 'graphql-upload'
import fs from 'fs'
import { finished } from 'stream/promises'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        login: async (parent, args, context, info) => {
            try {
                const db = await getDB()
                const collection = db.collection(args?.data?.role)

                const user = await collection.findOne(args?.data)
                console.log(1, user)
                if (user) {
                    const token = jwt.sign(args?.data, 'appToken')
                    user.token = token;
                }
                return user

            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
            finally {

            }
        },
        getVendors: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendor")
                const result = await collection.find().toArray();
                return result;
            } catch (ex) {
                console.error(ex)
                return ex.message
            }
        },
        getProducts: async (parent, args, context, info) => {
            try {
                const db = await getDB()
                const collection = db.collection("products")
                const result = await collection.find({ uid: args.id }).toArray()
                return result;
            } catch (ex) {

            }
        }
    },
    Mutation: {
        registerVendor: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendor")
                let data = args.data
                const res = await collection.find({ uid: data.uid }).toArray()
                if (res.length > 0) {
                    throw new Error("user already existed")
                }

                if (!data.role) {
                    data = { ...data, role: "vendor" }
                }
                const result = await collection.insertOne(data)
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
        },
        updateVendor: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendor")
                const data = args.data
                const result = await collection.updateOne({ _id: ObjectId.createFromHexString(args.id) }, { $set: data })
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
        },
        deleteVendor: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendor")
                const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(args.id) })
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
        },
        saveProduct: async (parent, { file, product }, context, info) => {
            const { createReadStream, filename } = await file;
            const productName = `${product?.uid}_${new Date().getTime()}.${filename?.split('.')?.pop()}`
            const stream = createReadStream();
            const outPath = path.join(__dirname, `/uploads/${productName}`);
            const out = fs.createWriteStream(outPath);
            stream.pipe(out);
            await finished(out);
            const db = await getDB();
            const collection = db.collection("products")
            const result = await collection.insertOne({ ...product, timeStamp: new Date().getTime(), path: `/uploads/${productName}` })
            return result
        },
        updateProduct: async (parent, { file, data, updateProductId }, context, info) => {
            try {
                if (file) {
                    const { createReadStream } = await file;
                    const productName = `${data?.path?.split('/')?.pop()}`
                    const stream = createReadStream();
                    const outPath = path.join(__dirname, `/uploads/${productName}`);
                    const out = fs.createWriteStream(outPath);
                    stream.pipe(out);
                    await finished(out);
                }
                const db = await getDB();
                const collection = db.collection("products")
                const result = await collection.updateOne({ _id: ObjectId.createFromHexString(updateProductId) }, { $set: { ...data, timeStamp: new Date().getTime() } })
                return result;
            } catch (ex) {
                console.error(ex);
                return ex;
            }
        },
        deleteProduct: async (parent, { id, pathName }, context, info) => {
            try {
                const filePath = path.join(__dirname, pathName);
                fs.unlink(filePath, () => { });
                const db = await getDB()
                const collection = db.collection("products")
                const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
                return result;
            } catch (ex) {
                console.error(ex.message);
                return ex.message;
            }
        },
        changePassword: async (parent, { currPwd, newPwd, id }, context, info) => {
            try {

                const db = await getDB()
                const collection = db.collection('vendor')
                const user = await collection.find({ _id: ObjectId.createFromHexString(id), password: currPwd }).toArray()
                if (user.length > 0) {
                    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { password: newPwd } })
                    return result;
                }
                return {
                    "acknowledged": true,
                    "modifiedCount": 0,
                }

            } catch (ex) {
                console.error(ex.message);
                return ex.message
            }

        }

    }
}