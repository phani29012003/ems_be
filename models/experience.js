var mongoose = require('mongoose');

var experienceSchema=mongoose.Schema({
    uid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    registerId:{type:String},
    company:{type:String},
    role:{type:String},
    from:{type:String},
    to:{type:String}
});

module.exports=mongoose.model("experience",experienceSchema);