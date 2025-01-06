const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sanju010305:nwXUcHIa7LdliRzE@cluster1.gqtd9.mongodb.net/loginUser");

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    require:true,
    unique:true
    },
    Email:{
    type:String,
    require:true,
    unique:true
    },
    password:{
    type:String,
    require:true,
    unique:true
    }

})
const user= mongoose.model('user', userSchema);