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
		message:'更新成功'
	}
	next();
});

router.post('/get',function(req,res,next){
    res.header('Content-Type','application/json');
    var reqid=req.body.id;
	
    var selectSQL = "select user.userid,username,userphone,userEmail,userNeed,idealprice,userstate from user,userDetail where user.userid=userDetail.userid and user.userid='"+reqid+"'";  
    db.query(selectSQL,function (err,rows) {
		if (err) 
		   res.send(err);
		if(rows.length==0){
			responseData.code=1;
            responseData.message='获取失败';
            console.log("**********"+reqid);
			res.json(responseData);
		}
		else{
            console.log('正在传回数据');
		    res.json(rows[0]); 
		}
    })
 
});

router.post('/post',function(req,res,next){
    res.header('Content-Type','application/json');
    var userid=req.body.userid;
    var userNeed=req.body.userNeed;
    var idealprice=req.body.idealprice;
    var userstate=req.body.userstate;
	
    var selectSQL = "update userDetail set userNeed = ?,idealprice = ? where userid = ?;update user set userstate=? where userid=?";  
    var sqlparam1 =[userNeed,idealprice,userid,userstate,userid];     
    db.query(selectSQL,sqlparam1,function (err,rows) {
        responseData.code=0;
        responseData.message='';
		if (err) 
		   res.send(err);
		/*if(rows.length==0){
			responseData.code=1;
		    responseData.message='插入失败';
			res.json(responseData);
		}*/
		else{
			console.log(rows);       // Column1 as a result     
		  res.json(responseData); 
		}
    })
 
});

module.exports=router;