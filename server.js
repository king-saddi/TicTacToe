var express = require('express');
var app = express();
var morgan = require('morgan');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Connecting to the Mongo DataBase
mongoose.connect('mongodb://test:test@ds061974.mongolab.com:61974/ksks');

// Defining attributes for the user documents that are stored/received in mongo
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String
});

var UserModel = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/public'));

var router = express.Router();

router.get('/test', function(req, res) {
    // return the whole list
    UserModel.find({}, function(err, user_list){
        if(err) 
            throw err;
        res.send(user_list);
    });
    /*
    // return the id of the user
    else {
        UserModel.find({}, function(err, user_list) {
            if(err) 
                throw err;
            for (var i = 0; i < user_list.length; i++) {
                console.log(user_list[i].username + " == " + mongoUser.username);
                if(user_list[i].username == mongoUser.username) {
                    res.send(mongoUser.username);
                }
            }
        });
    }
    */
});

router.post('/test', function(req, res) {
    var mongoUser = UserModel(req.body);
    
    //storing user into mongo
    mongoUser.save(function(err) {
       if (err) throw err; 
        
       console.log('The following user was saved to mongo:' + mongoUser);
    });

});

app.use('/', router);

var port = 3000;
app.set('port', process.env.PORT || port);


io.on('connection', function(socket){
  console.log('a user connected');
    
    
  socket.on('message', function(msg){
    console.log(msg);  
    io.emit('message', msg);
  });
    
});

http.listen(app.get('port'), function() {
   console.log('Listening on port %s', app.get('port'));
});
