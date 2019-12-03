var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '',       
  port: '3306',                   
  database: 'nodesample', 
}); 

connection.connect();

var  userGetSql = 'SELECT * FROM userinfo';
//查
connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }        

       console.log('--------------------------SELECT----------------------------');
       console.log(result);        
       console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();