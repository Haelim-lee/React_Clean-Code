const Query = require('../Query/WorkRoom_Plan_QueryString.js');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const FileControl = require('../FileControl/FileControlManager');
const PlanRouter=express.Router();

//#region Get

//플랜 카테고리
function handlePlanCategoryList(req,res){
  FileControl.FileAppend('handlePlanCategoryList start (플랜 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handlePlanCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
// 기획 게시글 목록 가져오기 (게시판 전용)
function handleSelectPlanBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectPlanBoard_ORG start (기획 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectPlanBoard_ORG, function (error, results, fields) {
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

// 기획 페이지 게시글 목록 가져오기
function handleSelectPlanBoardPage(req,res){
  FileControl.FileAppend('handleSelectPlanBoardPage start (기획 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = req.body.IsPublic===true ?Query.handleSelectPlanBoardPage:Query.handleSelectPlanBoardPage+` and public=false  and notice_name = '`+req.session.Name+`'`;
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

// 기획 페이지 목록 가져오기
function handleSelectPlanBoardPageList(req,res){
  FileControl.FileAppend('handleSelectPlanBoardPageList start (기획 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = Query.handleSelectPlanBoardPageList;
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
  
// 기획 게시글 추가
function handleInsertPlanBoard(req,res){
  FileControl.FileAppend('handleInsertPlanBoard start (기획 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertPlanBoard, [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 기획 게시글 삭제
function handleDeletePlanBoard(req,res){
  FileControl.FileAppend('handleDeletePlanBoard start (기획 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeletePlanBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 기획 게시글 수정
function handleUpdatePlanBoard(req,res){
  FileControl.FileAppend('handleUpdatePlanBoard start (기획 게시판 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdatePlanBoard,[req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false,req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 기획 게시글 불러오기
function handleReadPlanBoard(req,res){
  FileControl.FileAppend('handleReadPlanBoard start (기획 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadPlanBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 기획 게시글 조회수 증가
function handlePlanSearchCountPlus(req, res) {
  FileControl.FileAppend('handlePlanSearchCountPlus start (기획 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handlePlanSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 기획 게시글의 댓글 가져오기
function handleReadPlanComments(req,res){
  FileControl.FileAppend('handleReadPlanComments start (기획 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadPlanComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 기획 게시글에 댓글 등록
function handleInsertPlanComment(req, res) {
  FileControl.FileAppend('handleInsertPlanComment start (기획 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertPlanComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertPlanComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertPlanComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertPlanComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 기획 게시글의 댓글 삭제
function handleDeletePlanComment(req, res) {
  FileControl.FileAppend('handleDeletePlanComment start (기획 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeletePlanComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeletePlanComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeletePlanComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeletePlanComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
PlanRouter.get("/SelectPlan_ORG",handleSelectPlanBoard_ORG); // 기획 게시글 목록 가져오기 (게시판 전용)
PlanRouter.post("/SelectPlanBoardPage",handleSelectPlanBoardPage); // 기획 페이지 게시글 목록 가져오기
PlanRouter.post("/SelectPlanBoardPageList",handleSelectPlanBoardPageList); // 기획 페이지 목록 가져오기
PlanRouter.post("/InsertPlanBoard",handleInsertPlanBoard); // 기획 게시글 추가
PlanRouter.post("/DeletePlanBoard",handleDeletePlanBoard); // 기획 게시글 삭제
PlanRouter.post("/UpdatePlanBoard",handleUpdatePlanBoard); // 기획 게시글 수정
PlanRouter.post("/ReadPlanBoard",handleReadPlanBoard); // 기획 게시글 불러오기
PlanRouter.post("/PlanSearchCountPlus",handlePlanSearchCountPlus); // 기획 게시글 조회수 증가
PlanRouter.post("/ReadPlanComments", handleReadPlanComments); // 기획 게시글의 댓글 가져오기
PlanRouter.post("/InsertPlanComment", handleInsertPlanComment); // 기획 게시글에 댓글 등록
PlanRouter.post("/DeletePlanComment", handleDeletePlanComment); // 기획 게시글의 댓글 삭제
PlanRouter.post("/PlanCategoryList", handlePlanCategoryList);
module.exports = PlanRouter;