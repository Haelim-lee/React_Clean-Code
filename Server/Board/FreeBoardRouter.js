const Query = require('../QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const FreeBoardrouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region Get

// 자유게시판 게시글 목록 가져오기 (Home 화면 전용)
function handleSelectFreeBoard(req,res){
    FileControl.FileAppend('handleSelectFreeBoard start (자유게시판 게시글 목록 가져오기 (Home 화면 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

    connection.query(Query.handleSelectFreeBoard, function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('쿼리에러' + error);
      }

      FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
      FileControl.FileAppend(results);

      res.send(results);
    });
  }

// 자유게시판 게시글 목록 가져오기 (게시판 전용)
function handleSelectFreeBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectFreeBoard_ORG start (자유게시판 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectFreeBoard_ORG, function (error, results, fields) {
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

// 자유게시판 페이지 게시글 목록 가져오기
function handleSelectFreeBoardPage(req,res){
  FileControl.FileAppend('handleSelectFreeBoardPage start (자유게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectFreeBoardPage,[req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 페이지 목록 가져오기
function handleSelectFreeBoardPageList(req,res){
  FileControl.FileAppend('handleSelectFreeBoardPageList start (자유게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectFreeBoardPageList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}
  
// 자유게시판 게시글 추가
function handleInsertFreeBoard(req,res){
  FileControl.FileAppend('handleInsertFreeBoard start (자유게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertFreeBoard, [req.body.id, req.body.name, req.body.title, req.body.contents], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 게시글 삭제
function handleDeleteFreeBoard(req,res){
  FileControl.FileAppend('handleDeleteFreeBoard start (자유게시판 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteFreeBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 게시글 수정
function handleUpdateFreeBoard(req,res){
  FileControl.FileAppend('handleUpdateFreeBoard start (자유게시판 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateFreeBoard,[req.body.title, req.body.contents, req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 게시글 불러오기
function handleReadFreeBoard(req,res){
  FileControl.FileAppend('handleReadFreeBoard start (자유게시판 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadFreeBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 게시글 조회수 증가
function handleFreeSearchCountPlus(req, res) {
  FileControl.FileAppend('handleFreeSearchCountPlus start (자유게시판 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleFreeSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 자유게시판 게시글의 댓글 가져오기
function handleReadFreeComments(req,res){
  FileControl.FileAppend('handleReadFreeComments start (자유게시판 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadFreeComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 자유게시판 게시글에 댓글 등록
function handleInsertFreeComment(req, res) {
  FileControl.FileAppend('handleInsertFreeComment start (자유게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertFreeComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertFreeComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertFreeComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertFreeComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteFreeComment(req, res) {
  FileControl.FileAppend('handleDeleteFreeComment start (자유게시판 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteFreeComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteFreeComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteFreeComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteFreeComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
FreeBoardrouter.get("/SelectFree",handleSelectFreeBoard); // 자유게시판 게시글 목록 가져오기 (Home 화면 전용)
FreeBoardrouter.get("/SelectFree_ORG",handleSelectFreeBoard_ORG); // 자유게시판 게시글 목록 가져오기 (게시판 전용)
FreeBoardrouter.post("/SelectFreeBoardPage",handleSelectFreeBoardPage); // 자유게시판 페이지 게시글 목록 가져오기
FreeBoardrouter.post("/SelectFreeBoardPageList",handleSelectFreeBoardPageList); // 자유게시판 페이지 목록 가져오기
FreeBoardrouter.post("/InsertFreeBoard",handleInsertFreeBoard); // 자유게시판 게시글 추가
FreeBoardrouter.post("/DeleteFreeBoard",handleDeleteFreeBoard); // 자유게시판 게시글 삭제
FreeBoardrouter.post("/UpdateFreeBoard",handleUpdateFreeBoard); // 자유게시판 게시글 수정
FreeBoardrouter.post("/ReadFreeBoard",handleReadFreeBoard); // 자유게시판 게시글 불러오기
FreeBoardrouter.post("/FreeSearchCountPlus",handleFreeSearchCountPlus); // 자유게시판 게시글 조회수 증가
FreeBoardrouter.post("/ReadFreeComments", handleReadFreeComments); // 자유게시판 게시글의 댓글 가져오기
FreeBoardrouter.post("/InsertFreeComment", handleInsertFreeComment); // 자유게시판 게시글에 댓글 등록
FreeBoardrouter.post("/DeleteFreeComment", handleDeleteFreeComment); // 자유게시판 게시글의 댓글 삭제

module.exports = FreeBoardrouter;