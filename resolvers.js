import getDB from "./utils/DBconn.js"

export const resolvers = {
    Query: {
        loginAdmin: async (parent, args, context, info) => {
            try {
                const db = await getDB()
                const collection = db.collection("admin")
                const users = await collection.findOne(args?.data)
                return users

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
        }
    }
}