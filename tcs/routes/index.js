var express = require('express');
var router = express.Router();
var monk = require('monk');
var moment = require('moment');
var db = monk('localhost:27017/Health');
var collection = db.get('userdata');
var collection2 = db.get('updateuserdata')
var nodemailer = require('nodemailer');
var {spawn} = require('child_process');
var python = spawn('python', ['C:/Users/niceb/Desktop/tcs/routes/trailcode.py', "Syed", "karthik"]);
var PythonShell =  require('python-shell');
var CronJob = require('cron').CronJob;

var job = new CronJob('30 55 23 * * 0-6', function() {
  collection.aggregate([{"$group":{"_id":{"username":"$username"},"prevalentHyp":{$avg:"$prevalentHyp"},"totChol":{$avg:"$totChol"},"sysBP":{$avg:"$sysBP"},"diaBP":{$avg:"$diaBP"},"BMI":{$avg:"$BMI"},"heartRate":{$avg:"$heartRate"},"BreathRate":{$avg:"$BreathRate"},"glucose":{$avg:"$glucose"},"SpO2":{$avg:"$SpO2"},}}], function(err,docs){
    console.log(docs)
    for(i=0;i<docs.length;i++){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'acetcse201822@gmail.com',
          pass: 'seshareddy'
        }
      });


      var mailOptions = {
        from: 'acetcse201822@gmail.com',
        to: 'krushikreddynallamilli@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'totChol: '+docs[i].totChol+'\n BMI : '+docs[i].BMI+'\n prevalentHyp : '+docs[i].prevalentHyp+'\n sysBP : '+docs[i].sysBP*'\n diaBP : '+docs[i].diaBP+'\n heartRate : '+docs[i].heartRate+'\n BreathRate : '+docs[i].BreathRate+'\n glucose : '+docs[i].glucose+'\n SpO2 : '+docs[i].SpO2
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });      
    }
  })
  }
);
job.start()


router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express' });
});

router.post('/health', function(req,res){
var sampleArray = [
  "Diabetis",
  "Bronchie",
  "CHD",
  "Hypoxemia",
  "Asthma"
];
var sampleArray2 = [
	"male",
	"age",
	"prevalentHyp",
	"diabetes",
	"totChol",
	"sysBP",
	"diaBP",
	"BMI",
	"heartRate",
	"glucose",
	"BreathRate",
	"SpO2"
]
var obj = {
	"username":req.body.uname,
	"date":moment().format('DD-MM-YYYY'),
	'time':moment().format('LTS')
};

for (var i = 0 ; i < sampleArray.length; i++) {
    obj[sampleArray[i]] = Number(req.body.somekey[i]);
}
for (var i = 0 ; i < sampleArray2.length; i++) {
    obj[sampleArray2[i]] = Number(req.body.inputdata[i]);
}


collection2.update({"username":obj.username},{$set:{"SpO2":obj.SpO2,"male":obj.male,"age":obj.age,"prevalentHyp":obj.prevalentHyp,"diabetes":obj.diabetes,"totChol":obj.totChol,"sysBP":obj.sysBP,"diaBP":obj.diaBP,"BMI":obj.BMI,"heartRate":obj.heartRate,"glucose":obj.glucose,"BreathRate":obj.BreathRate,"SpO2":obj.SpO2,"Diabetis":obj.Diabetis,"Bronchie":obj.Bronchie,"CHD":obj.CHD,"Hypoxemia":obj.Hypoxemia,"Asthma":obj.Asthma}},{upsert:true})

collection.insert(obj, function(err,docs){
	res.sendStatus(200)
})

	// console.log(obj)
})

router.get('/login', function(req,res){
  res.render('adminlogin')
})

router.post('/login', function(req,res){
  var uname = req.body.username
  if((req.body.username=='admin')&&(req.body.password=='admin123')){
    req.session.user = uname
    res.sendStatus(200)
  }
  else{
    res.sendStatus(500)
  }
})

router.get('/admin',function(req,res){
  if(req.session && req.session.user){
    res.render('adminhome')
  }
  else{
    req.session.reset();
    res.redirect('/login')
  }
})

router.get('/allusersdata', function(req,res){
  collection2.find({}, function(err,docs){
    res.send(docs)
  })
})

router.get('/logout', function(req,res){
  req.session.reset();
  res.redirect('/login')
})

router.get('/personal', function(req,res){
  res.render('personal')
})


router.post('/gettingpersonal', function(req,res){
  console.log(req.body)
  collection.find({"username":req.body.username}, function(err,docs){
    if(docs){
      res.send(docs)
    }
    else{
      res.sendStatus(500)
    }
  })
})

module.exports = router;

