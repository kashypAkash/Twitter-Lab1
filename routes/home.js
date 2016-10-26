var ejs = require('ejs');
var mydb= require('./mydb');
var bcryptnjs = require('bcrypt-nodejs');


// validate with hash
exports.validate = function(req,res){
	var userpassword = req.param("password");
    var getuser = "SELECT * FROM users_info " +
        "WHERE useremail='" + req.param("email")+
        "'";
    console.log(getuser);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {	console.log(result[0].password);
            	
            	  bcryptnjs.compare(userpassword, result[0].password, function(err,isPassword) {
            	  	  if(isPassword){
                          console.log(req.param("email"));
                          req.session.email = req.param("email");

                          res.send({"statusCode" : 200});
                         
                          console.log('session saved' + req.session.email);
            	  	  }
            	  	  else{
            	  		  
            	  		  res.send({"statusCode":401});
            	  		  console.log("invalid password");
            	  		  
            	  	  }
                      
            	  });
            	  
            }
            else{
                console.log('try again');
                res.send({"statusCode" : 401});
               // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },getuser)
};

exports.getProfiledata = function(req,res){

     var getuser = "SELECT * FROM users_info " +
        "WHERE useremail='" + req.session.email +"'";
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        console.log(getuser);
        mydb.executeQuery(function(err,result){

            if(err){
                throw err;
            }
            else
            {
                if(result.length>0)
                {   console.log("hi from profile data");
                   // console.log(result);
                    
                }
                else{
                    console.log('try again');
                    
                    // res.render('index',{title: 'Login',message:"username or password is not valid"});
                    
                }

            }
        },getuser);

      /*  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("homepage",{username:req.session.username});*/


};
//gets data for user
exports.getdata = function(req,res){

    var getuser = "SELECT * FROM users_info " +
       "WHERE useremail='" + req.session.email +"'";
       //Set these headers to notify the browser not to maintain any cache for the page being loaded
       console.log(getuser);
       mydb.executeQuery(function(err,result){

           if(err){
               throw err;
           }
           else
           {
               if(result.length>0)
               {   console.log("hi");
   					json_responses = {"statusCode" : 200,
   							"result": result};
   					res.send(json_responses);

               }
               else{
                   console.log('try again');
                   
                   // res.render('index',{title: 'Login',message:"username or password is not valid"});
                   
               }

           }
       },getuser);

     /*  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
       res.render("homepage",{username:req.session.username});*/


};

//redirects to profile
exports.redirectoprofile=function(req,res) {
        //Checks before redirecting whether the session is valid
        if(req.session.email)
        {
            //Set these headers to notify the browser not to maintain any cache for the page being loaded
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
           // res.render("test",{username:req.session.email});
           // res.sendfile('views/alpha.ejs');
            res.render('profile');
        }
        else
        {
            res.redirect('/');
        }
    };
    
    
    
exports.editprofile=function(req,res) {
        //Checks before redirecting whether the session is valid
        if(req.session.email)
        {
            //Set these headers to notify the browser not to maintain any cache for the page being loaded
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
           // res.render("test",{username:req.session.email});
           // res.sendfile('views/alpha.ejs');
            res.render('editprofile');
        }
        else
        {
            res.redirect('/');
        }
 };

//add new user
/*exports.addnewuser=function(req,res){
    var adduser = "INSERT INTO users_info(firstname,lastname,useremail,password)values('"+
        req.param("firstname")+"','"+
        req.param("lastname")+"','"+req.param("useremail")+"','"+
        req.param("password")+"')";
    console.log(adduser);

    mydb.executeQuery(function(err,result){
        if(err){
            throw err;
        }
        else
        {
            console.log('succesfully inserterd');
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
            //
        }

    },adduser);
 //   res.render('index', { title: 'Login' ,message:""});
    //redirect to same page with message
};*/

//add user with with password has
exports.addnewuser=function(req,res){
	var passkey = req.param("password");
	bcryptnjs.hash(passkey, null, null, function(err, hash) {
		var adduser = "INSERT INTO users_info(firstname,lastname,useremail,password)values('"+
        req.param("firstname")+"','"+
        req.param("lastname")+"','"+req.param("useremail")+"','"+
        hash+"')";
		console.log(adduser + "  " + hash);

    mydb.executeQuery(function(err,result){
        if(err){
            //throw err;
        	console.log("error aaja");
        	res.send({error:true});
        }
        else
        {
            console.log('succesfully inserterd');
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
            //
        }

    },adduser);

	});
     //   res.render('index', { title: 'Login' ,message:""});
    //redirect to same page with message
};


exports.logout = function(req,res) {
    req.session.destroy();
    res.send({statuscode:200});
};

//inserts tweet messages
exports.tweetmessage=function(req,res){
	console.log("from tweet api");
    var tweetInsert = "INSERT INTO tweet(useremail,tweet_message,isretweet,attime)values('"+ req.session.email +"','" + req.param("tweetmsg")+"','no',now())";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(tweetInsert);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
        	console.log('tweet succesfully inserterd');
   			json_responses = {"statusCode" : 200};
   			res.send(json_responses);
        }
    },tweetInsert);
	
};

