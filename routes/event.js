const express   = require('express');
const router    = express.Router();
const bycrpt    = require('bcrypt');
const oevent    = require('../models/events/oevent');
const organizedevent    = require('../models/events/organized');

router.get('/organizedEvents',async(req,res)=>{
    try {
        const list = await organizedevent.find();
            res.json(list);
    } catch (err) {
        res.json({message:err});
    }
});
router.get('/attended',function(rq,res){
    oevent.find({role:"attended"},function(err,events){
        if(err){
            res.json({message:err});
        }else{
            res.json(events);
        }
    });
});
router.get('/delivered',function(rq,res){
    oevent.find({role:"delivered"},function(err,events){
        if(err){
            res.json({message:err});
        }else{
            res.json(events);
        }
    });
});
router.post('/organized',async(req,res)=>{
    const newOrganizedEvent = new organizedevent({
        role:req.body.role,
        academicYear:req.body.academicYear,
        eventLevel:req.body.eventLevel,
        eventType:req.body.eventType,
        eventTitle:req.body.eventTitle,
        organizationName:req.body.organizationName,
        organizationType:req.body.organizationType,
        fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        proof:req.body.proof,
        uid: req.body.uid,
        registerId:req.body.registerId,
        participants:req.body.participants,
        internalStudents:req.body.internalStudents,
        externalStudents:req.body.externalStudents,
        internalFaculty:req.body.internalFaculty,
        externalFaculty:req.body.externalFaculty,
        totalExpendicture:req.body.totalExpendicture,
        revenue:req.body.revenue,
        expenditureByUniversity:req.body.expenditureByUniversity,
        expenditureBySponsors:req.body.expenditureBySponsors
    });
    try {
        const newevent = await newOrganizedEvent.save();
        res.json(newevent);
    } catch (err) {
        res.json({message : err});
    }
});
router.post('/addEvent',async(req,res)=>{
    const newEvent = new oevent({
        role:req.body.role,
        academicYear:req.body.academicYear,
        eventLevel:req.body.eventLevel,
        eventType:req.body.eventType,
        eventTitle:req.body.eventTitle,
        organizationName:req.body.organizationName,
        organizationType:req.body.organizationType,
        fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        proof:req.body.proof,
        uid: req.body.uid,
        registerId:req.body.registerId
    });
    try {
        const eve = await newEvent.save();
        res.json(eve);
    } catch (err) {
        res.json({message : err});
    }
});
router.get('/getEvent/:uid',function(req,res){
    oevent.find({uid:req.params.uid},function(err,foundEvent){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundEvent);
        }
    });
});
router.get('/getOrganizedEvent/:uid',function(req,res){
    organizedevent.find({uid:req.params.uid},function(err,foundEvent){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundEvent);
        }
    });
});
module.exports= router;