import React, { createRef, useState } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import ReactDOM from 'react-dom';

import MyLogo from '../../../image/MyLogo.png';
import FestLink from '../../../image/HomeContents.png';



function MobileLogoutView(props) {
    const LoginOut=()=>{
        fetch('http://antsnest.co.kr:4000/Logout',{credentials:'include'})
        .then(props.Refrash())
        .catch(err=>alert(err+'로그아웃 오류'));
      }
      return (
       
        <div className='MyInfoBox'>
            <table className='LoginTable'>
          <tr>
            <td colSpan='2'><img src={MyLogo}/></td>
          </tr>
          <tr>
          <div className='UserInfo'>
          <div class='개인정보'>
            <div class='프로필사진'> <img className='profile' width='100%' height='100%' src={'http://antsnest.co.kr:4000/ftp/FileUpload/NoImage.png'}/></div>
            <div class='계정정보'>
            <div><b>아이디</b> : {props.UserInfo.UserId}</div>
            <div><b>사용자명</b> : {props.UserInfo.Name}</div>
            <div><b>등급</b> : 회원</div>
            </div>
          </div>
              <button className='LoginButton' onClick={()=>LoginOut()}>로그아웃</button>
          </div>
          </tr>
          </table>
          </div>
      );
    }
  
  
    
  export default MobileLogoutView;
