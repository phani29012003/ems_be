const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const organizedSchema = mongoose.Schema({
    role:{type:String,default:"Organized"},
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
    registerId:{type:String},
    participants:{type:Number,default:0},
    internalStudents:{type:Number,default:0},
    externalStudents:{type:Number,default:0},
    internalFaculty:{type:Number,default:0},
    externalFaculty:{type:Number,default:0},
    totalExpendicture:{type:Number,default:0},
    revenue:{type:Number,default:0},
    expenditureByUniversity:{type:Number,default:0},
    expenditureBySponsors:{type:Number,default:0}
});
organizedSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Organized", organizedSchema);