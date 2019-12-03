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
		message:'插入成功'
	}
	next();
});

router.post('/user',function(req,res,next){
    res.header('Content-Type','application/json');
    var ownerid=req.body.ownerid;
	var title=req.body.title;
	var price=req.body.price;
	var area=req.body.area;
	var desc=req.body.desc;
	var address=req.body.address;
	var houseid=req.body.houseid;
	var date=req.body.deadline;
	
    console.log(req.body); 
	
    var selectSQL = "insert into house(houseId,ownerId,housePrice,housedesc) values(?,?,?,?);insert into housedetail(houseId,houseAddress,houseDescribe,houseArea,houseDeadline) values(?,?,?,?,?)";  
	var sqlparam1 =[houseid,ownerid,price,title,houseid,address,desc,area,date];     
    db.query(selectSQL,sqlparam1,function (err,rows) {
		if (err) 
		   res.send(err);
		/*if(rows.length==0){
			responseData.code=1;
		    responseData.message='插入失败';
			res.json(responseData);
		}*/
		else{
			console.log(rows[0]);       // Column1 as a result
			console.log(rows[1]);       // Column2 as a result
		res.json(responseData); 
		}
    })
 
});

module.exports=router;