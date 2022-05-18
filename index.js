const express         = require('express'),
      bodyParser      = require('body-parser'),
      expressSanitizer= require('express-sanitizer'),
      sessions        = require('express-session'),
      bcrypt          = require('bcrypt'),
      mongoose        = require('mongoose'),
      methodOverride  =require('method-override'),
      cookieParser    = require('cookie-parser'),
      cors            = require('cors');
const uroutes = require('./routes/user');
const droutes = require('./routes/dean');
const aroutes = require('./routes/Auth');
const eroutes = require('./routes/event');
const proutes = require('./routes/publication');
const exroutes = require('./routes/experience');
const adroutes = require('./routes/admins');
const pjroutes  = require('./routes/project');
const path=require('path');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'filesfolder')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
var upload =multer({storage:storage});




mongoose.connect('mongodb://localhost/ems',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log("Connected to DB!!"))
.catch(error => console.log(error.message));


app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret :"thisismysecertkeyabcdfghj",
    cookie:{maxAge:300000},
    resave:false,
    saveUninitialized:false
}));
app.use(cors({origin:"*"}));
app.use('/images',express.static(path.join('images')))
app.use('/user',uroutes);
app.use('/dean',droutes);
app.use('/admins',adroutes);
app.use('/event',eroutes);
app.use('/publication',proutes);
app.use('/project',pjroutes);
app.use('/experience',exroutes);
app.use('/',aroutes);
app.post('/files',upload.single('file'),(req,res,next)=>{
});
app.get('/download/:fn', function(req, res){
    const file = `filesfolder/${req.params.fn}`;
    res.download(file); // Set disposition and send it.
  });




app.listen(2345,function(){
    console.log("Listening to the port 2345");
});