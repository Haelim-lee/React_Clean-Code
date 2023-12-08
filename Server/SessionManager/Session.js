const session = require('express-session');
//const FileStore = require('session-file-store')(session)
const MySession=session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
      secure:false
    }
    
  });
  module.exports = MySession;


  