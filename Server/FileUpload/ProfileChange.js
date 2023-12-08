const multer = require('multer');
const fs = require('fs');

const imageDir = __dirname+'/../../src/ftp/FileUpload';
if(!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir);
}

const upload = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            cb(null,imageDir);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        },
        filename : async function(req,file, cb){
            console.log(file);
            console.log(req.body);
            var filename = req.session.UserId + Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        }
    })
})

module.exports = upload;