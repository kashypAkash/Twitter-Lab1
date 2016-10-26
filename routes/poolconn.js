var mysql=require("mysql");
var poolarr=[];
var createPool=function(callback2){
	
	for(var i=0;i<20;i++){
		poolarr.push(mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "root",
			  database: "twitter_dev"
			}));
		
	}
	console.log("hi"+poolarr.pop());
	callback2();
	
};
exports.getConnection=function(mycallback){
	var connection;
	connection=poolarr.pop();
	console.log("connection is"+connection);
	if(connection){
		console.log("hi");
		mycallback(connection);
	}
	else{
		var callback2=function(){
			var c=poolarr.pop();
			console.log("hello"+c);
			mycallback(c);
		};
		createPool(callback2);
		}
};

var addConnection= function(){
	console.log("in the add connection"+poolarr.length);
	poolarr.push(mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "twitter_dev"
		}));
	console.log(poolarr.length);
};

exports.releaseConnection=function(c){
	//c.end();
	//addConnection();
	poolarr.push(c);
};