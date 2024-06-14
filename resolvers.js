import getDB from "./utils/DBconn.js"
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb"
export const resolvers = {
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
        getProducts: async () => {
            try {
                const db = await getDB()
                const collection = db.collection("products")
                const result = await collection.find({}).toArray()
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
                const result = await collection.updateOne({ _id: ObjectId.createFromHexString(args.id) }, { $set: args.data })
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
        saveProduct: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("products")
                const result = await collection.insertOne(args.data)
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message
            }
        },
        updateProduct: async (parent, args, context, info) => {
            try {
                const { data, id } = args;
                const db = await getDB();
                const collection = db.collection("products")
                const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data })
                return result;
            } catch (ex) {
                console.error(ex);
                return ex;
            }
        },
        deleteProduct: async (parent, args, context, info) => {
            try {
                const db = await getDB()
                const collection = db.collection("products")
                const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(args.id) })
                return result;
            } catch (ex) {
                console.error(ex.message);
                return ex.message;
            }
        },
        changePassword: async (parent, args, context, info) => {
            try {
                const { password, id } = args;
                const db = await getDB()
                const collection = db.collection('vendor')
                const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { password: password } })
                return result;
            } catch (ex) {
                console.error(ex.message);
                return ex.message
            }

        }

    }
}