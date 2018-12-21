var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var response = require('../ulit').response;
var UserSQL = {  
  insert: 'INSERT INTO stu(id,name,age) VALUES(?,?,?)',  // 插入
  queryAll: 'SELECT * FROM stu',                                   // 查询
  repetition: 'SELECT * FROM stu WHERE name = xx'
};

router.post('/user/login', function (req, res, next) {
  var param = req.body
  db.Sql(`SELECT * FROM stu WHERE name = ${param.name} and age = ${param.age}`,function(err, rows){
    console.log(rows)
    if(rows&&rows.length > 0) {
      response(res,200,'登录成功',true,)
      return;
    }
  })
});

router.post('/user/register',function(req, res, next) {
  var param = req.body
  console.log(param)

  db.Sql(`SELECT * FROM stu WHERE name = ${param.name}`,function(err, rows) {
      if(rows&&rows.length > 0) {
        response(res,200,'用户名已存在',false,[])
        return;
      }
      db.Sql(`INSERT INTO stu(name,age) VALUES(${param.name},${param.age})`, function (err, rows) {
        if (err) {
          response(res,500,'系统错误',false)
        } else {
          response(res,200,'',true,rows.data.insertId)
        }
      }) 
  })
})

module.exports = router;
