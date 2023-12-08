const express=require('express');
const WBSRouter = express.Router();
const Query = require('../Query/WBS_QueryString');
const {connection,pool,execute}  = require('../dbConfig');
const FileControl = require('../FileControl/FileControlManager');

//#region Get

// TODO 리스트 가져오기 (진짜 게시글 목록)
async function handleGetWorkCalendarWBS(req, res, next) {
  FileControl.FileAppend('handleGetWorkCalendarWBS 사용자 TODO 등록 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('세션 ID : ' + req.sessionID);
  FileControl.FileAppend('세션 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('handleGetWorkCalendarWBS');
  var ReturnData = {};
  try{
    ReturnData = await execute(Query.handleSelectToDoWBS, req.session.UserId);
    FileControl.FileAppend('handleInsertToDoWBS : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행실패');
    res.send(e);
  }
}

// 사진 게시글에 댓글 등록
async function handleInsertWBSComment(req, res) {
  FileControl.FileAppend('handleInsertPhotoComment start (사진게시판 댓글 등록) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  try{
    ReturnData = await execute(Query.handleInsertToDoWBS, [req.body.title,req.body.contents]);
    FileControl.FileAppend('handleInsertToDoWBS : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(JSON.stringify(ReturnData[i].Comment));
    FileControl.FileAppend('리턴값'+JSON.stringify(ReturnData));
    res.send(ReturnData);
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행성공');
  }
  catch(e)
  {
    FileControl.FileAppend('handleGetFeedPhoto_ORG 수행실패');
    res.send(e);
  }
}


//#endregion Post

WBSRouter.get("/GetWorkCalendarWBS", handleGetWorkCalendarWBS); // 사진 가져오기 handleGetFeedPhoto_ORG
WBSRouter.post("/WBSTODOInsert", handleInsertWBSComment); // 사진 게시글에 댓글 등록

module.exports = WBSRouter;