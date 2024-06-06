

export const typeDefs = `
 scalar JSON
input User{
    uid:String
    password:String
    role:String
    phone:String
    email:String
    address:String
}
type Vendor{
    uid:String
    password:String
    role:String
    phone:String
    email:String
    address:String
}
type Query{
   login(data:User):JSON
   getVendors:[Vendor]
}

type Mutation{
    registerVendor(data:User):JSON
}

`