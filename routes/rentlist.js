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

router.get('/list',function(req,res,next){
    res.header('Content-Type','application/json');
    var userid=req.body.userid;
	var username=req.body.username;
	var userpass=req.body.userpass;
    console.log(req.body); 
	
    var selectSQL = "select * from house";  
    db.query(selectSQL,function (err,rows) {
		if (err) 
		   res.send(err);
		if(rows.length==0){
			responseData.code=1;
		    responseData.message='暂无数据';
			res.json(responseData);
		}
		else{
            console.log('正在传回数据');
		res.json(rows); 
		}
    })
 
});

module.exports=router;