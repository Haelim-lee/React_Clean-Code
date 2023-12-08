import React, { createRef, useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import MyLogo from '../../../image/MyLogo.png';
import MobileLoginView from './MobileLoginView';
import MobileLogoutView from './MobileLogoutView';


function LoginBox(props) {
  const [Session,setSession] = useState({});
  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {setSession(msg)})
    .catch(err=>alert(err+'오류'));
  }
    const Login=(Data)=>{
      if(Data.UserId==='')
      {
        alert('아이디를 입력하세요');
        return;
      }
      if(Data.UserPw==='')
      {
        alert('비밀번호를 입력하세요');
        return;
      }
        fetch('http://antsnest.co.kr:4000/Login', {
          method: 'POST',
          mode: 'cors',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Data)}
          ).then((res)=>res.json())
          .then(()=>CreateSession())
          .catch(err=>alert('Page 로그인 오류'+err));
    }
    useEffect(() => {
      CreateSession();
    }, []); 
    
      return (
        <div className='Wrapper'><p>      
        {Session.State != 'LOGIN' ?<MobileLoginView Login={Login}/> : <MobileLogoutView  UserInfo={Session} Refrash={()=>CreateSession()}/>}
        </p></div>
        );
    }
  
  
    
  export default LoginBox;
