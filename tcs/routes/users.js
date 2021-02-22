var express = require('express');
var router = express.Router();
var monk = require('monk');
var moment = require('moment');
var db = monk('localhost:27017/Health');
var collection = db.get('userdata');
var collection2 = db.get('updateuserdata');
var login = db.get('login')
var {spawn} = require('child_process');

router.get('/login', function(req, res, next) {
  res.render('userlogin')
});

router.post('/login', function(req,res){
	console.log(req.body)
	login.findOne({"email":req.body.username,"password":req.body.password}, function(err,docs){
		if(err || (docs==null)){
			res.sendStatus(500)
		}
		else{
			req.session.user = docs
			res.sendStatus(200)
		}
	})
})

router.get('/home', function(req,res){
  if(req.session && req.session.user){
  	console.log(req.session.user)
	res.render('userhome')
  }
  else{
  	req.session.reset();
  	res.redirect('/login')
  }
})


router.get('/gettinguserdata', function(req,res){
	if(req.session && req.session.user){
		collection.find({"username":req.session.user.username}, function(err,docs){
			res.send(docs)
		})
	}
})

router.get('/individual', function(req,res){
  if(req.session && req.session.user){
  	console.log(req.session.user)
	res.render('userindividual')
	// res.render('userhome')
  }
  else{
  	req.session.reset();
  	res.redirect('/login')
  }
})
	var datavar = '' 

router.post('/postindividualdata', function(req,res){

var sampleArray = [
	"",
  "Diabetis",
 	"",
  "Bronchie",
  "",
  "CHD",
  "",
  "Hypoxemia",
  "",
  "Asthma",
  ""
];

  var obj = {}


	// console.log(req.body)
	var python = spawn('python', ['C:/Users/niceb/Desktop/tcs/routes/trailcode.py', req.body.gender, req.body.age, req.body.PrevalentHyp, req.body.Diabetes, req.body.Cholesterol, req.body.SysBP, req.body.DiaBP, req.body.BMI, req.body.HeartRate, req.body.Glucose, req.body.BreathRate, req.body.SpO2]);
	python.stdout.on('data', function (data) {
	  console.log('Pipe data from python script ...');
	  console.log(data.toString())
	  datavar = data.toString()
  for (var i = 0 ; i < sampleArray.length; i++) {
        obj[sampleArray[i]] = Number(datavar[i]);
        // console.log(datavar[i])
    }
	  res.send(obj)
	 });
	 python.on('close', (code) => {
	 console.log(`child process close all stdio with code ${code}`);
	 });
})



module.exports = router;
