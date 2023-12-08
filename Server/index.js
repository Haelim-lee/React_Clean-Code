//라이브러리
const http = require('http');
const express = require('express');
const bodyPaser = require('body-parser');
const dataUtil = require('date-utils');//new Date쓸때 써야함
const socketio = require('socket.io');
const cors = require('cors');
const FileControl = require('./FileControl/FileControlManager');


//외부라우터
const DevloperRouter= require('./WorkRoom/DeveloperRouter');
const ModelerRouter= require('./WorkRoom/ModelerRouter');
const DesignRouter= require('./WorkRoom/DesignRouter');
const InfraRouter= require('./WorkRoom/InfraRouter');
const WorkRouter= require('./WorkRoom/WorkRouter');
const PlanRouter= require('./WorkRoom/PlanRouter');
const MediaRouter= require('./WorkRoom/MediaRouter');

// 고객지원
const QARouter= require('./QA/QARouter');
const WBSRouter= require('./WBS/WBSRouter');

//
const FreeBoardRouter = require('./Board/FreeBoardRouter');
const NewsBoardRouter = require('./Board/NewsBoardRouter');
const QaBoardRouter = require('./Board/QaBoardRouter');
const DeveloperNoteBoardRouter = require('./Board/DeveloperNoteBoardRouter');
const PhotoRouter = require('./Photo/PhotoRouter');
const Member = require('./Member/MemberRouter');


//Smtp서버


//Sokect 서버설정
const app = express();
const server = http.createServer(app);
const MySession = require('./SessionManager/Session');
const io = socketio(server, { cors: {origin: "*"}});

//채팅방용 외부 메소드
const { addUser, removeUser, getUser, getUsersInRoom ,users} = require('./users');

var whitelist = ['http://localhost:8147','http://m.antsnest.co.kr','http://m.antsnest.co.kr:8147','http://m.antsnest.co.kr:4000','http://www.antsnest.co.kr','http://www.antsnest.co.kr:8147','http://www.antsnest.co.kr:4000','http://antsnest.co.kr','http://antsnest.co.kr:8147','http://antsnest.co.kr:4000','http://dexhive.iptime.co.kr','http://dexhive.iptime.co.kr:8147','http://antsnest.co.kr:4000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      FileControl.FileAppend('콜백 시작 : ' + origin);
      FileControl.FileAppend('콜백 시작' +origin);
      callback(null, true)
    } else if (origin === undefined ){
      FileControl.FileAppend('콜백 시작 : ' + origin);
      FileControl.FileAppend('콜백 시작' +origin);
    } else {
      FileControl.FileAppend('origin 주소 : ' + origin);
      FileControl.FileAppend('콜백 시작' +origin);
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
}

app.use(express.static('static'));
app.use(express.static('src'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:false}));
app.use(MySession);
app.use(cors(corsOptions));
app.use(DevloperRouter);
app.use(ModelerRouter);
app.use(DesignRouter);
app.use(InfraRouter);
app.use(WorkRouter);
app.use(PlanRouter);
app.use(MediaRouter);
app.use(QARouter);
app.use(WBSRouter);
app.use(FreeBoardRouter);
app.use(NewsBoardRouter);
app.use(QaBoardRouter);
app.use(DeveloperNoteBoardRouter);
app.use(PhotoRouter);
app.use(Member);


// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    FileControl.FileAppend('조인수행');
    FileControl.FileAppend('조인수행');
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    socket.join(user.room);
    socket.emit('message', { user: '관리자', text: ` 접속정보 [아이디: ${user.name}, 방제목 : ${user.room}]`});
    socket.broadcast.to(user.room).emit('message', { user: '관리자', text: `${user.name} 님이 접속!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    FileControl.FileAppend('sendMessage');
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('getAllUser', (message,callback) => {
    FileControl.FileAppend(message)
    FileControl.FileAppend(socket.id);
    FileControl.FileAppend(users);
    io.to(socket.id).emit('getAllUser', users);
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      FileControl.FileAppend('disconnect');
      io.to(user.room).emit('message', { user: '관리자', text: `${user.name} 님이 퇴장.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 4000, () => FileControl.FileAppend(`서버 시작.....`));



