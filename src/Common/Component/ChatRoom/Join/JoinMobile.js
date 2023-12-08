import React, { createRef, useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import MyLogo from '../../../../image/MyLogo.png';

import './Join.css';
// import Check from '../Check/Check';

const Join = () => {
    const ENDPOINT = 'http://antsnest.co.kr:4000/';
    const [Session,setSession] = useState({});
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [AllUsers, setAllUsers] = useState([{}]);
    const SelectedRoom = createRef();
    const SelectedName = createRef();
    let socket=io(ENDPOINT);
    const setRoomName=(room)=>{
      SelectedRoom.current.value = room;
      setRoom(room);
    }
    const getRoomList = ()=>{
        socket.emit("getAllUser", 'getUserInfo',()=>{});
        socket.on("getAllUser", (users)=>setAllUsers(users));
    }
    const CreateSession=()=>{
      fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setSession(msg)})
      .catch(err=>alert(err+'오류'));
    }
      useEffect(() => {
        CreateSession();
        getRoomList();
      }, []); 
      useEffect(() => {  if(Session.State == 'LOGIN') { SelectedName.current.value=Session.UserId ;setName(Session.UserId);}  }, [Session]); 
      
    return (
       <div className="joinOuterContainer">
            <div className="joinContainerBox">
                          <img src={MyLogo}/>
                <div className="joinInnerContainer">
                          <h1 className="heading">앤츠네스트 채팅방</h1>
                          <div><input ref={SelectedName} placeholder="대화명" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                          <div><input ref={SelectedRoom}  placeholder="방제목" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                          <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                  <button className={'button mt-20'} type="submit">Sign In</button>
                  </Link>
                </div>
                    <h1>채팅방 목록</h1>
                            {AllUsers==={}?'':AllUsers.map((Data,i) => (
                              <span>
                                    <hr/>
                                    <li onClick={()=>setRoomName(Data.room)}>[방제목 : {Data.room}] [방장 : {Data.name}]</li>
                                    <hr/>
                              </span>
                              ))}
           </div>
       </div>
    )
}

export default Join;