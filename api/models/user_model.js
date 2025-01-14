import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type :String ,
        require :true ,
        min: 3,
        max: 20 ,
        unique: true
    },
    email: {
        type: String ,
        require :true,
        min :6
    },
    password: {
        type: String ,
        require :true,
        min :6
    },
    profilePicture :{
        type : String ,
        default :""
    },
    coverPicture :{
        type : String ,
        default :""
    },
    followers :{
        type :Array ,
        default :[]
    },
    following: {
        type :Array ,
        default :[]
    },
    isAdmin:{
        type: Boolean ,
        default :false
    },
    desc: {
        type :String ,
        max: 100 
    },
    city: {
        type: String,
    },
    from: {
        type : String 
    },
    relationship:{
        type: Number ,
        enum: [1,2,3]
    }
},{timestamps:true})

export default mongoose.model("User" ,UserSchema)