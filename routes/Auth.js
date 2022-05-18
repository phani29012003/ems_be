const express = require('express');
const router  = express.Router();
const bycrpt  = require('bcrypt');
const User    = require('../models/User');
const Dean    = require('../models/dean');
const session = require('express-session');

router.post('/login', (req, res) => {
    const registerId = req.body.registerId
    const password = req.body.password
    User.findOne({ registerId })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User not exist" });
            bycrpt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
                if (data) {
                    req.session.user =user;
                    console.log(req.session.user._id);
                    return res.status(200).json({ msg: "Login success",id: req.session.user._id});
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" });
                }

            });

        });
});

router.get('/check',(req,res) => {
    if(req.session.user){
        res.json("Welcome User session created");
    }else
    res.json("No seesion created");
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    console.log("Seesion destroyed");
});
module.exports= router;