const Query = require('../Query/WorkRoom_Media_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const MediaRouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');

//#region Get


//미디어 카테고리
function handleMediaCategoryList(req,res){
  FileControl.FileAppend('handleMediaCategoryList start (디자인 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleMediaCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
// 미디어 게시글 목록 가져오기 (게시판 전용)
function handleSelectMediaBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectMediaBoard_ORG start (미디어 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectMediaBoard_ORG, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

//#endregion Get

//#region Post

// 미디어 페이지 게시글 목록 가져오기
function handleSelectMediaBoardPage(req,res){
  FileControl.FileAppend('handleSelectMediaBoardPage start (미디어 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = req.body.IsPublic===true ?Query.handleSelectMediaBoardPage:Query.handleSelectMediaBoardPage+` and public=false  and notice_name = '`+req.session.Name+`'`;
  ExecQuery = req.body.Category === 'ALL' ? ExecQuery.replace(`WHERE notice_Category = ?`,`WHERE 'ALL'=?`):ExecQuery;
  connection.query(ExecQuery,[req.body.Category,req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 페이지 목록 가져오기
function handleSelectMediaBoardPageList(req,res){
  FileControl.FileAppend('handleSelectMediaBoardPageList start (미디어 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = Query.handleSelectMediaBoardPageList;
  var isGlobal = `WHERE 'ALL'=?`;

  if(req.body.IsPublic===false)
    isGlobal=isGlobal+` and notice_name = '`+req.session.Name+`'`;

  if(req.body.IsPublic===true && req.body.Category === 'ALL')
    ExecQuery=ExecQuery.replace(`WHERE NOTICE_CATEGORY=?`,isGlobal);

  connection.query(ExecQuery,[req.body.Category], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
  
// 미디어 게시글 추가
function handleInsertMediaBoard(req,res){
  FileControl.FileAppend('handleInsertMediaBoard start (미디어 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertMediaBoard,  [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 게시글 삭제
function handleDeleteMediaBoard(req,res){
  FileControl.FileAppend('handleDeleteMediaBoard start (미디어 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteMediaBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 게시글 수정
function handleUpdateMediaBoard(req,res){
  FileControl.FileAppend('handleUpdateMediaBoard start (미디어 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateMediaBoard,[req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false,req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 게시글 불러오기
function handleReadMediaBoard(req,res){
  FileControl.FileAppend('handleReadMediaBoard start (미디어 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadMediaBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 게시글 조회수 증가
function handleMediaSearchCountPlus(req, res) {
  FileControl.FileAppend('handleMediaSearchCountPlus start (미디어 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleMediaSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 미디어 게시글의 댓글 가져오기
function handleReadMediaComments(req,res){
  FileControl.FileAppend('handleReadMediaComments start (미디어 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadMediaComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 미디어 게시글에 댓글 등록
function handleInsertMediaComment(req, res) {
  FileControl.FileAppend('handleInsertMediaComment start (미디어 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertMediaComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertMediaComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertMediaComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertMediaComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteMediaComment(req, res) {
  FileControl.FileAppend('handleDeleteMediaComment start (미디어 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteMediaComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteMediaComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteMediaComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteMediaComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
MediaRouter.get("/SelectMedia_ORG",handleSelectMediaBoard_ORG); // 미디어 게시글 목록 가져오기 (게시판 전용)
MediaRouter.post("/SelectMediaBoardPage",handleSelectMediaBoardPage); // 미디어 페이지 게시글 목록 가져오기
MediaRouter.post("/SelectMediaBoardPageList",handleSelectMediaBoardPageList); // 미디어 페이지 목록 가져오기
MediaRouter.post("/InsertMediaBoard",handleInsertMediaBoard); // 미디어 게시글 추가
MediaRouter.post("/DeleteMediaBoard",handleDeleteMediaBoard); // 미디어 게시글 삭제
MediaRouter.post("/UpdateMediaBoard",handleUpdateMediaBoard); // 미디어 게시글 수정
MediaRouter.post("/ReadMediaBoard",handleReadMediaBoard); // 미디어 게시글 불러오기
MediaRouter.post("/MediaSearchCountPlus",handleMediaSearchCountPlus); // 미디어 게시글 조회수 증가
MediaRouter.post("/ReadMediaComments", handleReadMediaComments); // 미디어 게시글의 댓글 가져오기
MediaRouter.post("/InsertMediaComment", handleInsertMediaComment); // 미디어 게시글에 댓글 등록
MediaRouter.post("/DeleteMediaComment", handleDeleteMediaComment); // 미디어 게시글의 댓글 삭제
MediaRouter.post("/MediaCategoryList", handleMediaCategoryList); 
module.exports = MediaRouter;