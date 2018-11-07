var mysql = require('mysql');
var pool;
var getconnection;
module.exports = {
    getPool: function () {
        if (pool) return pool;
        else {
            pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'prakashconstruction'
            });
            return pool;
        }
    },
    getconnection: function (qry, callback) {
      
            connection.query(qry, function (err, rows, fields) {
                if (err) throw err
                callback(rows)

            })
            connection.on('error', function(err) {
                console.log("[mysql error]",err);
              });
       


    }


};