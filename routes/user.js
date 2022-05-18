const express = require('express');
const router = express.Router();
const bycrpt = require('bcrypt');
const User = require('../models/User');

const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
var upload =multer({storage:storage});
router.post('/image',upload.single('file'),(req,res,next)=>{
});

router.get('/', async (req,res)=>{
    try{
        const list = await User.find();
        res.json(list);
    }catch(err){
        res.json({message : err});
    }
});


router.post('/new',async(req,res)=>{
    const hashedPassword = await bycrpt.hash(req.body.password,10);
    const user = new User({
        registerId:req.body.registerId,
        name:req.body.name,
        password:hashedPassword,
        mail:req.body.mail,
        phonenumber:req.body.phonenumber,
        school:req.body.school,
        position:req.body.position,
        personalEmail:req.body.personalEmail,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        postalCode:req.body.postalCode,
        state:req.body.state,
        country:req.body.country,
        image:req.body.image
    });
    try{
        const newuser = await user.save();
        res.json(newuser);
    }catch(err){
        res.json({message : err});
    }
});

router.get('/:uid',async(req,res)=>{
    try {
        User.findById(req.params.uid,function(err,userfound){
            if(err){
                res.json("User does not exist");
            }
            else{
                res.json(userfound)
            }
        })
    } catch (error) {
        res.json({message : err});
    }
});
// router.get('/experience/:id',function(req,res){
//     User.findById(req.params.id).populate("experience").exec(function(err,foundexperience){
//         if(err){
//             console.log(err);
//             res.json({message : err});
//         }
//         else{
//             res.json(foundexperience);
//         }
//     });
// });
router.get('/school/:sch',function(req,res){
    User.find({school:req.params.sch},function(err,users){
        if(err){
            console.log({message:err});
        }else{
            res.json(users);
        }
    });
});

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
                    //return res.json(data);
                    // need to implement login here are in Auth.js seperately
                    return res.status(200).json({ msg: "Login success" });
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" });
                }

            });

        });
});
router.put('/:uid/edit',async(req,res,next)=>{
    let imgpath="http://localhost:2345/images/"
    User.findOneAndUpdate({_id:req.params.uid},{
        $set:{
            name:req.body.name,
            phonenumber:req.body.phonenumber,
            school:req.body.school,
            position:req.body.position,
            personalEmail:req.body.personalEmail,
            address1:req.body.address1,
            address2:req.body.address2,
            city:req.body.city,
            postalCode:req.body.postalCode,
            state:req.body.state,
            country:req.body.country,
            image:imgpath.concat(req.body.image)
        }
    }).then(result=>{
        res.json("Updated succesfully");
    })
    .catch(err=>{
        res.status(500);
    })

})
module.exports= router;

