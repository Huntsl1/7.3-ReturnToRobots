const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mustacheExpress = require('mustache-express');
const homeController = require('./controllers/home-controller');
const profileController = require('./controllers/profile-controller');
const path = require('path');
const data = require('./models/data');
const url = "https://tiy-learn-content.s3.amazonaws.com/36d3402e-data.js";

const app = express();

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(function(req,res,next){
  MongoClient.connect('mongodb://localhost:27017/SLHrobots',(err, db) => {
    req.db = db;
    next();
  });
});

app.get('/', (req,res) => {
  const collection = req.db.collection('userData');
  ctx = {};
  collection.find({}).toArray((err,res) =>{
    console.log(res);
    ctx.model = res;
    res.render('directory', ctx);
  });
});

app.get('/:id', (req,res) => {
  const collection = req.db.collection('userData');
  ctx = {};
  let userId = parseInt(req.params.userId);

  collection.find({'id': userId}).toArray((err,res) => {
    ctx.model = results;
    res.render('profile', ctx);
  });
});
app.post('/unemployed', (req,res) => {
  const collection = req.db.collection('userData');
  ctx = {};
  collection.find({'job': null}).toArray((err,res) => {
    console.log(res);
    ctx.model = res;
    res.render('directory', ctx);
  });
});
app.post('/employed', (req,res) => {
  const collection = req.db.collection('userData');
  ctx = {};
  collection.find({'job': {$ne: null}}).toArray((err,res) => {
    console.log(res);
    ctx.model = res;
    res.render('directory', ctx);
  });
});

app.listen(3000, function(){
  console.log("Listening...");
});







/*MongoClient.connect(url, (error, db) => {
  if (err) throw err;
  console.log("Database created!");

  //const col = db.collection("SLHrobots");

  //col.find({}).toArray((error,results) => {
    //console.log(results);
  });

  module.exports = {
    list: (req,res) => {
      context = {};
      MongoClient.connect('mongodb://localhost:27017/SLHrobots', (err, db) => {
        const thing = db.collection("users");
        thing.find({}).toArray((error,results) => {
          context.model = results;
          res.render('user/"mustachefile", context');
        })
      });
    },
    detail: (req,res) => {
      const userId = req.params.id;
      const user = Users.findOne(userId);
      res.render('user/detail',{model: user});
    }
  }*/
