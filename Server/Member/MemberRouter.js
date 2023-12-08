const crypto = require('crypto');
const {connection,pool,execute}  = require('../dbConfig');
const express=require('express');
const cors = require('cors');
const Query = require('../QueryString');
const MemberRouter = express.Router();
const bodyPaser = require('body-parser');
const upload = require('../FileUpload/ProfileChange');
const sendEmail = require('../SmtpRouter');
const RequestIp = require('request-ip');
const FileControl = require('../FileControl/FileControlManager');

MemberRouter.use(bodyPaser.json());

//#region Get

// 세션 생성
function handleCreateSession(req, res,next) {
  FileControl.FileAppend('handleCreateSession (세션 생성 시작) :[' + RequestIp.getClientIp(req) +']'+ new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  let session = req.session;
  res.send(session);

  FileControl.FileAppend("세션정보 : "+ JSON.stringify(req.session));
  FileControl.FileAppend("세션 ID : " + req.sessionID);
}

//#endregion Get

//#region Post

// 사용자 로그인
function handleMemberLogin(req,res,next){
  let ResponseData = {};
  FileControl.FileAppend('handleMemberLogin (로그인 시작) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('handleMemberLogin (정보) : ' + JSON.stringify(req.body));
  connection.query(Query.handleSelectUserInfo,[req.body.UserId], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleMemberLogin (SQL 에러) : ' + error);
    }

    FileControl.FileAppend('handleMemberLogin (결과) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend(results);

    if (results.length > 0) {

        if(String(results[0].USER_ID) === String(req.body.UserId)){
        
        if(String(results[0].USER_PW) === req.body.UserPw){
  
          FileControl.FileAppend("handleMemberLogin (비밀번호 일치) : " + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
          // 세션 설정
          req.session.UserId = results[0].USER_ID;
          req.session.UserPw = results[0].USER_PW;
          req.session.Name = results[0].USER_NAME;
          req.session.State='LOGIN';
          FileControl.FileAppend("로그인정보 : " + JSON.stringify(req.session.UserId));
          FileControl.FileAppend("세션정보 : " + JSON.stringify(req.session));
          FileControl.FileAppend("세션 ID : " + req.sessionID);

          res.send(req.session);
        }
        else{
            FileControl.FileAppend("handleMemberLogin (비밀번호 불일치) : " + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            FileControl.FileAppend("세션정보 : " + JSON.stringify(req.session));
            FileControl.FileAppend("세션 ID : " + req.sessionID);

            ResponseData.ErrorMessage = -2//'비밀번호가 틀렸습니다.';

            res.send(ResponseData);
        }
      }
      else{
        FileControl.FileAppend("handleMemberLogin (아이디 불일치) : " + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        FileControl.FileAppend("세션정보 : " + JSON.stringify(req.session));
        FileControl.FileAppend("세션 ID : " + req.sessionID);

        ResponseData.ErrorMessage = -1//'비밀번호가 틀렸습니다.';

        res.send(ResponseData);
    }  
    }
    else{
      FileControl.FileAppend(" handleMemberLogin (아이디가 없음) " + + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
      FileControl.FileAppend("사용자 ID : " + req.body.UserId);

      ResponseData.ErrorMessage = -1//'아이디가 없습니다.';
      
      res.send(ResponseData);
    }
  });
}

// 회원가입
function handleMemberJoin(req,res,next){
  FileControl.FileAppend('handleLoginMemberJoin start ( 회원가입 시작) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleInsertMember,[req.body.UserId,req.body.UserPw,req.body.UserName,req.body.UserBirthDay,req.body.UserEmail,req.body.Gender], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('회원가입 에러 : ' + error);
    }
    FileControl.FileAppend('회원가입 성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

    res.send(req.session);
  });
}

// 로그아웃
function handleMemberLogOut(req,res){
  req.session.State = 'LOGOUT';
  FileControl.FileAppend('로그아웃' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.redirect('/Destroy');
}

// 세션 종료
function handleMemberDestroy(req,res){
  req.session.State = 'LOGOUT';
  res.clearCookie('sid');
  req.session.destroy();
  FileControl.FileAppend('세션종료' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(req.session);
}

// 프로필 사진 가져오기
function handleReadProfile(req, res,next) {
  FileControl.FileAppend('handleReadProfile 프로필 사진 가져오기 시작 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

  connection.query(Query.handleReadProfile, [req.session.UserId], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('handleReadProfile 쿼리에러 : ' + error);
    }

    FileControl.FileAppend('handleReadProfile : 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('쿼리 결과 : ' + JSON.stringify(results));
    
    res.send(results);
  });
}



// 프로필 사진 변경
async function handleProfileChange(req,res,next){

  let ResponseData = {};
  FileControl.FileAppend('handleProfileChange start (프로필 사진 변경 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  FileControl.FileAppend('요청 사용자 ID : ' + req.session.UserId);
  FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
  
  if(req.session.UserId != undefined){
    ResponseData.filename= req.file.filename;
        
    connection.query(Query.handleProfileChange,[req.session.UserId, req.file.filename], function (error, results, fields) {
      if (error) {
        FileControl.FileAppend('handleProfileChange 쿼리에러 :' + error);
      }
      
      FileControl.FileAppend('handleProfileChange 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    });
  }
  
  FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  res.send(ResponseData);
}

// 아이디찾기
function handleMemberFindId(req,res,next){
  FileControl.FileAppend('MemberFindId start ( 회원아이디 찾기 시작) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleSelectFindUserId,[req.body.UserName,req.body.UserEmail], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('회원가입 에러 : ' + error);
    }
    FileControl.FileAppend(req.body.UserName);
    FileControl.FileAppend(req.body.UserEmail);
    FileControl.FileAppend(results);
    FileControl.FileAppend('아이디 찾기 성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    res.send(results);
  });
}
// 비밀번호찾기
function handleMemberFindPw(req,res,next){
  
  FileControl.FileAppend('handleMemberFindPw start ( 비번찾기 시작) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleSelectFindUserPw,[req.body.UserId,req.body.UserEmail], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('회원가입 에러 : ' + error);
    }
    FileControl.FileAppend(req.body.UserId);
    FileControl.FileAppend(req.body.UserEmail);
    let Scr ='';
    FileControl.FileAppend(Scr);

    for(let i=0; i < 6 ;i++){
      Scr += String(crypto.randomInt(0,9));
    }

    sendEmail(req.body.UserEmail,'비밀번호 찾기 인증번호','인증키:'+Scr);
    FileControl.FileAppend(results);
    FileControl.FileAppend('비밀번호 성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));

    res.send({"Key":Scr});
  });
}
// 비밀번호 업데이트
function handleMemberPwUpdate(req,res,next){
  FileControl.FileAppend('handleMemberPwUpdate start ( 회원비번 변경 시작) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  connection.query(Query.handleMemberUpdatePassword,[req.body.UserPw,req.body.UserId], function (error, results, fields) {
    if (error) {
        FileControl.FileAppend('회원가입 에러 : ' + error);
    }
    FileControl.FileAppend(req.body.UserName);
    FileControl.FileAppend(req.body.UserEmail);
    FileControl.FileAppend(results);
    FileControl.FileAppend('변경 성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    res.send(results);
  });
}
//#endregion Post
  
MemberRouter.get("/Destroy", handleMemberDestroy); // 세션 종료
MemberRouter.get("/Logout", handleMemberLogOut); // 로그아웃
// 로그인 POST
MemberRouter.get("/CreateSession", handleCreateSession); // 세션 생성
MemberRouter.post("/Login", handleMemberLogin); // 로그인
MemberRouter.post("/MemberFindId", handleMemberFindId); // 로그인
MemberRouter.post("/MemberFindPw", handleMemberFindPw); // 로그인
MemberRouter.post("/MemberPwUpdate", handleMemberPwUpdate); // 로그인

MemberRouter.post("/Join", handleMemberJoin); // 회원가입
MemberRouter.post("/ReadProfile", handleReadProfile); // 프로필사진 가져오기
MemberRouter.post("/ProfileChange", upload.single('img'), handleProfileChange); // 프로필사진 변경

module.exports = MemberRouter;