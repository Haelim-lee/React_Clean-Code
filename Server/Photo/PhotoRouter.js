const express=require('express');
const PhotoRouter = express.Router();
const uploader = require('../FileUpload/FileUpload');
const Query = require('../QueryString');
const FileControl = require('../FileControl/FileControlManager');
const RequestIp = require('request-ip');
const {connection,pool,execute}  = require('../dbConfig');

//#region Get

// 사용자 사진 가져오기 (진짜 게시글 목록)
async function handleGetFeedPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetFeedPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetFeedPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetFeedPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행실패');
    res.send(e);
  }
}
async function handleGetDevPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetDevPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetDevPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetDevPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행실패');
    res.send(e);
  }
}
async function handleGetMdlPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetDevPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetDevPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetMdlPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행실패');
    res.send(e);
  }
}
async function handleGetDgnPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetDevPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetDevPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetDgnPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetDevPhoto_ORG 수행실패');
    res.send(e);
  }
}
async function handleGetIfaPhoto_ORG(req, res, next) {
  FileControl.FileAppend('GetIfaPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetIfaPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetIfaPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetIfaPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetIfaPhoto_ORG 수행실패');
    res.send(e);
  }
}
async function handleGetMediaPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetMediaPhoto_ORG 사용자 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetIfaPhoto_ORG');
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetMediaPhoto_ORG, req.session.UserId);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetMediaPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetMediaPhoto_ORG 수행실패');
    res.send(e);
  }
}
// 전체사진 가져오기 (진짜 게시글 목록)
async function handleGetAllFeedPhoto_ORG(req, res, next) {
  FileControl.FileAppend('handleGetAllFeedPhoto_ORG 전체사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  var ReturnData = {};
  var Comment = {}
  try{
    ReturnData = await execute(Query.handleGetAllFeedPhoto_ORG);
    for (var i = 0; i < ReturnData.length; i++) {
      FileControl.FileAppend('루프시작'+JSON.stringify(ReturnData[i].pix_num));
      Comment = await execute(Query.handleReadPhotoComments,[ReturnData[i].pix_num])
      ReturnData[i].Comment = Comment;
          FileControl.FileAppend('handleReadPhotoComments : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
      };
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetAllFeedPhoto_ORG 수행성공');
  }
  catch(e)  {
    FileControl.FileAppend('handleGetAllFeedPhoto_ORG 수행실패');
    res.send(e);
  }
}



// 전체 사진 가져오기 ( Home 화면 전용)
function handleGetFeedPhoto(req, res,next) {
    try{
      FileControl.FileAppend('handleGetFeedPhoto 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
      FileControl.FileAppend('handleGetFeedPhoto');
      connection.query(Query.handleGetFeedPhoto, function (error, results, fields) {
        if (error) {
            FileControl.FileAppend('handleGetFeedPhoto 쿼리에러 : ' + error);
        }

        FileControl.FileAppend('handleGetFeedPhoto : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        FileControl.FileAppend('쿼리 결과 : ' + JSON.stringify(results));
        
        res.send(results);
      });
    }
    catch(e){
      FileControl.FileAppend(error)
    }
  }

//#endregion Get

//#region Post

// 사진 업로드
async function handlePhotoUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handlePhotoUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertPhoto,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handlePhotoUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handlePhotoUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}
// 사진 업로드
async function handleAttachFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handlePhotoUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertAttachFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handlePhotoUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handlePhotoUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}
// 개발포트폴리오 업로드
async function handleDeveloperFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handlePhotoUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertDeveloperFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handlePhotoUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handlePhotoUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}

// 개발포트폴리오 업로드
async function handleModelerFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handleModelerFileUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertModelerFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handleModelerFileUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handleModelerFileUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}

// 디자인포트폴리오 업로드
async function handleDesignerFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handleDesignerFileUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertDesignerFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handleDesignerFileUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handleDesignerFileUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}

