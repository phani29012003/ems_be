const express = require('express');
const router = express.Router();
const bycrpt = require('bcrypt');
const admin = require('../models/admins');

router.get('/', async (req,res)=>{
    try{
        const list = await admin.find();
        res.json(list);
    }catch(err){
        res.json({message : err});
    }
});
router.post('/new',async(req,res)=>{
    const hashedPassword = await bycrpt.hash(req.body.password,10);
    const newadmin = new admin({
        registerId:req.body.registerId,
        name:req.body.name,
        password:hashedPassword,
    });
    try{
        const admin = await admin.save();
        res.json(admin);
    }catch(err){
        res.json({message : err});
    }
});
router.post('/login', (req, res) => {
    const registerId = req.body.registerId
    const password = req.body.password
    admin.findOne({ registerId })
        .then(admin => {
            if (!admin) return res.status(400).json({ msg: "User not exist" });
            bycrpt.compare(password, admin.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                if (data) {
                    req.session.admin =admin;
                    console.log(req.session.admin._id);
                    return res.status(200).json({ msg: "Login success" });
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" });
                }

            });

        });
});
module.exports= router;