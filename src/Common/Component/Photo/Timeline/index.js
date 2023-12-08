import { SettingsEthernetRounded } from '@material-ui/icons';
import React, { createRef, useState,useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Person from '@material-ui/icons/Person';
import Favorite from '@material-ui/icons/Favorite';
import Grade from '@material-ui/icons/Grade';
import '../style.css';

function Timeline(props) {
  useEffect(() => {
    ReadProfile();
 }, []); 
    const PhotoSubmit =createRef(); // dom 에서 ref 기능으로 변경
    const [SendData, setSendData] = useState({"num":"", "name":"", "write":"", "contents":"", "textCommentIndex":""});
    const [Feed, setFeed] = useState([{}]);
    const [Comment, setComment] = useState({});
    const [Session, setSession] = useState({});
    const [profile, setProfile] = useState({"fileName":""});
    const CreateSession =()=> {
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
    const uploadImgPreview=()=> {
        let fileinfo = document.getElementById("img").files[0];
        let reader = new FileReader();
        reader.onload = function() {
            document.getElementById("thumbnailImg").src=reader.result;
            document.getElementById("thumbnailImg").width='450';
            document.getElementById("thumbnailImg").height='450';
        }
        if(fileinfo) {
            reader.readAsDataURL(fileinfo);
        }
    }

    // 게시글 목록 초기화
    const clearData =(i) => {

        PhotoSubmit.current.disabled=false;
        document.getElementById("img").value= null;
        document.getElementById("TextInput").value= null;
        document.getElementById("thumbnailImg").src= null;
        document.getElementById("thumbnailImg").width= '0';
        document.getElementById("thumbnailImg").height='0';
        
        if (i !== undefined) {
          document.getElementById(`textComment${i}`).value= '';
        }
        
        GetAllFeedPhoto_ORG();
    }
    // 게시글 전체 불러오기
    const GetAllFeedPhoto_ORG = () => {
       fetch('http://antsnest.co.kr:4000/GetAllFeedPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => setFeed(msg))
      .catch(err=>alert(err+'오류'));
    }

    // 댓글 등록 후 재조회
    const InsertComment = (Data) => {
      
      fetch('http://antsnest.co.kr:4000/InsertPhotoComment',{
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Data)})
        .then(() => clearData(Data.textCommentIndex))
        .catch(err=>alert('InsertComment'+err));
    }

    const InsertSetsendData = (Data, i) => {
      var commentData = {...SendData,"num":Data.pix_num, "textCommentIndex":i};

       InsertComment(commentData);
    }

    // 댓글 삭제 후 재조회
    const DeleteComment = (Data) => {
      fetch('http://antsnest.co.kr:4000/DeletePhotoComment',{
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Data)})
        .then(() => clearData())
        .catch(err=>alert('DeleteComment'+err));
    }

    // 사진 업로드
    const uploadImage = () => {
        PhotoSubmit.current.disabled='disabled';
      var form = document.getElementById("myForm");
      var formData = new FormData(form);
      fetch('http://antsnest.co.kr:4000/Upload', {
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        body: formData
      }).then((res)=>res.json())
      .then((msg)=> {clearData();})
      .catch(err=>alert(err));
      }

      useEffect(() => {
        CreateSession();
        GetAllFeedPhoto_ORG();
      }, []);

      const autoGrow = (element)=>{
        element.target.style.height = "1px";
        element.target.style.height = (20+element.target.scrollHeight)+"px";
      }
      return (
        <div>
          <p align='center'>
            <div>
              <hr size='1' width='100%' color='black'/>
            </div>
          </p>
          <p>
            <div className='WriteModeBox'>
              <div className='SubmitControl'>
                <form id='myForm' method="POST" encType="multipart/form-data" >
                <div style={{minHeight: '30px',borderRadius:'15px',backgroundColor: 'darkseagreen' , display:'flex'}}>
                <Person style={{margin:'2px',color:'white',marginLeft:'10px'}}/>
                </div>
                  <div id='ImgBox' style={{ backgroundColor:'white',padding:'1px', height:'auto',display:'none'}} className='ThumbnailView'><img style={{backgroundColor:'white'}}  id="thumbnailImg" src=""/><div style={{backgroundColor:'white'}}  id="thumbnailSrc" src=""/></div>
                  <div className='작성자정보'>
                    <textarea onInput={(e)=>autoGrow(e)} style={{resize: 'none', overflow: 'hidden', minHeight: '60px', Height: '60px',borderStyle:'solid', minWidth:'100%' ,borderWidth:'10px',borderColor:'white',padding:'10px'}} placeholder="글을 입력하세요" id='TextInput' name="TextInput" className='사진_본문입력기' value={SendData.contents} onChange={(ev)=>setSendData({...SendData,contents:ev.target.value})}></textarea>
                  </div>
                  <hr color="white"/>
                  <span style={{display: 'flex' ,paddingLeft:'10px'}}><input style={{borderWidth: '0px'}} id='img' type="file" name="img" onChange={()=>uploadImgPreview()}/></span>
                  <hr color="white"/>
                </form>
                <button style={{borderWidth: '0px',borderRadius:'15px'}} ref={PhotoSubmit} className='SubmitButton' onClick={()=>uploadImage()}>게 시</button>
              </div>
            </div>
            
            {Feed.map(function (Data, i) {
              return (
                <div className='ReadModeBox' style={{borderRadius:'15px'}}>
                       <div className='ImgScroll' style={{borderRadius:'15px',backgroundColor: 'white',boxShadow:'0 0 3px silver'}}>
                    <div className='WriteModeHeader' style={{borderTopLeftRadius:'15px',borderTopRightRadius:'10px',backgroundColor:'white'}}><img style={{marginLeft:'15px',marginTop:'15px'}} className='프로필_이미지' src={'http://antsnest.co.kr:4000/ftp/FileUpload/' + profile.fileName}/>
                    <label style={{marginLeft:'15px',lineHeight:'86px',fontWeight:'bold', fontSize:'20px'}}>{Session.UserId}</label>
                    </div>
                    <div className='imgPixHeader'>
                      <img style={{borderStyle:'solid', minWidth:'100%' ,minHeight:'100px',borderWidth:'10px',borderColor:'white',padding:'10px', border: '0px',borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: 'gainsboro'}} width="100%" src={Data.pix_loadPath!=undefined?'http://antsnest.co.kr:4000/ftp/FileUpload/'+Data.pix_loadPath:'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/>
                        <div style={{display:'flex',justifyContent:'space-between' ,height:'20px'}}>
                          <Favorite style={{color:'black',marginLeft:'20px'}}/>
                          <Grade style={{color:'black',marginRight:'20px'}}/>
                        </div>
                      </div>
                    <h4>{Data.pix_contents}</h4>
                    <div id='Comment' className="CommentBox">
                      {Feed[i].Comment === undefined ? '' : <h2 style={{margin:'5px'}}>댓글 : {Feed[i].Comment.length} 개</h2>}
                      <div className = '댓글_목록'>
                        {Feed[i].Comment === undefined ? '': Feed[i].Comment.map(function (commentList, j) {
                            return (
                              <spen>
                                <li className = '댓글_li'><b>{commentList.USER_NAME}</b>
                                  <div className = '댓글_div'>
                                    <div>
                                      {commentList.CONTENTS}
                                      <div className = '댓글_시간_div'>{commentList.CREATE_TIME}</div>
                                    </div>
                                    {Session.UserId === commentList.USER_ID ? <button className = "댓글삭제_버튼" onClick ={()=>DeleteComment(Feed[i].Comment[j])}>삭제</button>:''}   
                                  </div>
                                </li>
                                <hr color="white"/>
                              </spen>
                            );  
                          })}
                        <b>{Session.Name}</b> {/* 댓글 작성자*/}
                        <br/>
                        {Session.UserId == undefined?<div>로그인을 해야 댓글 작성이 가능합니다.</div>
                        :
                        <div className = '댓글_div'>
                          <textarea id= {`textComment${i}`} key={i} className = "댓글_textarea" onChange={(ev) => setSendData({...SendData, "commentText":ev.target.value, })}/> {/* 댓글 내용*/}
                          <button className = "댓글쓰기_버튼" onClick={() => InsertSetsendData(Data, i)}> 등록 </button><br/>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </p>
        </div>
      );
}

export default Timeline;