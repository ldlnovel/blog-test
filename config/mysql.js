
var mysql = require('mysql');
var pool = mysql.createPool({
		host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

function Sql(sql, callback) {
    pool.getConnection(function (err, connection) {
				// Use the connection
				if(err) {
					console.log(err, "数据库连接失败");
					return;
				}
				console.log('数据库连接成功');
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.Sql = Sql;