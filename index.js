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
app.use('/user',uroutes);
app.use('/dean',droutes);
app.use('/event',eroutes);
app.use('/publication',proutes);
app.use('/experience',exroutes);
app.use('/',aroutes);




app.listen(2345,function(){
    console.log("Listening to the port 2345");
});