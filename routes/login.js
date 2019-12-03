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
	var username=req.body.userid;
	var userpass=req.body.userpass;
    console.log(req.body); 
	if(username=="")
	{ 
		responseData.code=1;
		responseData.message='用户民不能为空';
		res.json(responseData);
		return;
	}

	if(userpass=="")
	{ 
		responseData.code=2;
		responseData.message='密码不能为空';
		res.json(responseData);
		return;
	}
	
	var selectSQL = "select userid,username,userpass,state from user where userid = '"+username+"' and userpass = '"+userpass+"'";         
    db.query(selectSQL,function (err,rows) {
		if (err) 
		   res.send(err);
		if(rows.length==0){
			responseData.code=3;
		    responseData.message='用户名不存在';
			//res.send("用户名不存在");
			res.json(responseData);
		}
		else{
		res.json(rows[0]); 
		}
    })
 
});

module.exports=router;