const Query = require('../QueryString');
const express=require('express');
const {connection,pool,execute}  = require('../dbConfig');
const NewsBoardrouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region  Get

// 공지사항 게시글 목록 가져오기 (Home 화면 전용)
function handleSelectNews(req,res){
  FileControl.FileAppend('handleSelectNews start (공지사항 게시글 목록 가져오기 (Home 화면 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectNews, function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 목록 가져오기 (게시판 전용)
function handleSelectNews_ORG(req,res){
  FileControl.FileAppend('handleSelectNews_ORG start (공지사항 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectNews_ORG, function (error, results, fields) {
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

// 공지사항 페이지 게시글 목록 가져오기
function handleSelectNewsBoardPage(req,res){
  FileControl.FileAppend('handleSelectNewsBoardPage start (공지사항 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectNewsBoardPage,[req.body.MinNumber,req.body.MaxNumber], function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);
    res.send(results);
  });
}

// 공지사항 페이지 목록 가져오기
function handleSelectNewsBoardPageList(req,res){
  FileControl.FileAppend('handleSelectNewsBoardPageList start (공지사항 페이지 목록 가져오기) : ' + + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleSelectNewsBoardPageList, function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 추가
function handleInsertNewsBoard(req,res){
  FileControl.FileAppend('handleInsertNewsBoard start (공지사항 게시글 추가) : + ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertNewsBoard ,[req.body.id, req.body.name,req.body.title,req.body.contents],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 삭제
function handleDeleteNewsBoard(req,res){
  FileControl.FileAppend('handleDeleteNewsBoard start (공지사항 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteNewsBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 수정
function handleUpdateNewsBoard(req,res){
  FileControl.FileAppend('handleUpdateNewsBoard start (공지사항 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateNewsBoard,[req.body.title,req.body.contents,req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 불러오기
function handleReadNewsBoard(req,res){
  FileControl.FileAppend('handleReadNewsBoard start (공지사항 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));
  
  connection.query(Query.handleReadNewsBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글 조회수 증가
function handleNewsSearchCountPlus(req, res) {
  FileControl.FileAppend('handleNewsSearchCountPlus start (공지사항 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleNewsSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 공지사항 게시글의 댓글 가져오기
function handleReadNewsComments(req,res){
  FileControl.FileAppend('handleReadNewsComments start (공지사항 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadNewsComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 공지사항 게시글에 댓글 등록
function handleInsertNewsComment(req, res) {
  FileControl.FileAppend('handleInsertNewsComment start (자유게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertNewsComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertNewsComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertNewsComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertNewsComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 공지사항 게시글의 댓글 삭제
function handleDeleteNewsComment(req, res) {
  FileControl.FileAppend('handleDeleteNewsComment start (자유게시판 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteNewsComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteNewsComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteNewsComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteNewsComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
NewsBoardrouter.get("/SelectNews",handleSelectNews); // 공지사항 게시글 목록 가져오기 (Home 화면 전용)
NewsBoardrouter.get("/SelectNews_ORG",handleSelectNews_ORG); // 공지사항 게시글 목록 가져오기 (게시판 전용)
NewsBoardrouter.post("/SelectNewsBoardPage",handleSelectNewsBoardPage); // 공지사항 페이지 게시글 목록 가져오기
NewsBoardrouter.post("/SelectNewsBoardPageList",handleSelectNewsBoardPageList); // 공지사항 페이지 목록 가져오기
NewsBoardrouter.post("/InsertNewsBoard",handleInsertNewsBoard); // 공지사항 게시글 추가
NewsBoardrouter.post("/DeleteNewsBoard",handleDeleteNewsBoard); // 공지사항 게시글 삭제
NewsBoardrouter.post("/UpdateNewsBoard",handleUpdateNewsBoard); // 공지사항 게시글 수정
NewsBoardrouter.post("/ReadNewsBoard",handleReadNewsBoard); // 공지사항 게시글 불러오기
NewsBoardrouter.post("/NewsSearchCountPlus",handleNewsSearchCountPlus); // 공지사항 게시글 조회수 증가
NewsBoardrouter.post("/ReadNewsComments", handleReadNewsComments); // 공지사항 게시글의 댓글 가져오기
NewsBoardrouter.post("/InsertNewsComment", handleInsertNewsComment); // 공지사항 게시글에 댓글 등록
NewsBoardrouter.post("/DeleteNewsComment", handleDeleteNewsComment); // 공지사항 게시글의 댓글 삭제

module.exports = NewsBoardrouter;