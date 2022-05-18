const express   = require('express');
const router    = express.Router();
const bycrpt    = require('bcrypt');
const patent    = require('../models/publications/patent');
const conference = require('../models/publications/conference');
const journal   = require('../models/publications/journal');

router.get('/patent',async(req,res)=>{
    try{
        const list = await patent.find();
        res.json(list);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/conference',async(req,res)=>{
    try{
        const list = await conference.find();
        res.json(list);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/journal',async(req,res)=>{
    try{
        const list = await journal.find();
        res.json(list);
    }catch(err){
        res.json({message:err});
    }
});
//==========================================================================
router.post('/patent',async(req,res)=>{
    const newPatent = new patent({
        type:req.body.type,
        academicYear:req.body.academicYear,
        firstApplication:req.body.firstApplication,
        secondApplication:req.body.secondApplication,
        thirdApplication:req.body.thirdApplication,
        forthApplication:req.body.forthApplication,
        patentTitle:req.body.patentTitle,
        applicationNo:req.body.applicationNo,
        countryApplied:req.body.countryApplied,
        filledDate:req.body.filledDate,
        status:req.body.status,
        patentNo:req.body.patentNo,
        awardedDate:req.body.awardedDate,
        proof:req.body.proof,
        uid: req.body.uid,
        registerId:req.body.registerId
    });
    try {
        const newpublication =await newPatent.save();
        res.json(newpublication);
    } catch (err) {
        res.json({message : err});
    }
});
router.post('/conference',async(req,res)=>{
    const newConference = new conference({
        type:req.body.type,
        publicationYear:req.body.publicationYear,
        publicationLevel:req.body.publicationLevel,
        contentType:req.body.contentType,
        contentTitle:req.body.contentTitle,
        isbnNo:req.isbnNo,
        authorName:req.body.authorName,
        publishername:req.body.publishername,
        proof:req.body.proof,
        uid:req.body.uid,
        registerId:req.body.registerId
    });
    try {
        const newpublication =await newConference.save();
        res.json(newpublication);
    } catch (err) {
        res.json({message : err});
    }
});
router.post('/journal',async(req,res)=>{
    const newJournal = new journal({
        type:req.body.type,
        publicationYear:req.body.publicationYear,
        publicationLevel:req.body.publicationLevel,
        title:req.body.title,
        authorName:req.body.authorName,
        journalName:req.body.journalName,
        issnNo:req.body.issnNo,
        eissnNo:req.body.eissnNo,
        volumeNo:req.body.volumeNo,
        issueNo:req.body.issueNo,
        startPage:req.body.startPage,
        endPage:req.body.endPage,
        isWebOfScience:req.body.isWebOfScience,
        isPubMed:req.body.isPubMed,
        isIeee:req.body.isIeee,
        isIci:req.body.isIci,
        isGoogleScholar:req.body.isGoogleScholar,
        isCoauthByUgStudent:req.body.isCoauthByUgStudent,
        isCoauthbyPgStudent:req.body.isCoauthbyPgStudent,
        proof:req.body.proof,
        uid:req.body.uid,
        registerId:req.body.registerId
    });
    try {
        const newpublication =await newJournal.save();
        res.json(newpublication);
    } catch (err) {
        res.json({message : err});
    }
});
//=========================================================================
router.get('/patent/:uid',function(req,res){
    patent.find({uid:req.params.uid},function(err,foundPublication){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundPublication);
        }
    });
});
router.get('/conference/:uid',function(req,res){
    conference.find({uid:req.params.uid},function(err,foundPublication){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundPublication);
        }
    });
});
router.get('/journal/:uid',function(req,res){
    journal.find({uid:req.params.uid},function(err,foundPublication){
        if(err){
            res.json({message:err});
        }else{
            res.json(foundPublication);
        }
    });
});

module.exports=router;