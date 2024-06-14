

export const typeDefs = `
scalar JSON
input User{
    uid:String
    password:String
    phone:String
    address:String
    role:String
}
input ProductInput{
    uid:String
    name:String
    cost:Int
    photo:String
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
type Product{
    name:String,
    cost:Int,
    uid:String,
    photo:String
    _id:String
}
type Query{
   login(data:User):JSON
   getVendors:[Vendor]
   getProducts:[Product]
}

type Mutation{
    registerVendor(data:User):JSON
    updateVendor(data:User,id:String):JSON
    deleteVendor(id:String):JSON
    saveProduct(data:ProductInput):JSON
    updateProduct(data:ProductInput,id:String):JSON
    deleteProduct(id:String):JSON
    changePassword(password:String,id:String):JSON
}

`