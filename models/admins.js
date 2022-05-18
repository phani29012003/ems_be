const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const adminSchema = mongoose.Schema({
    registerId:{type:String, required:true, unique:true},
    name :{type:String, required:true},
    password:{type:String, required:true},
});
adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("admins", adminSchema);