// 인프라 포트폴리오 업로드
async function handleInfraFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handleInfraFileUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertInfraFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handleInfraFileUpload 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handleInfraFileUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}
async function handleMediaFileUpload(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handleMediaFileUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
    ResponseData.UserId = req.session.UserId;
    ResponseData.originalname = req.file.originalname;
    ResponseData.Size = req.file.size;
    ResponseData.path = req.file.path;
    FileControl.FileAppend(req.body.TextInput);
    
    connection.query(Query.handleInsertMediaFile,[req.session.UserId,req.file.path,req.file.originalname,req.file.filename,req.body.TextInput], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handleInsertMediaFile 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handleInsertMediaFile 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}
// 사진 게시글의 댓글 가져오기
function handleReadPhotoComments(req,res){
  FileControl.FileAppend('handleReadPhotoComments start (사진 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  
  connection.query(Query.handleReadPhotoComments,[req.body.pix_num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 사진 게시글에 댓글 등록
function handleInsertPhotoComment(req, res) {
  FileControl.FileAppend('handleInsertPhotoComment start (사진게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertPhotoComment, [req.body.num, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertPhotoComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertPhotoComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertPhotoComment 쿼리결과 : ' + results);

    res.send(results);
  });
}


// 게시글의 댓글 삭제
function handleDeletePhotoComment(req, res) {
  FileControl.FileAppend('handleDeletePhotoComment start (사진게시판 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeletePhotoComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeletePhotoComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeletePhotoComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeletePhotoComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

PhotoRouter.get("/GetFeedPhoto", handleGetFeedPhoto);
PhotoRouter.get("/GetAllFeedPhoto_ORG", handleGetAllFeedPhoto_ORG); // 전체사진 가져오기 handleGetAllFeedPhoto_ORG
PhotoRouter.get("/GetFeedPhoto_ORG", handleGetFeedPhoto_ORG); // 사진 가져오기 handleGetFeedPhoto_ORG
PhotoRouter.get("/GetDevPhoto_ORG", handleGetDevPhoto_ORG); // 사진 가져오기 handleGetDevPhoto_ORG
PhotoRouter.get("/GetMdlPhoto_ORG", handleGetMdlPhoto_ORG); // 사진 가져오기 handleGetMdlPhoto_ORG
PhotoRouter.get("/GetDgnPhoto_ORG", handleGetDgnPhoto_ORG); // 사진 가져오기 handleGetMdlPhoto_ORG
PhotoRouter.get("/GetIfaPhoto_ORG", handleGetIfaPhoto_ORG); // 사진 가져오기 handleGetMdlPhoto_ORG
PhotoRouter.get("/GetMediaPhoto_ORG", handleGetMediaPhoto_ORG); // 사진 가져오기 handleGetMdlPhoto_ORG
PhotoRouter.post("/Upload", uploader.upload.single('img'),handlePhotoUpload); // 사진 업로드
PhotoRouter.post("/AttachFileUpload", uploader.AttachFile.single('img'),handleAttachFileUpload); // 게시판 업로드
PhotoRouter.post("/DeveloperFileUpload", uploader.DeveloperFile.single('img'),handleDeveloperFileUpload); // 개발 포트폴리오 업로드
PhotoRouter.post("/ModelerFileUpload", uploader.ModelerFile.single('img'),handleModelerFileUpload); // 모델링 포트폴리오 업로드
PhotoRouter.post("/DesignerFileUpload", uploader.DesignerFile.single('img'),handleDesignerFileUpload); // 모델링 포트폴리오 업로드
PhotoRouter.post("/InfraFileUpload", uploader.InfraFile.single('img'),handleInfraFileUpload); // 인프라 포트폴리오 업로드
PhotoRouter.post("/MediaFileUpload", uploader.MediaFile.single('img'),handleMediaFileUpload); //  포트폴리오 업로드
PhotoRouter.post("/ReadPhotoComments", handleReadPhotoComments); // 사진 게시글의 댓글 가져오기
PhotoRouter.post("/InsertPhotoComment", handleInsertPhotoComment); // 사진 게시글에 댓글 등록
PhotoRouter.post("/DeletePhotoComment", handleDeletePhotoComment); // 사진 게시글의 댓글 삭제

module.exports = PhotoRouter;