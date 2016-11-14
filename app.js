var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var mongoose = require('mongoose');
var fs = require('fs');

var db = mongoose.connection;



db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  console.log("Connected to DB");
});

mongoose.connect('mongodb://localhost/words');


//load all files in models//
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

var port = 8080;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

app.get("/dictionary", function (req, res) {
      res.redirect("/dictionary.html");
});



app.get("/words", function (req, res){

    mongoose.model('words').find(function(err, words){

      res.send(words);
    })
} );

app.get("/addword", function (req, res){
  var info = req.query;

  defSON = JSON.parse(info.def);
  console.log(defSON);
  db.collection('words').findOne({word:info.word}, function(err, result) {
    if(result){ //if the word was found, edit

        db.collection('words').update(
        {"word": info.word},

        { $set: { "def": defSON } 


        }
        );
    }
    else{//if the word is not in the database, insert 
       db.collection('words').insert({word: info.word, def: defSON}); 

    }

  
  });
   
} );

app.get("/removeAllWords", function (req, res){

    // var info = req.query;
    db.collection('words').remove({});
   



} );

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
