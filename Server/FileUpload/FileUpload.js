const multer = require('multer');
const fs = require('fs');
const imageDir = __dirname+'/../../src/ftp/FileUpload';
const AttachFileimageDir = __dirname+'/../../src/ftp/AttachFile';
const DeveloperFileimageDir = __dirname+'/../../src/ftp/DeveloperFile';
const ModelerFileimageDir = __dirname+'/../../src/ftp/ModelerFile';
const DesignerFileimageDir = __dirname+'/../../src/ftp/DesignerFile';
const InfraFileimageDir = __dirname+'/../../src/ftp/InfraFile';
const MediaFileimageDir = __dirname+'/../../src/ftp/MediaFile';


if(!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir);
}

const upload = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,imageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})

const AttachFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,AttachFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})

const DeveloperFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,DeveloperFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})
const ModelerFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,ModelerFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})

const DesignerFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,DesignerFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})
const InfraFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,InfraFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})
const MediaFile = multer({
    storage : multer.diskStorage({
        destination : async function(req, file, cb){
            try{
                cb(null,MediaFileimageDir);
                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        },
        filename : async function(req,file, cb){
            try{
            console.log(file);
            console.log(req.body);
            var filename = 'S_PHOTO_'+Date.now()+file.originalname;
            var ext = file.mimetype.split('/')[1];

            if(!['png','jpg','jpeg','gif'].includes(ext)){
                return cb(new Error('Only image are allowed'))
            }
            cb(null,filename);
            console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
            catch{
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            }
        }
    })
})
module.exports ={upload,AttachFile,DeveloperFile,ModelerFile,DesignerFile,InfraFile,MediaFile};
