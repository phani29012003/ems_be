const express = require('express');

const router  = express.Router();
const experience = require('../models/experience');

router.get('/', async (req,res)=>{
    try{
        const list = await experience.find();
        res.json(list);
    }catch(err){
        res.json({message : err});
    }
});
router.post('/new',async(req,res)=>{
    const newExperience = new experience({
        uid:req.body.uid,
        registerId:req.body.registerId,
        company:req.body.company,
        role:req.body.role,
        from:req.body.from,
        to:req.body.to
    })
    try{
        const Experience = await newExperience.save();
        res.json(Experience);
    }catch(err){
        res.json({message : err});
    }
});
router.get('/:uid',function(req,res){
    experience.find({uid:req.params.uid},function(err,foundexperience){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundexperience);
        }
    });
});

module.exports=router;