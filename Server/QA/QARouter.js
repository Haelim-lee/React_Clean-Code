const Query = require('../Query/QA_QA_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const QARouter=express.Router();

//#region Get

// 고객지원 게시글 목록 가져오기 (게시판 전용)
function handleSelectQAQABoard_ORG(req,res){
  console.log('handleSelectQAQABoard_ORG start (고객지원 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectQAQABoard_ORG, function (error, results, fields) {
    if (error) {
        console.log('쿼리에러' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

//#endregion Get

//#region Post

// 고객지원 페이지 게시글 목록 가져오기
function handleSelectQAQABoardPage(req,res){
  console.log('handleSelectQAQABoardPage start (고객지원 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectQAQABoardPage,[req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
        console.log('쿼리에러 : ' + error);
    }
    
    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 페이지 목록 가져오기
function handleSelectQAQABoardPageList(req,res){
  console.log('handleSelectQAQABoardPageList start (고객지원 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectQAQABoardPageList, function (error, results, fields) {
    if (error) {
        console.log('쿼리에러 ' + error);
    }
    
    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}
  
// 고객지원 게시글 추가
function handleInsertQAQABoard(req,res){
  console.log('handleInsertQAQABoard start (고객지원 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertQAQABoard, [req.body.id, req.body.name, req.body.title, req.body.contents], function (error, results, fields) {
    if (error) {
        console.log('쿼리에러 : ' + error);
    }
    
    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 게시글 삭제
function handleDeleteQAQABoard(req,res){
  console.log('handleDeleteQAQABoard start (고객지원 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteQAQABoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      console.log('쿼리에러 : ' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 게시글 수정
function handleUpdateQAQABoard(req,res){
  console.log('handleUpdateQAQABoard start (고객지원 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateQAQABoard,[req.body.title, req.body.contents, req.body.NUM],function (error, results, fields) {
    if (error) {
      console.log('쿼리에러 : ' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 게시글 불러오기
function handleReadQAQABoard(req,res){
  console.log('handleReadQAQABoard start (고객지원 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadQAQABoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      console.log('쿼리에러 : ' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 게시글 조회수 증가
function handleQAQASearchCountPlus(req, res) {
  console.log('handleQAQASearchCountPlus start (고객지원 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleQAQASearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      console.log('쿼리에러 : ' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send('완료');
  });
}

// 고객지원 게시글의 댓글 가져오기
function handleReadQAQAComments(req,res){
  console.log('handleReadQAQAComments start (고객지원 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadQAQAComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      console.log('쿼리에러 : ' + error);
    }

    console.log('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log(results);

    res.send(results);
  });
}

// 고객지원 게시글에 댓글 등록
function handleInsertQAQAComment(req, res) {
  console.log('handleInsertQAQAComment start (고객지원 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertQAQAComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        console.log('handleInsertQAQAComment 쿼리에러 : ' + error);
    }
    
    console.log('handleInsertQAQAComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log('handleInsertQAQAComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteQAQAComment(req, res) {
  console.log('handleDeleteQAQAComment start (고객지원 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  console.log('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteQAQAComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        console.log('handleDeleteQAQAComment 쿼리에러 : ' + error);
    }
    
    console.log('handleDeleteQAQAComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    console.log('handleDeleteQAQAComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
QARouter.get("/SelectQAQA_ORG",handleSelectQAQABoard_ORG); // 고객지원 게시글 목록 가져오기 (게시판 전용)
QARouter.post("/SelectQAQABoardPage",handleSelectQAQABoardPage); // 고객지원 페이지 게시글 목록 가져오기
QARouter.post("/SelectQAQABoardPageList",handleSelectQAQABoardPageList); // 고객지원 페이지 목록 가져오기
QARouter.post("/InsertQAQABoard",handleInsertQAQABoard); // 고객지원 게시글 추가
QARouter.post("/DeleteQAQABoard",handleDeleteQAQABoard); // 고객지원 게시글 삭제
QARouter.post("/UpdateQAQABoard",handleUpdateQAQABoard); // 고객지원 게시글 수정
QARouter.post("/ReadQAQABoard",handleReadQAQABoard); // 고객지원 게시글 불러오기
QARouter.post("/QAQASearchCountPlus",handleQAQASearchCountPlus); // 고객지원 게시글 조회수 증가
QARouter.post("/ReadQAQAComments", handleReadQAQAComments); // 고객지원 게시글의 댓글 가져오기
QARouter.post("/InsertQAQAComment", handleInsertQAQAComment); // 고객지원 게시글에 댓글 등록
QARouter.post("/DeleteQAQAComment", handleDeleteQAQAComment); // 고객지원 게시글의 댓글 삭제

module.exports = QARouter;