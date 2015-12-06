var express = require('express');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds061974.mongolab.com:61974/ksks');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

var kunal = User({
    
   username: 'king-saddi',
   password: 'kunal'
    
});

kunal.save(function(err) {
   if (err) throw err; 
   console.log('User kunal Saved!!');
    
});


var app = express();

//app.use(morgan('combined'));  //for logging

app.use(serveStatic(__dirname + '/public'));

app.use('/output', function(req, res, next){
    console.log('Request URL:' + req.url);
    
    User.find({}, function(err, users){
        if(err) throw err;
        
        console.log(users);
    });
    
    next();
});


var port = 3000;
app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), function () {
  console.log('Static server listening on port %s', server.address().port);
});