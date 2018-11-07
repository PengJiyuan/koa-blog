const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
  connectionLimit : 10,
  ...config.database
});

const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // When done with the connection, release it.
          connection.release()
        })
      }
    })
  })
  .catch((error) => {
    console.log(error, 'Promise error');
  });
}

module.exports = { query };
