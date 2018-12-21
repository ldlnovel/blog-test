var express = require('express');
var router = express.Router();
var db = require("../config/mysql");
var response = require('../ulit').response;
var UserSQL = {  
  insert: 'INSERT INTO stu(id,name,age) VALUES(?,?,?)',  // 插入
  queryAll: 'SELECT * FROM stu',                                   // 查询
  repetition: 'SELECT * FROM stu WHERE name = xx'
};

router.get('/user', function (req, res, next) {
  db.query(UserSQL.queryAll, function (err, rows) {
    if (err) {
      res.send({ title: "用户列表", datas: [] });
    } else {
      res.send(rows)
    }
  });
});

router.post('/user/register',function(req, res, next) {
  var param = req.body
  console.log(param)

  db.query(`SELECT * FROM stu WHERE name = ${param.name}`,function(err, rows) {
      if(rows.length > 0) {
        response(res,200,'用户名已存在',false,[])
        return;
      }
      db.query(`INSERT INTO stu(name,age) VALUES(${param.name},${param.age})`, function (err, rows) {
        if (err) {
          response(res,500,'系统错误',false)
        } else {
          response(res,200,'',true,rows)
        }
      }) 
  })
  // console.log('====')
  
})

module.exports = router;
