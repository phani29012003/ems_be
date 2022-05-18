var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var deanSchema=mongoose.Schema({
    registerId:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    school:{type:String, required:true},
    name:{type:String, required:true}
});
deanSchema.plugin(uniqueValidator);
module.exports=mongoose.model("dean",deanSchema);