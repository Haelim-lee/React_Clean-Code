import session from 'express-session';
import React, {  createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import HtmlEditer from '../../HtmlEditer';
import './style.css';

function WriteMode(props){
    const [Session,setSession] = useState({});
    const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
    
      useEffect(() => { // 폼로드와 비슷한 개념
        CreateSession();
        if(props.Data != undefined){
          setSendData({...SendData,title:props.Data.NOTICE_TITLE,contents:props.Data.NOTICE_CONTENTS});
        }
      }, []); 

    const CreateSession=()=>{
        fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
        .then(res => res.json())
        .then((msg) => {setSession(msg)})
        .catch(err=>alert(err+'오류'));
      }
      
    const Link =()=> {
        ReactDOM.render(<div/>,document.getElementById('Board_Contents'));
        document.getElementById('Board_Contents').setAttribute('class','Contents_Deactive');
        };
    const DataSubmit = (SendData) =>{
      if(props.Data === undefined)
        fetch('http://antsnest.co.kr:4000/InsertNewsBoard', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          credentials:'include',
          body: JSON.stringify(SendData)}
          ).then(props.Refrash)
          .then(Link).catch(err=>alert('DataInsert'+err));
        else
          fetch('http://antsnest.co.kr:4000/UpdateNewsBoard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"NUM":props.Data.NUM, "title":SendData.title, "contents": SendData.contents})}
            ).then(props.Refrash).then(Link).catch(err=>alert('UpdateItem'+err));
    }
   
    return(
    <div>
        <div>
        작성자 <input className='작성자_입력기' type='text' value={Session.UserId == undefined ? SendData.name: Session.Name}  onChange={(ev)=>setSendData({...SendData,name:ev.target.value})}></input> 
        <div id='EditerBox' style={{minHeight:'300px'}}>
          <HtmlEditer Submit={DataSubmit} setData={setSendData} Data={props.Data}/>
          </div>
        </div>
    </div>
  )
}


export default WriteMode;