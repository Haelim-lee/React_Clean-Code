const Query = require('../Query/WorkRoom_Work_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const FileControl = require('../FileControl/FileControlManager');
const WorkRouter=express.Router();

//#region Get
//워크 카테고리
function handleWorkCategoryList(req,res){
  FileControl.FileAppend('handleWorkCategoryList start (워크 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleWorkCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
// 업무 게시글 목록 가져오기 (게시판 전용)
function handleSelectWorkBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectWorkBoard_ORG start (업무 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleSelectWorkBoard_ORG, function (error, results, fields) {
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

// 업무 페이지 게시글 목록 가져오기
function handleSelectWorkBoardPage(req,res){
  FileControl.FileAppend('handleSelectWorkBoardPage start (업무 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  var ExecQuery = req.body.IsPublic===true ?Query.handleSelectWorkBoardPage:Query.handleSelectWorkBoardPage+` and public=false  and notice_name = '`+req.session.Name+`'`;
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

// 업무 페이지 목록 가져오기
function handleSelectWorkBoardPageList(req,res){
  FileControl.FileAppend('handleSelectWorkBoardPageList start (업무 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  //FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = Query.handleSelectWorkBoardPageList;
  var isGlobal = `WHERE 'ALL'=?`;

  if(req.body.IsPublic===false)
    isGlobal=isGlobal+` and notice_name = '`+req.session.Name+`'`;

  if(req.body.IsPublic===true && req.body.Category === 'ALL')
    ExecQuery=ExecQuery.replace(`WHERE NOTICE_CATEGORY=?`,isGlobal);

  connection.query(ExecQuery,[req.body.Category], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    //FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    //FileControl.FileAppend(results);

    res.send(results);
  });
}
  
// 업무 게시글 추가
function handleInsertWorkBoard(req,res){
  FileControl.FileAppend('handleInsertWorkBoard start (업무 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertWorkBoard, [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 업무 게시글 삭제
function handleDeleteWorkBoard(req,res){
  FileControl.FileAppend('handleDeleteWorkBoard start (업무 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteWorkBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 업무 게시글 수정
function handleUpdateWorkBoard(req,res){
  FileControl.FileAppend('handleUpdateWorkBoard start (업무 게시판 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateWorkBoard,[req.body.title, req.body.contents, req.body.category,req.body.PUBLIC === '공개'? true:false ,req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 업무 게시글 불러오기
function handleReadWorkBoard(req,res){
  FileControl.FileAppend('handleReadWorkBoard start (업무 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
 // FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadWorkBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    //FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    //FileControl.FileAppend(results);

    res.send(results);
  });
}

// 업무 게시글 조회수 증가
function handleWorkSearchCountPlus(req, res) {
  FileControl.FileAppend('handleWorkSearchCountPlus start (업무 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleWorkSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 업무 게시글의 댓글 가져오기
function handleReadWorkComments(req,res){
  FileControl.FileAppend('handleReadWorkComments start (업무 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadWorkComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 업무 게시글에 댓글 등록
function handleInsertWorkComment(req, res) {
  FileControl.FileAppend('handleInsertWorkComment start (업무 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertWorkComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertWorkComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertWorkComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertWorkComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 업무 게시글의 댓글 삭제
function handleDeleteWorkComment(req, res) {
  FileControl.FileAppend('handleDeleteWorkComment start (업무 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteWorkComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteWorkComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteWorkComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteWorkComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
WorkRouter.get("/SelectWork_ORG",handleSelectWorkBoard_ORG); // 업무 게시글 목록 가져오기 (게시판 전용)
WorkRouter.post("/SelectWorkBoardPage",handleSelectWorkBoardPage); // 업무 페이지 게시글 목록 가져오기
WorkRouter.post("/SelectWorkBoardPageList",handleSelectWorkBoardPageList); // 업무 페이지 목록 가져오기
WorkRouter.post("/InsertWorkBoard",handleInsertWorkBoard); // 업무 게시글 추가
WorkRouter.post("/DeleteWorkBoard",handleDeleteWorkBoard); // 업무 게시글 삭제
WorkRouter.post("/UpdateWorkBoard",handleUpdateWorkBoard); // 업무 게시글 수정
WorkRouter.post("/ReadWorkBoard",handleReadWorkBoard); // 업무 게시글 불러오기
WorkRouter.post("/WorkSearchCountPlus",handleWorkSearchCountPlus); // 업무 게시글 조회수 증가
WorkRouter.post("/ReadWorkComments", handleReadWorkComments); // 업무 게시글의 댓글 가져오기
WorkRouter.post("/InsertWorkComment", handleInsertWorkComment); // 업무 게시글에 댓글 등록
WorkRouter.post("/DeleteWorkComment", handleDeleteWorkComment); // 업무 게시글의 댓글 삭제
WorkRouter.post("/WorkCategoryList", handleWorkCategoryList);

module.exports = WorkRouter;