// insert retweet to user tweets
exports.retweetinsert=function(req,res){
	console.log("from tweet api");
    var retweetInsert = "INSERT INTO tweet(useremail,tweet_message,tweetof,isretweet,attime)values('"+req.session.email +"','"+ req.param("tweettext")+"','"+ req.param("tweetof")+ "','true',now())";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(retweetInsert);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
        	console.log('retweet succesfully inserterd');
   			json_responses = {"statusCode" : 200};
   			res.send(json_responses);
        }
    },retweetInsert);
	
};

exports.updateprofileinfo=function(req,res){
	console.log("from update api");
	
    var update = "UPDATE users_info SET dob='"+req.param("birthday")+"', contact='"+ req.param("contact")+"', location='"+req.param("location")+ 
	"', twitterhandle='"+req.param("twitterhandle")+"' WHERE useremail='"+req.session.email+"'";
    
    console.log(update);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
        	console.log('updated succesfully ');
   			json_responses = {"statusCode" : 200};
   			res.send(json_responses);
        }
    },update);
	
};


exports.getupdatedetails=function(req,res){
	 var updatedetail = "SELECT * FROM users_info WHERE useremail='" + req.session.email +"'";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(updatedetail);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my update query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('no tweets');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },updatedetail);

};


//return user tweet messages
exports.mytweetmsg=function(req,res){
	 var getmytweets = "SELECT tweet_id,useremail,tweet_message,tweetof,isretweet FROM tweet WHERE useremail='" + req.session.email +"'";
     //Set these headers to notify the browser not to maintain any cache for the page being loaded
     console.log(getmytweets);
     mydb.executeQuery(function(err,result){

         if(err){
             throw err;
         }
         else
         {
             if(result.length>0)
             {   console.log("hi from my tweet query");
             		console.log(JSON.stringify(result));
 					json_responses = {"statusCode" : 200,
 							"result": result};
 					res.send(json_responses);

             }
             else{
                 console.log('no tweets');
                 
                 // res.render('index',{title: 'Login',message:"username or password is not valid"});
                 
             }

         }
     },getmytweets);

};

//returns follower tweets-----------
exports.followertweets=function(req,res){
	 var followertweets = "select u.useremail,t.tweet_message from users_info u,(select useremail,tweet_message,tweet_id from tweet where useremail in"
				+"(select isfollowing from follow where useremail = '"+ req.session.email + "')) t where u.useremail = t.useremail ";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(followertweets);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my followers tweets query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('follower tweets');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },followertweets);

};

