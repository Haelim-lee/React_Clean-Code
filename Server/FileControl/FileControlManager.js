var url= './';
var fileName='Log.txt';
var encoding = 'utf8';
const dataUtil = require('date-utils');//new Date쓸때 써야함
var fs = require('fs');

var FileReader = function(Msg){
    fs.readFile('Log.txt', 'utf8', function(Msg){
        console.log(Msg);
    });
}


// var FileWrite = function(Msg){
//     fs.writeFile(url+fileName,Msg,encoding,function(err){
//         if(err) console.log('Error'+err);
//         else console.log("쓰기완료");
//     });
// };

var FileAppend = function(Msg){
    try{
        fs.appendFile(url+fileName,'['+new Date().toFormat('YYYY-MM-DD HH24:MI:SS')+']'+Msg+'\n',encoding,function(err){
            if(err) console.log('Error'+err);
            else console.log(Msg);
        });
    }
    catch{
        console.log('로그쓰기 오류');
    }
};

 module.exports = {FileReader,FileAppend};

