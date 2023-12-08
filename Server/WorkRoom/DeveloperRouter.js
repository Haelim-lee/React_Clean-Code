const Query = require('../Query/WorkRoom_Developer_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const DeveloperRouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');

//#region Get

// 프로그래밍 게시글 목록 가져오기 (게시판 전용)
function handleSelectDeveloperBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectDeveloperBoard_ORG start (프로그래밍 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectDeveloperBoard_ORG, function (error, results, fields) {
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

// 프로그래밍 페이지 게시글 목록 가져오기
function handleSelectDeveloperBoardPage(req,res){
  FileControl.FileAppend('handleSelectDeveloperBoardPage start (프로그래밍 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = req.body.IsPublic===true ? Query.handleSelectDeveloperBoardPage:Query.handleSelectDeveloperBoardPage +` and public=false and notice_name = '`+req.session.Name+`'`;
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

function handleDeveloperCategoryList(req,res){
  FileControl.FileAppend('handleDeveloperCategoryList start (디자인 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeveloperCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 페이지 목록 가져오기
function handleSelectDeveloperBoardPageList(req,res){
  FileControl.FileAppend('handleSelectDeveloperBoardPageList start (프로그래밍 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = Query.handleSelectDeveloperBoardPageList;
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
  
// 프로그래밍 게시글 추가
function handleInsertDeveloperBoard(req,res){
  FileControl.FileAppend('handleInsertDeveloperBoard start (프로그래밍 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertDeveloperBoard, [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 게시글 삭제
function handleDeleteDeveloperBoard(req,res){
  FileControl.FileAppend('handleDeleteDeveloperBoard start (프로그래밍 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDeveloperBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 게시글 수정
function handleUpdateDeveloperBoard(req,res){
  FileControl.FileAppend('handleUpdateDeveloperBoard start (프로그래밍 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateDeveloperBoard,[req.body.title, req.body.contents,req.body.category, req.body.PUBLIC === '공개'? true:false,req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 게시글 불러오기
function handleReadDeveloperBoard(req,res){
  FileControl.FileAppend('handleReadDeveloperBoard start (프로그래밍 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDeveloperBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 게시글 조회수 증가
function handleDeveloperSearchCountPlus(req, res) {
  FileControl.FileAppend('handleDeveloperSearchCountPlus start (프로그래밍 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeveloperSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 프로그래밍 게시글의 댓글 가져오기
function handleReadDeveloperComments(req,res){
  FileControl.FileAppend('handleReadDeveloperComments start (프로그래밍 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDeveloperComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 프로그래밍 게시글에 댓글 등록
function handleInsertDeveloperComment(req, res) {
  FileControl.FileAppend('handleInsertDeveloperComment start (프로그래밍 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertDeveloperComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertDeveloperComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertDeveloperComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertDeveloperComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteDeveloperComment(req, res) {
  FileControl.FileAppend('handleDeleteDeveloperComment start (프로그래밍 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDeveloperComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteDeveloperComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteDeveloperComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteDeveloperComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
DeveloperRouter.get("/SelectDeveloper_ORG",handleSelectDeveloperBoard_ORG); // 프로그래밍 게시글 목록 가져오기 (게시판 전용)
DeveloperRouter.post("/SelectDeveloperBoardPage",handleSelectDeveloperBoardPage); // 프로그래밍 페이지 게시글 목록 가져오기
DeveloperRouter.post("/SelectDeveloperBoardPageList",handleSelectDeveloperBoardPageList); // 프로그래밍 페이지 목록 가져오기
DeveloperRouter.post("/InsertDeveloperBoard",handleInsertDeveloperBoard); // 프로그래밍 게시글 추가
DeveloperRouter.post("/DeleteDeveloperBoard",handleDeleteDeveloperBoard); // 프로그래밍 게시글 삭제
DeveloperRouter.post("/UpdateDeveloperBoard",handleUpdateDeveloperBoard); // 프로그래밍 게시글 수정
DeveloperRouter.post("/ReadDeveloperBoard",handleReadDeveloperBoard); // 프로그래밍 게시글 불러오기
DeveloperRouter.post("/DeveloperSearchCountPlus",handleDeveloperSearchCountPlus); // 프로그래밍 게시글 조회수 증가
DeveloperRouter.post("/ReadDeveloperComments", handleReadDeveloperComments); // 프로그래밍 게시글의 댓글 가져오기
DeveloperRouter.post("/InsertDeveloperComment", handleInsertDeveloperComment); // 프로그래밍 게시글에 댓글 등록
DeveloperRouter.post("/DeleteDeveloperComment", handleDeleteDeveloperComment); // 프로그래밍 게시글의 댓글 삭제
DeveloperRouter.post("/DeveloperCategoryList", handleDeveloperCategoryList); 

module.exports = DeveloperRouter;