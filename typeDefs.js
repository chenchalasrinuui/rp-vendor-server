

export const typeDefs = `
 scalar JSON
input User{
    uid:String
    password:String
    phone:String
    address:String
    role:String
}
type Vendor{
    uid:String
    password:String
    role:String
    phone:String
    email:String
    address:String
    _id:String
}
type Query{
   login(data:User):JSON
   getVendors:[Vendor]
}

type Mutation{
    registerVendor(data:User):JSON
    updateVendor(data:User,id:String):JSON
    deleteVendor(id:String):JSON
}

`