import React, { createRef, useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import MyLogo from '../../../image/MyLogo.png';
import './style.css';


function MobileLoginView(props) {
  const [LoginData,setLoginData] = useState({"UserId":"","UserPw":""});
      return (
      <div className='MyInfoBox'>
        <table className='LoginTable'>
          <tr>
            <td colSpan='2'><img src={MyLogo}/></td>
          </tr>
              <tr>
                <td><input type='text' className = 'User' value={LoginData.UserId}  placeholder={'아이디'} onChange={(ev)=>setLoginData({...LoginData,UserId:ev.target.value})}/> </td>
              </tr>
              <tr>
                <td><input type='password' className='Password' value={LoginData.UserPw }  placeholder={'비밀번호'} onChange={(ev)=>setLoginData({...LoginData,UserPw:ev.target.value})}/></td>
              </tr>
              <tr>
                <td colSpan='2'><button className='LoginButton' onClick={()=>props.Login(LoginData) }>로그인</button></td>
              </tr>
              <tr>
                <td colSpan='2'><div className='회원관련창'><Link className='비밀번호찾기'>아이디·비밀번호 찾기</Link><Link to='/MemberJoin'  className='회원가입'>회원가입</Link></div></td>
              </tr>
          </table>
        </div>
      );
    }
  export default MobileLoginView;