//returns tweet count
exports.gettweetcount = function(req,res){
	 var tweetcount = "SELECT count(tweet_message) as tweetcount FROM tweet WHERE useremail='" + req.session.email +"'";
     //Set these headers to notify the browser not to maintain any cache for the page being loaded
     console.log(tweetcount);
     mydb.executeQuery(function(err,result){

         if(err){
             throw err;
         }
         else
         {
             if(result.length>0)
             {   console.log("hi from my tweet country query");
             		console.log(JSON.stringify(result));
 					json_responses = {"statusCode" : 200,
 							"result": result};
 					res.send(json_responses);

             }
             else{
                 console.log('tweet count is zero');
                 
                 // res.render('index',{title: 'Login',message:"username or password is not valid"});
                 
             }

         }
     },tweetcount);
};

exports.allotherusers = function(req,res){
	
	var otherusers = "SELECT useremail FROM users_info WHERE useremail not in(select isfollowing from follow where useremail='" + req.session.email+"') and useremail not in ('" + req.session.email+"')";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(otherusers);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my tweet country query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('no other users');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },otherusers);

	
};

// to follow a user
exports.tofollow = function(req,res){
    var followuser = "INSERT INTO follow(useremail,isfollowing)values('"+
    req.session.email+"','"+
    req.param("isfollowing")+"')";
console.log(followuser);

mydb.executeQuery(function(err,result){
    if(err){
        throw err;
    }
    else
    {
        console.log('succesfully inserterd');
		json_responses = {"status" : 200};
		res.send(json_responses);
        //
    }

},followuser);
};

// to get the count of users i'm following
exports.followingusers = function(req,res){
	
	var followingcount = "SELECT count(isfollowing) as followcount FROM follow WHERE useremail='" + req.session.email +"'";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(followingcount);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my following users query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('following count is zero');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },followingcount);

	
};

//to get the count of my followers
exports.myfollowers = function(req,res){
	var followerscount = "SELECT count(useremail) as followerscount FROM follow WHERE isfollowing='" + req.session.email +"'";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(followerscount);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my followerscount  query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('no followers');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },followerscount);
};

//to get myfollowerlist
exports.myfollowerslist = function(req,res){
	var myfollowers = "select firstname,lastname,useremail as followeremail from users_info where useremail in(SELECT useremail FROM follow WHERE isfollowing='"+req.session.email+"')";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(myfollowers);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from  myfollowers  query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('no followers');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },myfollowers);
};

//to get my following list
exports.myfollowinglist = function(req,res){
	console.log('troy');
	var followinglist = "select firstname,lastname,useremail as followingemail from users_info where useremail in(SELECT isfollowing FROM follow WHERE useremail='"+req.session.email+"')";
    //Set these headers to notify the browser not to maintain any cache for the page being loaded
    console.log(followinglist);
    mydb.executeQuery(function(err,result){

        if(err){
            throw err;
        }
        else
        {
            if(result.length>0)
            {   console.log("hi from my following users query");
            		console.log(JSON.stringify(result));
					json_responses = {"statusCode" : 200,
							"result": result};
					res.send(json_responses);

            }
            else{
                console.log('following count is zero');
                
                // res.render('index',{title: 'Login',message:"username or password is not valid"});
                
            }

        }
    },followinglist);
    
};

exports.redirecttofollower = function(req,res){
    if(req.session.email)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
       // res.render("test",{username:req.session.email});
       // res.sendfile('views/alpha.ejs');
        res.render('following');
    }
    else
    {
        res.redirect('/');
    }
};

exports.redirecttotweets = function(req,res){
    if(req.session.email)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
       // res.render("test",{username:req.session.email});
       // res.sendfile('views/alpha.ejs');
        res.render('tweets');
    }
    else
    {
        res.redirect('/');
    }
};

exports.my_followers = function(req,res){
    if(req.session.email)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
       // res.render("test",{username:req.session.email});
       // res.sendfile('views/alpha.ejs');
        res.render('followers');
    }
    else
    {
        res.redirect('/');
    }
};
