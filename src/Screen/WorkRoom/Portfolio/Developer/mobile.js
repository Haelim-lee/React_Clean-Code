import React, { createRef, useState,useEffect } from 'react';


function Developer() {

  const PhotoSubmit = createRef();
  const [SendData,setSendData] = useState({"num":"","name":"","write":"","contents":""});
  const [Feed,setFeed] = useState([]);
  const [Session,setSession] = useState({State:''});

  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {
      if(msg.State ==='LOGIN')  GetDevPhoto_ORG();
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
      GetDevPhoto_ORG();
    }
    const GetDevPhoto_ORG=()=>{
      fetch('http://antsnest.co.kr:4000/GetDevPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
      //    .then(msg=>alert(JSON.stringify(msg)))
      .catch(err=>alert(err+'오류'));
    }
    const uploadImage =()=> {
      PhotoSubmit.current.disabled='disabled';
      var form = document.getElementById("myForm");
      var formData = new FormData(form);
      fetch('http://antsnest.co.kr:4000/DeveloperFileUpload', {
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
          {Feed.length === 0 ? '':Feed.map((Data,i) => (
                <img width="140" height="140"  src={Data.pix_loadPath!=undefined?'http://antsnest.co.kr:4000/ftp/DeveloperFile/'+Data.pix_loadPath:'http://antsnest.co.kr:4000/ftp/FileUpload/'+'NoImage.png'}/>
            ))}
            </div>
      </div>
      );
    }
  
  
    
  export default Developer;
