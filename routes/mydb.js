/**
 * Created by Akash on 3/10/2016.
 */
var mydb = require('mysql');
var ejs = require("ejs");
var bcryptnjs = require('bcrypt-nodejs');
var poolconn=require('./poolconn');



function executeQuery(callback,querystring){
	var mycallback=function(con){
    con.query(querystring,function(err,rows,fields){
        if(err){
        	callback(err,rows);
            console.log("ERROR: " + err.message);         
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    poolconn.releaseConnection(con);
    };
    poolconn.getConnection(mycallback);
}

exports.executeQuery = executeQuery;


