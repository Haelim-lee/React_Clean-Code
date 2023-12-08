const Query = require('../Query/WorkRoom_Infra_QueryString');
const express = require('express');
const {connection,pool,execute}  = require('../dbConfig');
const InfraRouter=express.Router();
const FileControl = require('../FileControl/FileControlManager');
//#region Get

// 인프라 게시글 목록 가져오기 (게시판 전용)
function handleSelectInfraBoard_ORG(req,res){
  FileControl.FileAppend('handleSelectInfraBoard_ORG start (인프라 게시글 목록 가져오기 (게시판 전용)) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleSelectInfraBoard_ORG, function (error, results, fields) {
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

function handleInfraCategoryList(req,res){
  FileControl.FileAppend('handleInfraCategoryList start (디자인 게시판 카테고리 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInfraCategoryList, function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 페이지 게시글 목록 가져오기
function handleSelectInfraBoardPage(req,res){
  FileControl.FileAppend('handleSelectInfraBoardPage start (인프라 게시판 페이지 게시글 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));


  var ExecQuery = req.body.IsPublic===true ? Query.handleSelectInfraBoardPage:Query.handleSelectInfraBoardPage+` and public=false  and notice_name = '`+req.session.Name+`'`;
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

// 인프라 페이지 목록 가져오기
function handleSelectInfraBoardPageList(req,res){
  FileControl.FileAppend('handleSelectInfraBoardPageList start (인프라 게시판 페이지 목록 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  var ExecQuery = Query.handleSelectInfraBoardPageList;
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
  
// 인프라 게시글 추가
function handleInsertInfraBoard(req,res){
  FileControl.FileAppend('handleInsertInfraBoard start (인프라 게시판 게시글 추가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertInfraBoard, [req.body.id, req.body.name, req.body.title, req.body.contents, req.body.category, req.body.PUBLIC === '공개'? true:false], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 게시글 삭제
function handleDeleteInfraBoard(req,res){
  FileControl.FileAppend('handleDeleteInfraBoard start (인프라 게시글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteInfraBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 게시글 수정
function handleUpdateInfraBoard(req,res){
  FileControl.FileAppend('handleUpdateInfraBoard start (인프라게시판 게시글 수정) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleUpdateInfraBoard,[req.body.title, req.body.contents, req.body.category,req.body.PUBLIC === '공개'? true:false, req.body.num],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 게시글 불러오기
function handleReadInfraBoard(req,res){
  FileControl.FileAppend('handleReadInfraBoard start (인프라 게시글 불러오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadInfraBoard,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 게시글 조회수 증가
function handleInfraSearchCountPlus(req, res) {
  FileControl.FileAppend('handleInfraSearchCountPlus start (인프라 게시글 조회수 증가) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInfraSearchCountPlus,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send('완료');
  });
}

// 인프라 게시글의 댓글 가져오기
function handleReadInfraComments(req,res){
  FileControl.FileAppend('handleReadInfraComments start (인프라 게시글의 댓글 가져오기) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleReadInfraComments,[req.body.NUM],function (error, results, fields) {
    if (error) {
      FileControl.FileAppend('쿼리에러 : ' + error);
    }

    FileControl.FileAppend('쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    res.send(results);
  });
}

// 인프라 게시글에 댓글 등록
function handleInsertInfraComment(req, res) {
  FileControl.FileAppend('handleInsertInfraComment start (인프라 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleInsertInfraComment, [req.body.noticeNum, req.body.id, req.body.name, req.body.commentText], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleInsertInfraComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleInsertInfraComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleInsertInfraComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

// 게시글의 댓글 삭제
function handleDeleteInfraComment(req, res) {
  FileControl.FileAppend('handleDeleteInfraComment start (인프라 댓글 삭제) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  // 강제로 세션에 있는 값을 집어넣음
  req.body.name = req.session.Name;
  req.body.id = req.session.UserId;
  FileControl.FileAppend('바디내용 : ' + JSON.stringify(req.body));

  connection.query(Query.handleDeleteInfraComment, [req.body.COMMENT_NUM], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleDeleteInfraComment 쿼리에러 : ' + error);
    }
    
    FileControl.FileAppend('handleDeleteInfraComment 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('handleDeleteInfraComment 쿼리결과 : ' + results);

    res.send(results);
  });
}

//#endregion Post

//register
InfraRouter.get("/SelectInfra_ORG",handleSelectInfraBoard_ORG); // 인프라 게시글 목록 가져오기 (게시판 전용)
InfraRouter.post("/SelectInfraBoardPage",handleSelectInfraBoardPage); // 인프라 페이지 게시글 목록 가져오기
InfraRouter.post("/SelectInfraBoardPageList",handleSelectInfraBoardPageList); // 인프라 페이지 목록 가져오기
InfraRouter.post("/InsertInfraBoard",handleInsertInfraBoard); // 인프라 게시글 추가
InfraRouter.post("/DeleteInfraBoard",handleDeleteInfraBoard); // 인프라 게시글 삭제
InfraRouter.post("/UpdateInfraBoard",handleUpdateInfraBoard); // 인프라 게시글 수정
InfraRouter.post("/ReadInfraBoard",handleReadInfraBoard); // 인프라 게시글 불러오기
InfraRouter.post("/InfraSearchCountPlus",handleInfraSearchCountPlus); // 인프라 게시글 조회수 증가
InfraRouter.post("/ReadInfraComments", handleReadInfraComments); // 인프라 게시글의 댓글 가져오기
InfraRouter.post("/InsertInfraComment", handleInsertInfraComment); // 인프라 게시글에 댓글 등록
InfraRouter.post("/DeleteInfraComment", handleDeleteInfraComment); // 인프라 게시글의 댓글 삭제
InfraRouter.post("/InfraCategoryList", handleInfraCategoryList); 
module.exports = InfraRouter;