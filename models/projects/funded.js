const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const fundedSchema = mongoose.Schema({
    academicYear:{type:String},
    degree:{type:String},
    organizerErpId1:{type:String},
    coOrganizerErpId2:{type:String},
    coOrganizerErpId3:{type:String},
    projectTitle:{type:String},
    startDate:{type:String},
    endDate:{type:String},
    noOfStudents:{type:String},
    list:{type:String},
    proof:{type:String},
    uid:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
    registerId:{type:String}
});
fundedSchema.plugin(uniqueValidator);
module.exports = mongoose.model("funded", fundedSchema);