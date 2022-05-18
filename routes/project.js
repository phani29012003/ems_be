const express = require('express');
const router = express.Router();
const bycrpt = require('bcrypt');
const funded = require('../models/projects/funded');

router.post('/funded/new',async(req,res)=>{
    const nfunded = new funded({
        academicYear:req.body.academicYear,
        degree:req.body.degree,
        organizerErpId1:req.body.organizerErpId1,
        coOrganizerErpId2:req.body.coOrganizerErpId2,
        coOrganizerErpId3:req.body.coOrganizerErpId3,
        projectTitle:req.body.projectTitle,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        noOfStudents:req.body.noOfStudents,
        list:req.body.list,
        proof:req.body.proof,
        uid:req.body.uid,
        registerId:req.body.registerId
    });
    try{
        const newfunded = await nfunded.save();
        res.json(newfunded);
    }catch(err){
        res.json({message : err});
    }
});
router.get('/funded',function(req,res){
    funded.find().populate("list").exec(function(err,fun){
        if(err){
            res.json(err);
        }else{
            res.json(fun);
        }
    })
    
});
router.get('/funded/:uid',function(req,res){
    funded.find({uid:req.params.uid},function(err,projects){
        if(err){
            console.log({message:err});
        }else{
            res.json(projects);
        }
    });
});
module.exports= router;