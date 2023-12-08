import React, { createRef, useState , useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import ReactDOM from 'react-dom';

import MyLogo from '../../../image/MyLogo.png';
import FestLink from '../../../image/HomeContents.png';
//import FestLink from '../../../image/Portfolio25.jpg';
import ThumbnailViewer from '../ThumbnailViewer';



function LoginBox(props) {

  const [LoginData,setLoginData] = useState({"UserId":"","UserPw":""});

  const Enter_Check = (event) => {
    if (event.keyCode == 13){
      Login(LoginData)
    }
  }
  
  const LoginValidation = (msg) => {
    if (msg.ErrorMessage === -1) {
      alert("아이디가 없습니다.");
    } else if (msg.ErrorMessage === -2) {
      alert("비밀번호가 틀렸습니다.");
    }
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
      ).then((res) => res.json())
      .then((msg) => LoginValidation(msg))
      //.then((msg) => { alert(JSON.stringify(msg))})
        .then(()=>props.Refrash())
        .catch(err=>alert('Page 로그인 오류'+err));
    }
    useEffect(() => {
    }, []); 
      return (
        <div className='CenterBox'>
          <ThumbnailViewer/>
        <div className='Theme'> <img style ={{borderRadius:"30px"}} src={FestLink} width='470px' height='400px'/></div>
        <div className='UserInfo'>
        <table className='LoginTable'>
          <tbody>
          <tr>
            <th colSpan='2'><img src={MyLogo}/></th>
          </tr>
              <tr>
                <td><input type='text' className = 'User' style={{lineHeight:'30px'}} value={LoginData.UserId}  placeholder={'아이디'} onChange={(ev)=>setLoginData({...LoginData,UserId:ev.target.value})} onKeyDown = {(ev) => Enter_Check(ev)}/> </td>
              </tr>
              <tr>
                <td><input type='password' className='Password' style={{lineHeight:'30px'}}  value={LoginData.UserPw }  placeholder={'비밀번호'} onChange={(ev)=>setLoginData({...LoginData,UserPw:ev.target.value})} onKeyDown = {(ev) => Enter_Check(ev)}/></td>
              </tr>
              <tr>
                <td colSpan='2'><button className='LoginButton' onClick={()=>Login(LoginData)} >로그인</button></td>
              </tr>
              <tr>
                <td colSpan='2'><div className='회원관련창'><Link to='/FindMemberInfo' className='비밀번호찾기'>아이디·비밀번호 찾기</Link><Link to='/MemberJoin'  className='회원가입'>회원가입</Link></div></td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
      );
    }
    
  export default LoginBox;
