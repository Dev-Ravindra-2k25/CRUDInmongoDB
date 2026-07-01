const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/monster");

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    image:String,
});
//                      User is model..without that 
//no operation like find,delete...can be performed  

module.exports = mongoose.model("User", userSchema);