var express=require('express');
var router= express.Router();
var db = require('./dbConfig');
var responseData;

var mysql=require('mysql');

/**
* 配置MySql
*/


router.use(function(req,res,next){
	responseData={
		code:0,
		message:''
	}
	next();
});

router.post('/user',function(req,res,next){
    res.header('Content-Type','application/json');
    var userid=req.body.userid;
	var username=req.body.username;
	var userpass=req.body.userpass;
    console.log(req.body); 
	
    var selectSQL = "insert into user(userid,username,userpass) values(?,?,?)";  
    var sqlparam =[userid,username,userpass] ;     
    db.query(selectSQL,sqlparam,function (err,rows) {
		if (err) 
		   res.send(err);
		if(rows.length==0){
			responseData.code=1;
		    responseData.message='插入失败';
			res.json(responseData);
		}
		else{
		res.json(req.body); 
		}
    })
 
});

module.exports=router;