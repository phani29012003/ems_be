const express = require('express');
const router = express.Router();
const bycrpt = require('bcrypt');
const Dean = require('../models/dean');

router.get('/', async (req,res)=>{
    try{
        const list = await Dean.find();
        res.json(list);
    }catch(err){
        res.json({message : err});
    }
});

router.post('/new',async(req,res)=>{
    const hashedPassword = await bycrpt.hash(req.body.password,10);
    const dean = new Dean({
        registerId:req.body.registerId,
        name:req.body.name,
        password:hashedPassword,
        mail:req.body.mail,
        school:req.body.school,
    });
    try{
        const newdean = await dean.save();
        res.json(newdean);
    }catch(err){
        res.json({message : err});
    }
});

router.post('/login', (req, res) => {
    const registerId = req.body.registerId
    const password = req.body.password
    Dean.findOne({ registerId })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User not exist" });
            bycrpt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                if (data) {
                    req.session.user =user;
                    console.log(req.session.user._id);
                    return res.status(200).json({ msg: "Login success",name:req.session.user.name,school:req.session.user.school});
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" });
                }

            });

        });
});

router.get('/check',(req,res) => {
    if(req.session.user){
        console.log(req.session.user._id);
        res.json("Welcome Dean");
    }else
    res.json("No seesion created");
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    console.log("Seesion destroyed");
});

router.get('/:did',async(req,res)=>{
    try {
        Dean.findById(req.params.did,function(err,deanfound){
            if(err){
                res.json("Dean does not exist");
            }
            else{
                res.json(deanfound)
            }
        })
    } catch (error) {
        res.json({message : err});
    }
});

module.exports= router;