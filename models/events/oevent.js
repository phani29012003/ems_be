const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const oeventSchema = mongoose.Schema({
    role:{type:String},
    academicYear:{type:String},
    eventLevel:{type:String},
    eventType:{type:String},
    eventTitle:{type:String},
    organizationName:{type:String},
    organizationType:{type:String},
    fromDate:{type:String},
    toDate:{type:String},
    proof:{type:String},
    uid:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
    registerId:{type:String}
});
oeventSchema.plugin(uniqueValidator);
module.exports = mongoose.model("oevent", oeventSchema);