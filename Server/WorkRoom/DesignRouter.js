const Query = require('../Query/WorkRoom_Design_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const FileControl = require('../FileControl/FileControlManager');
const e = require('express');
const DesignRouter=express.Router();

//#region Get

// 디자인 게시글 목록 가져오기 (게시판 전용)
function handleSelectDesignBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectDesignBoard_ORG start (디자인 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleSelectDesignBoard_ORG, function (error, results, fields) {
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

// 디자인 페이지 게시글 목록 가져오기
function handleSelectDesignBoardPage(req,res){
  FileControl.FileAppend('handleSelectDesignBoardPage start (디자인 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  FileControl.FileAppend('세션내용 : ' + JSON.stringify(req.session));
  FileControl.FileAppend('여부 : ' + req.body.공개여부);
  var ExecQuery = req.body.IsPublic===true ? Query.handleSelectDesignBoardPage:Query.handleSelectDesignBoardPage+` and public=false and notice_name = '`+req.session.Name+`'`;
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

// 디자인 페이지 목록 가져오기
function handleSelectDesignBoardPageList(req,res){
  FileControl.FileAppend('handleSelectDesignBoardPageList start (디자인 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  
  var ExecQuery = Query.handleSelectDesignBoardPageList;
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

function handleDesignCategoryList(req,res){
  FileControl.FileAppend('handleDesignCategoryList start (디자인 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDesignCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
  
// 디자인 게시글 추가
function handleInsertDesignBoard(req,res){
  FileControl.FileAppend('handleInsertDesignBoard start (디자인 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  
  connection.query(Query.handleInsertDesignBoard, [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

    res.send(results);
  });
}

// 디자인 게시글 삭제
function handleDeleteDesignBoard(req,res){
  FileControl.FileAppend('handleDeleteDesignBoard start (디자인 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDesignBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 디자인 게시글 수정
function handleUpdateDesignBoard(req,res){
  FileControl.FileAppend('handleUpdateDesignBoard start (디자인 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateDesignBoard,[req.body.title, req.body.contents, req.body.category,req.body.PUBLIC === '공개'? true:false, req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 디자인 게시글 불러오기
function handleReadDesignBoard(req,res){
  FileControl.FileAppend('handleReadDesignBoard start (디자인 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDesignBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 디자인 게시글 조회수 증가
function handleDesignSearchCountPlus(req, res) {
  FileControl.FileAppend('handleDesignSearchCountPlus start (디자인 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDesignSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 디자인 게시글의 댓글 가져오기
function handleReadDesignComments(req,res){
  FileControl.FileAppend('handleReadDesignComments start (디자인 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDesignComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 디자인 게시글에 댓글 등록
function handleInsertDesignComment(req, res) {
  FileControl.FileAppend('handleInsertDesignComment start (디자인 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertDesignComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertDesignComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertDesignComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertDesignComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteDesignComment(req, res) {
  FileControl.FileAppend('handleDeleteDesignComment start (디자인 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDesignComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteDesignComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteDesignComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteDesignComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
DesignRouter.get("/SelectDesign_ORG",handleSelectDesignBoard_ORG); // 디자인 게시글 목록 가져오기 (게시판 전용)
DesignRouter.post("/SelectDesignBoardPage",handleSelectDesignBoardPage); // 디자인 페이지 게시글 목록 가져오기
DesignRouter.post("/SelectDesignBoardPageList",handleSelectDesignBoardPageList); // 디자인 페이지 목록 가져오기
DesignRouter.post("/InsertDesignBoard",handleInsertDesignBoard); // 디자인 게시글 추가
DesignRouter.post("/DeleteDesignBoard",handleDeleteDesignBoard); // 디자인 게시글 삭제
DesignRouter.post("/UpdateDesignBoard",handleUpdateDesignBoard); // 디자인 게시글 수정
DesignRouter.post("/ReadDesignBoard",handleReadDesignBoard); // 디자인 게시글 불러오기
DesignRouter.post("/DesignSearchCountPlus",handleDesignSearchCountPlus); // 디자인 게시글 조회수 증가
DesignRouter.post("/ReadDesignComments", handleReadDesignComments); // 디자인 게시글의 댓글 가져오기
DesignRouter.post("/InsertDesignComment", handleInsertDesignComment); // 디자인 게시글에 댓글 등록
DesignRouter.post("/DeleteDesignComment", handleDeleteDesignComment); // 디자인 게시글의 댓글 삭제
DesignRouter.post("/DesignCategoryList", handleDesignCategoryList); // 디자인 게시글의 댓글 삭제


module.exports = DesignRouter;