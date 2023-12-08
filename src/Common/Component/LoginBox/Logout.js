import React, { createRef, useState , useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import ReactDOM from 'react-dom';

import MyLogo from '../../../image/MyLogo.png';
import FestLink from '../../../image/HomeContents.png';
import ThumbnailViewer from '../ThumbnailViewer';
import SlideShowGallery from '../SlideShowGallery';

import MyInfoUpdate from '../LoginBox/MyInfoUpdate';


function LoginBox(props) {

  const [profile, setProfile] = useState({"fileName":""});

    const LoginOut=()=>{
        fetch('http://antsnest.co.kr:4000/Logout',{credentials:'include'})
        .then(()=>props.Refrash())
        .catch(err=>alert(err+'로그아웃 오류'));
      }

    const changeProfile=()=> {
      
      let fileinfo = document.getElementById("img").files[0];
      let reader = new FileReader();
      reader.onload = function() {
          
        uploadImage();
      }
      if(fileinfo) {
          reader.readAsDataURL(fileinfo);
      }
    }

    // 프로필 사진 가져오기
    const ReadProfile = () => {
      fetch('http://antsnest.co.kr:4000/ReadProfile', {
        method:'POST',
        mode: 'cors',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"UserId":props.UserInfo.UserId})})
        .then(res=>res.json())
        .then(msg => sendImage(msg))
        .catch(err=>alert(err));
    }


    // 프로필 변경
    const uploadImage = () => {

    var form = document.getElementById("myForm");
    var formData = new FormData(form);
    fetch('http://antsnest.co.kr:4000/ProfileChange', {
      method: 'POST',
      mode: 'cors',
      credentials:'include',
      body: formData
    }).then((res)=>res.json())
    .then(() => ReadProfile())
    .catch(err=>alert(err));
    }

    // 프로필 파일명 세팅
    const sendImage = (data) => {

      
      if (data.length===0) 
      {
        setProfile({...profile,fileName:'NoImage.png'});
      }
      else
        {
          setProfile({...profile,fileName:data[0].FILE_NAME});
        }
    }

    const myInfoChange = () => {

      alert("정보를 수정하시게요?");
    }

    useEffect(() => {
       ReadProfile();
    }, []); 

    return (
      <div className='CenterBox'>
    <ThumbnailViewer/>
      <div className='Theme'> 
        <img style ={{borderRadius:"30px"}} src={FestLink} width='470px' height='400px'/>
      </div>
          <table className='LoginTable'>
        <tr>
          <td colSpan='2' style={{padding:'0px',height:'263px'}}><Link to='/MyInfoUpdate'><img src={MyLogo}/></Link></td>
        </tr>
        <tr>
        <div className='UserInfo'>
        <div class='개인정보'>
          <div class='프로필사진' Link>
            <form id='myForm' method="POST" encType="multipart/form-data" >
              <div className='사진파일_배경'>
                <label for='Userimg'><img className='프로필_이미지' src={'http://antsnest.co.kr:4000/ftp/FileUpload/' + profile.fileName}/></label>
                <input className='사진파일_히든' id='Userimg' type="file" name="Userimg" accept="image/*" onChange={()=> changeProfile()}/>
              </div>
            </form>
          </div>
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
    
  export default LoginBox;