const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const conferenceSchema = mongoose.Schema({
    type:{type:String},
    publicationYear:{type:String},
    publicationLevel:{type:String},
    contentType:{type:String},
    contentTitle:{type:String},
    isbnNo:{type:String},
    authorName:{type:String},
    publisherName:{type:String},
    proof:{type:String},
    uid:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
    registerId:{type:String}
});
conferenceSchema.plugin(uniqueValidator);
module.exports = mongoose.model("conference", conferenceSchema);