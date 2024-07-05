

export const typeDefs = `
scalar JSON
scalar Upload

input User{
    uid:String
    password:String
    phone:String
    address:String
    role:String
}
input loginInput{
    uid:String
    password:String
    role:String
}
input ProductInput{
    uid:String
    name:String
    cost:Int
    path:String
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
    path:String
    _id:String
}
type Query{
   login(data:loginInput):JSON
   getVendors:[Vendor]
   getProducts(id:String):[Product]
}

type Mutation{
    registerVendor(data:User):JSON
    updateVendor(data:User,id:String):JSON
    deleteVendor(id:String):JSON
    saveProduct(file: Upload,product:ProductInput ):JSON
    updateProduct(file:Upload,data:ProductInput,updateProductId:String):JSON
    deleteProduct(id:String,pathName:String):JSON
    changePassword(currPwd:String,newPwd:String,id:String):JSON
}

`