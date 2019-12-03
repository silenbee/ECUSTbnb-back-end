var express=require('express');
var router= express.Router();
var db = require('./dbConfig');
var querystring = require('querystring');
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

router.post('/detail',function(req,res,next){
    res.header('Content-Type','application/json');
    var houseid=req.body.id;
    var selectSQL = "select * from house,houseDetail where house.houseid=housedetail.houseid and house.houseid='"+houseid+"'";  
    db.query(selectSQL,function (err,rows) {
		if (err) 
		   res.send(err);
		if(rows.length==0){
			responseData.code=1;
			responseData.message='插入失败';
			console.log("req.params:"+req.body.id); 
			res.json(responseData);
		}
		else{
            console.log('正在传回数据'+req.body);
		res.json(rows[0]); 
		}
    })
 
});

module.exports=router;