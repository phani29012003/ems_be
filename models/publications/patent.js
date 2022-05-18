const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const patentSchema = mongoose.Schema({
    type:{type:String},
    academicYear:{type:String},
    firstApplication:{type:String},
    secondApplication:{type:String},
    thirdApplication:{type:String},
    forthApplication:{type:String},
    patentTitle:{type:String},
    applicationNo:{type:String},
    countryApplied:{type:String},
    filledDate:{type:String},
    status:{type:String},
    patentNo:{type:String},
    awardedDate:{type:String},
    proof:{type:String},
    uid:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
    registerId:{type:String}
});
patentSchema.plugin(uniqueValidator);
module.exports = mongoose.model("patent", patentSchema);