import React, { createRef, useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Link, Redirect} from 'react-router-dom';
import DefaultImg from '../../../ftp/NoImage.png';
import './style.css';




function Photo(props) {
  useEffect(() => {
    ReadProfile();
 }, []); 
  const PhotoSubmit = createRef();
  const [SendData,setSendData] = useState({"num":"","name":"","write":"","contents":""});
  const [DefaultImage,setDefaultImage] = DefaultImg;
  const [Feed,setFeed] = useState([{}]);
  const [Session,setSession] = useState({});
  const [profile, setProfile] = useState({"fileName":""});
  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {setSession(msg)})
    .catch(err=>alert(err+'오류'));
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
   // 프로필 사진 가져오기
   const ReadProfile = () => {
    fetch('http://antsnest.co.kr:4000/ReadProfile', {
      method:'POST',
      mode: 'cors',
      credentials:'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"UserId":Session.UserId})})
      .then(res=>res.json())
      .then(msg => sendImage(msg))
      .catch(err=>alert(err));
  }
  const uploadImgPreview=()=>{
    let fileinfo= document.getElementById("img").files[0];
    let reader = new FileReader();
    reader.onload = function(){
      document.getElementById("thumbnailImg").src=reader.result;
      document.getElementById("thumbnailImg").width='450';
      document.getElementById("thumbnailImg").height='490';
      //document.getElementById("thumbnailSrc").innerText=reader.result;
    }
    if(fileinfo){
      reader.readAsDataURL(fileinfo);
    }
  }
    const clearData=()=>{
      PhotoSubmit.current.disabled=false;
      document.getElementById("img").value=null;
      document.getElementById("TextInput").value=null;
      document.getElementById("thumbnailImg").src=null;
      document.getElementById("thumbnailImg").width='0';
      document.getElementById("thumbnailImg").height='0';
      GetFeedPhoto_ORG();
    }
    const GetFeedPhoto_ORG=()=>{
      fetch('http://antsnest.co.kr:4000/GetFeedPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
      //    .then(msg=>alert(JSON.stringify(msg)))
      .catch(err=>alert(err+'오류'));
    }
    const uploadImage =()=> {
      PhotoSubmit.current.disabled='disabled';
      var form = document.getElementById("myForm");
      var formData = new FormData(form);
      fetch('http://antsnest.co.kr:4000/Upload', {
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        body: formData
      }).then((res)=>res.json()).then((msg)=> {clearData();})
      .catch(err=>alert(err));
      }
      useEffect(() => {
        CreateSession();
        GetFeedPhoto_ORG();
      }, []); 
      return (
        <div className='Wrapper'>
           <p align='center'>
              <div className='TabControl'>
           <hr size='1' width='600px' color='black'/>
                  <div className='TabPageBig'>
                      <ul className="SubNav">
                      <li><a id='Portfolio' className="TabActive"  id="Portfolio" > 타임라인 </a></li>
                      <li><a id='WorkCalendar' className=""  id="FREE"> 내사진첩</a></li>
                      </ul>
                    </div>          
              <hr size='1' width='600px' color='black'/>
              </div>
          </p>
          <p>
          {Session.State != 'LOGIN' ?'':
           <div className='WriteModeBox'>
                  <div className='SubmitControl'>
                    <form id='myForm' method="POST" encType="multipart/form-data" >
                        <div className='ThumbnailView'><img id="thumbnailImg" src=""/><div id="thumbnailSrc" src=""/></div>
                      <div class='작성자정보'>
                          <div class='사진첩_프로필사진'> 
                          </div>
                          <textarea id='TextInput' name="TextInput" className='사진_본문입력기' value={SendData.contents}  onChange={(ev)=>setSendData({...SendData,contents:ev.target.value})}></textarea>
                      </div>
                        <hr/>
                        <input id='img' type="file" name="img" onChange={()=>uploadImgPreview()}/>
                        <hr/>
                    </form>
                        <button ref={PhotoSubmit}  className='SubmitButton' onClick={()=>uploadImage()}>게시</button>
                  </div>
          </div>}
          {Feed.map((Data,i) => (
            <div className='ReadModeBox' style={{borderRadius:'15px'}}>
            <div className='ImgScroll'  style={{borderRadius:'15px'}}>
              <div className='WriteModeHeader' style={{borderTopLeftRadius:'15px',borderTopRightRadius:'15px',backgroundColor:'whitesmoke'}}>
                <img style={{marginLeft:'10px',marginTop:'10px' }} className='프로필_이미지' src={'http://antsnest.co.kr:4000/ftp/FileUpload/' + profile.fileName}/> 
              <label style={{marginLeft:'10px',lineHeight:'90px',fontWeight:'bold', fontSize:'20px'}}>{Session.UserId}</label></div>
              <div className='imgPixHeader'><img width="100%"  src={Data.pix_loadPath!=undefined?'http://antsnest.co.kr:4000/ftp/FileUpload/'+Data.pix_loadPath:'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/></div>
              <h4>{Data.pix_contents}</h4>
              <hr/>
              <div className='WriteModeFooter'>댓글</div>
            </div>
          </div>
            ))}
        </p>
            </div>
      );
    }
  
  
    
  export default Photo;
