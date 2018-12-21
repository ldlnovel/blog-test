var express = require('express');
var router = express.Router();
var db = require("../config/mysql");

/* GET home page. */
router.get('/user', function (req, res, next) {
  db.query("select * from stu", function (err, rows) {
    if (err) {
      res.send({ title: "用户列表", datas: [] });
    } else {
      res.send(rows)
    }
  });
});

module.exports = router;
