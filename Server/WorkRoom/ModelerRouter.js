const Query = require('../Query/WorkRoom_Modeler_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const ModelerRouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region Get


//모델러 카테고리
function handleModelerCategoryList(req,res){
  FileControl.FileAppend('handleModelerCategoryList start (모델러 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleModelerCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
// 모델링 게시글 목록 가져오기 (게시판 전용)
function handleSelectModelerBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectModelerBoard_ORG start (모델링 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectModelerBoard_ORG, function (error, results, fields) {
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

// 모델링 페이지 게시글 목록 가져오기
function handleSelectModelerBoardPage(req,res){
  FileControl.FileAppend('handleSelectModelerBoardPage start (모델링 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  var ExecQuery = req.body.IsPublic===true ?Query.handleSelectModelerBoardPage:Query.handleSelectModelerBoardPage+` and public=false  and notice_name = '`+req.session.Name+`'`;
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

// 모델링 페이지 목록 가져오기
function handleSelectModelerBoardPageList(req,res){
  FileControl.FileAppend('handleSelectModelerBoardPageList start (Modeler게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));


  var ExecQuery = Query.handleSelectModelerBoardPageList;
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
  
// 모델링 게시글 추가
function handleInsertModelerBoard(req,res){
  FileControl.FileAppend('handleInsertModelerBoard start (Modeler게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertModelerBoard,  [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 모델링 게시글 삭제
function handleDeleteModelerBoard(req,res){
  FileControl.FileAppend('handleDeleteModelerBoard start (모델링 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteModelerBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 모델링 게시글 수정
function handleUpdateModelerBoard(req,res){
  FileControl.FileAppend('handleUpdateModelerBoard start (모델링 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateModelerBoard,[req.body.title, req.body.contents, req.body.category,req.body.PUBLIC === '공개'? true:false, req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 모델링 게시글 불러오기
function handleReadModelerBoard(req,res){
  FileControl.FileAppend('handleReadModelerBoard start (모델링 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadModelerBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 모델링 게시글 조회수 증가
function handleModelerSearchCountPlus(req, res) {
  FileControl.FileAppend('handleModelerSearchCountPlus start (모델링 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleModelerSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 모델링 게시글의 댓글 가져오기
function handleReadModelerComments(req,res){
  FileControl.FileAppend('handleReadModelerComments start (모델링 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadModelerComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 모델링 게시글에 댓글 등록
function handleInsertModelerComment(req, res) {
  FileControl.FileAppend('handleInsertModelerComment start (모델링 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertModelerComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertModelerComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertModelerComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertModelerComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteModelerComment(req, res) {
  FileControl.FileAppend('handleDeleteModelerComment start (모델링 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteModelerComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteModelerComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteModelerComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteModelerComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
ModelerRouter.get("/SelectModeler_ORG",handleSelectModelerBoard_ORG); // 모델링 게시글 목록 가져오기 (게시판 전용)
ModelerRouter.post("/SelectModelerBoardPage",handleSelectModelerBoardPage); // 모델링 페이지 게시글 목록 가져오기
ModelerRouter.post("/SelectModelerBoardPageList",handleSelectModelerBoardPageList); // 모델링 페이지 목록 가져오기
ModelerRouter.post("/InsertModelerBoard",handleInsertModelerBoard); // 모델링 게시글 추가
ModelerRouter.post("/DeleteModelerBoard",handleDeleteModelerBoard); // 모델링 게시글 삭제
ModelerRouter.post("/UpdateModelerBoard",handleUpdateModelerBoard); // 모델링 게시글 수정
ModelerRouter.post("/ReadModelerBoard",handleReadModelerBoard); // 모델링 게시글 불러오기
ModelerRouter.post("/ModelerSearchCountPlus",handleModelerSearchCountPlus); // 모델링 게시글 조회수 증가
ModelerRouter.post("/ReadModelerComments", handleReadModelerComments); // 모델링 게시글의 댓글 가져오기
ModelerRouter.post("/InsertModelerComment", handleInsertModelerComment); // 모델링 게시글에 댓글 등록
ModelerRouter.post("/DeleteModelerComment", handleDeleteModelerComment); // 모델링 게시글의 댓글 삭제
ModelerRouter.post("/ModelerCategoryList", handleModelerCategoryList);
module.exports = ModelerRouter;