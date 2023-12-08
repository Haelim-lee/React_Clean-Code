const Query = require('../QueryString');
const express=require('express');
const {connection,pool,execute}  = require('../dbConfig');
const QaBoardrouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region Get

// QA 게시글 목록 가져오기 (Home 화면 전용)
function handleSelectQA(req,res){
  FileControl.FileAppend('handleSelectNews start (QA 게시글 목록 가져오기 (Home 화면 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectQA, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
  FileControl.FileAppend(new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
}

// QA 게시글 목록 가져오기 (게시판 전용)
function handleSelectQA_ORG(req,res){
  FileControl.FileAppend('handleSelectNews start (QA 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectQA_ORG, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
  FileControl.FileAppend(new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
}

//#endregion Get

//#region Post

// QA 페이지 게시글 목록 가져오기
function handleSelectQaBoardPage(req,res){
  FileControl.FileAppend('handleSelectQaBoardPage start (QA 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectQaBoardPage,[req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
   
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// QA 페이지 목록 가져오기
function handleSelectQaBoardPageList(req,res){
  FileControl.FileAppend('handleSelectQaBoardPageList start (QA 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectQaBoardPageList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// QA 게시글 추가
function handleInsertQABoard(req,res){
  FileControl.FileAppend('handleInsertQABoard start (QA 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertQABoard,[req.body.id, req.body.name, req.body.title, req.body.contents],function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// QA 게시글 삭제
function handleDeleteQaBoard(req,res){
  FileControl.FileAppend('handleDeleteQaBoard start (QA 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteQaBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// QA 게시글 수정
function handleUpdateQaBoard(req,res){
  FileControl.FileAppend('handleUpdateQaBoard start (QA 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateQaBoard,[req.body.title,req.body.contents,req.body.NUM],function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// QA 게시글 불러오기
function handleReadQaBoard(req,res){
  FileControl.FileAppend('handleReadQaBoard start (QA 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadQaBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });

}

// QA 게시글 조회수 증가
function handleQaSearchCountPlus(req, res) {
  FileControl.FileAppend('handleQaSearchCountPlus start (QA 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleQaSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 공지사항 게시글의 댓글 가져오기
function handleReadQAComments(req,res){
  FileControl.FileAppend('handleReadQAComments start (공지사항 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadQAComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글에 댓글 등록
function handleInsertQAComment(req, res) {
  FileControl.FileAppend('handleInsertQAComment start (자유게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertQAComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertQAComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertQAComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertQAComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 공지사항 게시글의 댓글 삭제
function handleDeleteQAComment(req, res) {
  FileControl.FileAppend('handleDeleteQAComment start (자유게시판 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteQAComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteQAComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteQAComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteQAComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register

QaBoardrouter.get("/SelectQA",handleSelectQA); // QA 게시글 목록 가져오기 (Home 화면 전용)
QaBoardrouter.get("/SelectQA_ORG",handleSelectQA_ORG); // QA 게시글 목록 가져오기 (게시판 전용)
QaBoardrouter.post("/SelectQABoardPage",handleSelectQaBoardPage); // QA 페이지 게시글 목록 가져오기
QaBoardrouter.post("/SelectQABoardPageList",handleSelectQaBoardPageList); // QA 페이지 목록 가져오기
QaBoardrouter.post("/InsertQABoard",handleInsertQABoard); // QA 게시글 추가
QaBoardrouter.post("/DeleteQaBoard",handleDeleteQaBoard); // QA 게시글 삭제
QaBoardrouter.post("/UpdateQaBoard",handleUpdateQaBoard); // QA 게시글 수정
QaBoardrouter.post("/ReadQaBoard",handleReadQaBoard); // QA 게시글 불러오기
QaBoardrouter.post("/QaSearchCountPlus",handleQaSearchCountPlus); // 자유게시판 게시글 조회수 증가
QaBoardrouter.post("/ReadQAComments", handleReadQAComments); // 공지사항 게시글의 댓글 가져오기
QaBoardrouter.post("/InsertQAComment", handleInsertQAComment); // 공지사항 게시글에 댓글 등록
QaBoardrouter.post("/DeleteQAComment", handleDeleteQAComment); // 공지사항 게시글의 댓글 삭제

module.exports = QaBoardrouter;