/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var session = require('client-sessions'); 
var home = require('./routes/home');

var app = express();

app.use(session({

    cookieName: 'session',
    secret: 'kulja_sim_sim',
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/profile',home.redirectoprofile);
app.get('/gotofollower',function(req,res){
	res.send({"statusCode":200});
});

app.get('/following',home.redirecttofollower);
app.get('/followers',home.my_followers);
app.get('/editprofile',home.editprofile);
app.get('/tweets',home.redirecttotweets);

// POST-------------
app.post('/signup',home.addnewuser);
app.post('/validate',home.validate);
app.post('/logout',home.logout);
app.post('/tweet',home.tweetmessage);
app.post('/follow',home.tofollow);
app.post('/willretweet',home.retweetinsert);
app.post('/updateprofile',home.updateprofileinfo);

//---------api-----
app.get('/api/getdata',home.getdata);
app.get('/api/mytweets',home.mytweetmsg);
app.get('/api/gettweetcount',home.gettweetcount);
app.get('/api/allotherusers',home.allotherusers);
app.get('/api/isfollowing',home.followingusers);
app.get('/api/followers',home.myfollowers);
app.get('/api/followertweets',home.followertweets);
app.get('/api/myfollowerslist',home.myfollowerslist);
app.get('/api/myfollowingusers',home.myfollowinglist);
app.get('/api/getupdatedetails',home.getupdatedetails);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
