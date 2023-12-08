import React, { createRef, useState,useEffect } from 'react';
import DefaultImg from '../../../../ftp/NoImage.png';


function Designer(props) {
  useEffect(() => {
 }, []); 
  const PhotoSubmit = createRef();
  const [SendData,setSendData] = useState({"num":"","name":"","write":"","contents":""});
  const [DefaultImage,setDefaultImage] = DefaultImg;
  const [Feed,setFeed] = useState([]);
  const [Session,setSession] = useState({});
  let SessionValue = {};
  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {
      if(msg.State ==='LOGIN') GetFeedPhoto_ORG();
      setSession(msg)})
    .catch(err=>alert(err+'오류'));
  }
   
  const uploadImgPreview=()=>{
    let fileinfo= document.getElementById("img").files[0];
    let reader = new FileReader();
    reader.onload = function(){
      document.getElementById("thumbnailImg").src=reader.result;
      document.getElementById("thumbnailImg").width='300';
      document.getElementById("thumbnailImg").height='300';
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
      fetch('http://antsnest.co.kr:4000/GetDgnPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
      //    .then(msg=>alert(JSON.stringify(msg)))
      .catch(err=>alert(err+'오류'));
    }
    const uploadImage =()=> {
      PhotoSubmit.current.disabled='disabled';
      var form = document.getElementById("myForm");
      var formData = new FormData(form);
      fetch('http://antsnest.co.kr:4000/DesignerFileUpload', {
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        body: formData
      }).then((res)=>res.json()).then((msg)=> {clearData();})
      .catch(err=>alert(err));
      }
      useEffect(() => {
        CreateSession();
        
      }, []); 
      return (
        <div>
          <div style={{minHeight:'600px'}} className='PortfolioMasterPanel'>
          {Session.State != 'LOGIN' ?<h1 style={{alignSelf:'center'}}>로그인이 필요합니다.</h1>:
           <div style={{width:'100%',display:'flex', flexDirection:'row'}} className='WriteModeBox'>
                  <div style={{display:'flex', width:'100%'}}>
                    <span style={{width:'300px',height:'290px',borderStyle:'solid' ,borderWidth:'1px'}}>
                      <img width="300px" height="290px" id="thumbnailImg" src={'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/>
                    <div id="thumbnailSrc" src=""/></span>
                  <div style={{display:'flex',  flexDirection:'column',width:'70%' ,paddingLeft:'10px'}}>
                    <form id='myForm' method="POST" encType="multipart/form-data" >
                      <div class='작성자정보'>
                          <textarea style={{width:'100%',height:'203px'}} id='TextInput' name="TextInput" value={SendData.contents}  onChange={(ev)=>setSendData({...SendData,contents:ev.target.value})}></textarea>
                      </div>
                        <hr/>
                        <input id='img' type="file" name="img" onChange={()=>uploadImgPreview()}/>
                        <hr/>
                    </form>
                        <button ref={PhotoSubmit}   onClick={()=>uploadImage()}>게시</button>
                  </div>
          </div>
          </div>}
          {Feed.length === 0 ? '' :Feed.map((Data,i) => (
                <img width="180" height="180"  src={Data.pix_loadPath!=undefined?'http://antsnest.co.kr:4000/ftp/DesignerFile/'+Data.pix_loadPath:'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/>
            ))}
            </div>
      </div>
      );
    }
  
  
    
  export default Designer;
