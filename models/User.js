const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    registerId:{type:String, required:true, unique:true},
    name :{type:String, required:true},
    password:{type:String, required:true},
    mail:{type:String, required:true, unique: true},
    phonenumber:{type:String},
    school:{type:String, required:true},
    position:{type:String, required:true},
    personalEmail:{type:String},
    address1:{type:String},
    address2:{type:String},
    city:{type:String},
    postalCode:{type:String},
    state:{type:String},
    country:{type:String},
    experience:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"experience"
    }],
    image:{type:String}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);