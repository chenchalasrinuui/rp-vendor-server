

export const typeDefs = `
 scalar JSON
input User{
    uid:String
    password:String
    role:String
}
type Vendor{
    uid:String
    password:String
    role:String
}
type Query{
   loginAdmin(data:User):JSON
   getVendors:[Vendor]
}

type Mutation{
    registerVendor(data:User):JSON
}

`