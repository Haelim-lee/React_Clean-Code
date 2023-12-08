import { FeedbackRounded, Label, SpeakerNotes } from '@material-ui/icons';
import React, { createRef, useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../style.css';

function MyPicture(props) {
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

        GetFeedPhoto_ORG();
    }

    // 게시글 전체 불러오기
    const GetFeedPhoto_ORG = () => {
       fetch('http://antsnest.co.kr:4000/GetFeedPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
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
        GetFeedPhoto_ORG();
      }, []);

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
                  <div className='ThumbnailView'><img id="thumbnailImg" src=""/><div id="thumbnailSrc" src=""/></div>
                  <div class='작성자정보'>
                    <div class='사진첩_프로필사진'> <img className='profile' width='100%' height='100%' src={'http://antsnest.co.kr:4000/ftp/FileUpload/NoImage.png'}/></div>
                    <textarea id='TextInput' name="TextInput" className='사진_본문입력기' value={SendData.contents}  onChange={(ev)=>setSendData({...SendData,contents:ev.target.value})}></textarea>
                  </div>
                  <hr/>
                  <input id='img' type="file" name="img" onChange={()=>uploadImgPreview()}/>
                  <hr/>
                </form>
                <button ref={PhotoSubmit}  className='SubmitButton' onClick={()=>uploadImage()}>게시</button>
              </div>
            </div>

            {Feed.map(function (Data, i) {
              return(
                <div className='ReadModeBox' style={{borderRadius:'15px'}}>
                       <div className='ImgScroll'  style={{borderRadius:'15px'}}>
                    <div className='WriteModeHeader' style={{borderTopLeftRadius:'15px',borderTopRightRadius:'15px',backgroundColor:'whitesmoke'}}> 
                    <img  style={{marginLeft:'10px',marginTop:'10px' }} className='프로필_이미지' src={'http://antsnest.co.kr:4000/ftp/FileUpload/' + profile.fileName}/>
                    <label style={{marginLeft:'10px',lineHeight:'90px',fontWeight:'bold', fontSize:'20px'}}>{Session.UserId}</label>
                    </div>
                    <div className='imgPixHeader'><img width="100%" src={Data.pix_loadPath!=undefined?'http://antsnest.co.kr:4000/ftp/FileUpload/'+Data.pix_loadPath:'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/></div>
                    <h4>{Data.pix_contents}</h4>
                    <div id='Comment' className="CommentBox">
                      {Feed[i].Comment === undefined ? '' : <h1>댓글 : {Feed[i].Comment.length} 개</h1>}
                      <div className = '댓글_목록'>
                        {Feed[i].Comment === undefined ? '': Feed[i].Comment.map(function (commentList, j){
                          return(
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
                              <hr color= '#D8D8D8' size = "1"/>
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

export default MyPicture;