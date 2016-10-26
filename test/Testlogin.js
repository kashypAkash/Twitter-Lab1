var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the homepage if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('testing with correct credentials', function(done){
		request.post('http://localhost:3000/validate',
				{form:{email:'wayne@abc.com',pwd:'p'}}, function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
	it('testing signup url', function(done){
		request.post('http://localhost:3000/signup',
				{form:{firstname:'kjhf@abc.com',firstname:'pw',useremail:"a@abc",password:"jhfsj"}}, function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
	it('will tweet', function(done){
		request.post('http://localhost:3000/tweet',
				{form:{tweetmsg:"some"}}, function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});

	
	it('will go to following page', function(done){
		request.get('http://localhost:3000/following', function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
});