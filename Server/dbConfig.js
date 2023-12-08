const mysql = require('mysql');
const FileControl = require('./FileControl/FileControlManager');

var ConnectionString = {
  host     : 'antsnest.co.kr',
  user     : 'dexterity',
  password : 'clxk0929',
  database : 'skynet'
}
var connection = mysql.createConnection(ConnectionString);

var pool= mysql.createPool(ConnectionString);
connection.connect();

function execute(query,param) {
  return new Promise(( resolve, reject ) => 
  pool.query( query, param,(error, result, fields) => {
      if( error ) { 
        reject( error );
      }
      resolve( result );
    })
  );
}
  setInterval(function(){
    connection.query('select 1');
  }, 60000);
  module.exports = { connection , pool, execute};