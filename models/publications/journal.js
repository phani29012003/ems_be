const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const journalSchema = mongoose.Schema({
    type:{type:String},
    publicationYear:{type:String},
    publicationLevel:{type:String},
    title:{type:String},
    authorName:{type:String},
    journalName:{type:String},
    issnNo:{type:String},
    eissnNo:{type:String},
    volumeNo:{type:String},
    issueNo:{type:Boolean},
    startPage:{type:Number},
    endPage:{type:Number},
    isWebOfScience:{type:String},
    isPubMed:{type:String},
    isIeee:{type:String},
    isIci:{type:String},
    isGoogleScholar:{type:String},
    isCoauthByUgStudent:{type:String},
    isCoauthbyPgStudent:{type:String},
    proof:{type:String},
    uid:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
    registerId:{type:String}
});
journalSchema.plugin(uniqueValidator);
module.exports = mongoose.model("journal", journalSchema);