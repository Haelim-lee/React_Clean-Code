const Query = require('../QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const DeveloperNoteBoardrouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region Get

// 개발자노트 게시판 게시글 목록 가져오기 (Home 화면 전용)
function handleSelectDeveloperNoteBoard(req,res){
    FileControl.FileAppend('handleSelectDeveloperNoteBoard start (개발자노트 게시판 게시글 목록 가져오기 (Home 화면 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

    connection.query(Query.handleSelectDeveloperNoteBoard, function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('쿼리에러' + error);
      }

      FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
      FileControl.FileAppend(results);

      res.send(results);
    });
  }

// 개발자노트 게시판 게시글 목록 가져오기 (게시판 전용)
function handleSelectDeveloperNoteBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectDeveloperNoteBoard_ORG start (개발자노트 게시판 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectDeveloperNoteBoard_ORG, function (error, results, fields) {
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

// 개발자노트 게시판 페이지 게시글 목록 가져오기
function handleSelectDeveloperNoteBoardPage(req,res){
  FileControl.FileAppend('handleSelectDeveloperNoteBoardPage start (개발자노트 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectDeveloperNoteBoardPage,[req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 페이지 목록 가져오기
function handleSelectDeveloperNoteBoardPageList(req,res){
  FileControl.FileAppend('handleSelectDeveloperNoteBoardPageList start (개발자노트 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectDeveloperNoteBoardPageList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
  
// 개발자노트 게시판 게시글 추가
function handleInsertDeveloperNoteBoard(req,res){
  FileControl.FileAppend('handleInsertDeveloperNoteBoard start (개발자노트 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertDeveloperNoteBoard, [req.body.id, req.body.name, req.body.title, req.body.contents], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 게시글 삭제
function handleDeleteDeveloperNoteBoard(req,res){
  FileControl.FileAppend('handleDeleteDeveloperNoteBoard start (개발자노트 게시판 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDeveloperNoteBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 게시글 수정
function handleUpdateDeveloperNoteBoard(req,res){
  FileControl.FileAppend('handleUpdateDeveloperNoteBoard start (개발자노트 게시판 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateDeveloperNoteBoard,[req.body.title, req.body.contents, req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 게시글 불러오기
function handleReadDeveloperNoteBoard(req,res){
  FileControl.FileAppend('handleReadDeveloperNoteBoard start (개발자노트 게시판 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDeveloperNoteBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 게시글 조회수 증가
function handleDeveloperNoteSearchCountPlus(req, res) {
  FileControl.FileAppend('handleDeveloperNoteSearchCountPlus start (개발자노트 게시판 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeveloperNoteSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 개발자노트 게시판 게시글의 댓글 가져오기
function handleReadDeveloperNoteComments(req,res){
  FileControl.FileAppend('handleReadDeveloperNoteComments start (개발자노트 게시판 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadDeveloperNoteComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 개발자노트 게시판 게시글에 댓글 등록
function handleInsertDeveloperNoteComment(req, res) {
  FileControl.FileAppend('handleInsertDeveloperNoteComment start (개발자노트 게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertDeveloperNoteComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertDeveloperNoteComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertDeveloperNoteComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertDeveloperNoteComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteDeveloperNoteComment(req, res) {
  FileControl.FileAppend('handleDeleteDeveloperNoteComment start (개발자노트 게시판 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteDeveloperNoteComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteDeveloperNoteComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteDeveloperNoteComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteDeveloperNoteComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
DeveloperNoteBoardrouter.get("/SelectDeveloperNote",handleSelectDeveloperNoteBoard); // 개발자노트 게시판 게시글 목록 가져오기 (Home 화면 전용)
DeveloperNoteBoardrouter.get("/SelectDeveloperNote_ORG",handleSelectDeveloperNoteBoard_ORG); // 개발자노트 게시판 게시글 목록 가져오기 (게시판 전용)
DeveloperNoteBoardrouter.post("/SelectDeveloperNoteBoardPage",handleSelectDeveloperNoteBoardPage); // 개발자노트 게시판 페이지 게시글 목록 가져오기
DeveloperNoteBoardrouter.post("/SelectDeveloperNoteBoardPageList",handleSelectDeveloperNoteBoardPageList); // 개발자노트 게시판 페이지 목록 가져오기
DeveloperNoteBoardrouter.post("/InsertDeveloperNoteBoard",handleInsertDeveloperNoteBoard); // 개발자노트 게시판 게시글 추가
DeveloperNoteBoardrouter.post("/DeleteDeveloperNoteBoard",handleDeleteDeveloperNoteBoard); // 개발자노트 게시판 게시글 삭제
DeveloperNoteBoardrouter.post("/UpdateDeveloperNoteBoard",handleUpdateDeveloperNoteBoard); // 개발자노트 게시판 게시글 수정
DeveloperNoteBoardrouter.post("/ReadDeveloperNoteBoard",handleReadDeveloperNoteBoard); // 개발자노트 게시판 게시글 불러오기
DeveloperNoteBoardrouter.post("/DeveloperNoteSearchCountPlus",handleDeveloperNoteSearchCountPlus); // 개발자노트 게시판 게시글 조회수 증가
DeveloperNoteBoardrouter.post("/ReadDeveloperNoteComments", handleReadDeveloperNoteComments); // 개발자노트 게시판 게시글의 댓글 가져오기
DeveloperNoteBoardrouter.post("/InsertDeveloperNoteComment", handleInsertDeveloperNoteComment); // 개발자노트 게시판 게시글에 댓글 등록
DeveloperNoteBoardrouter.post("/DeleteDeveloperNoteComment", handleDeleteDeveloperNoteComment); // 개발자노트 게시판 게시글의 댓글 삭제

module.exports = DeveloperNoteBoardrouter;