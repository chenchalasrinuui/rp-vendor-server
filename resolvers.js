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
                const collection = db.collection("vendors")
                const result = await collection.find().toArray();
                return result;
            } catch (ex) {
                console.error(ex)
                return ex.message
            }
        }
    },
    Mutation: {
        registerVendor: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendors")
                const result = await collection.insertOne(args?.data)
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
        },
        updateVendor: async (parent, args, context, info) => {
            try {
                const db = await getDB();
                const collection = db.collection("vendors")
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
                const collection = db.collection("vendors")
                const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(args.id) })
                return result;
            } catch (ex) {
                console.error(ex);
                return ex.message;
            }
        }

    }
}