import React, { createRef,useState, useEffect } from 'react';
import Contents_View from './Contents_View';
import WriteMode from './WriteMode';
import ReactDOM from 'react-dom';
import './style.css';

//전역 프로퍼티
var MyPage = 0;
var CurrentMinItem = 0;
var CurrentMaxItem = 0;
var NextButtonEnable = false;

function DeveloperNoteBoard(props) {
  const Contents_Div  = createRef();
  const [게시글,set게시글] = useState([{"컬럼1":"","컬럼2":"","컬럼3":""}]);
  const [리스트,set리스트]= useState({"PageCount":0,"Page":0});
  const [페이지리스트,set페이지리스트]=useState([]);
  const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
  const [현재컨텐츠,set현재컨텐츠] = useState({});
  const [Session,setSession] = useState({});
  
  useEffect(() => { // 폼로드와 비슷한 개념
  }, [게시글]); 

  const getSession=async(msg)=>{
    let MySession=msg;
    await setSession(MySession);
  }
  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg)=>{getSession(msg)})
    .catch(err=>alert(err+'오류'))
  }

 // 액션
  const SelectDeveloperNote=()=>{
    if(props.LinkAction === true)
    props.Selecter('DeveloperNote');

    fetch('http://antsnest.co.kr:4000/SelectDeveloperNote_ORG')
    .then(res => res.json())
    .then(msg =>set게시글(msg))
    .then(setSendData({"num":"", "id":"", "name":"", "title":""}))
    .catch(err=>alert('SelectDeveloperNote'+err));
  }
  const DataDelete=(Data)=>{
    fetch('http://antsnest.co.kr:4000/DeleteDeveloperNoteBoard', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)}
      ).then(()=>SelectDeveloperNote()).catch(err=>alert('DataDelete'+err));
  }

  const DataUpdate = (SendData,Data)=>{
    var Send = {"NUM":Data.NUM, "NOTICE_TITLE":SendData.title, "NOTICE_CONTENTS": SendData.contents}
    fetch('http://antsnest.co.kr:4000/UpdateDeveloperNoteBoard', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Send)}
      ).then(()=>SelectDeveloperNote()).catch(err=>alert('DataUpdate'+err));
  }

const ReadContents = (Data)=>{
  fetch('http://antsnest.co.kr:4000/ReadDeveloperNoteBoard', {
    method: 'POST',           
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)}
    ).then((res)=>res.json())
    .then((msg)=>ReadComments(msg[0]))
    .then(SearchCountPlus(Data))
    .catch(err=>alert('Read'+ err));
}

// 조회수 증가
const SearchCountPlus = (Data)=>{
  fetch('http://antsnest.co.kr:4000/DeveloperNoteSearchCountPlus', {
    method: 'POST',           
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)})
    .catch(err=>alert('DeveloperNoteSearchCountPlus'+ err));
}


// 댓글 가져오기
const ReadComments = (Data) => {
  fetch('http://antsnest.co.kr:4000/ReadDeveloperNoteComments', {
    method:'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)})
    .then((res)=>res.json())
    .then((msg)=>RefrashContents({...Data,"CommentData":msg}))
    .catch(err=>alert(err + '오류'));
}

const RefrashContents=(컨텐츠)=>{
  if(Contents_Div.current != null)
  {
    if(Contents_Div.current.className =='Contents_Active'){
      if(현재컨텐츠.NUM == 컨텐츠.NUM){
        Contents_Div.current.className ='Contents_Deactive';
        ReactDOM.render(<Contents_View Refrash={()=>SelectDeveloperNote()}/>,document.getElementById('Board_Contents'));
      }
      else{
        ReactDOM.render(<Contents_View Subject = {컨텐츠}
                                       CommentData = {컨텐츠.CommentData}
                                       CommentRefrash = {() => ReadContents(컨텐츠)}
                                       Refrash={()=>SelectDeveloperNote()} />
                       , document.getElementById('Board_Contents'));
      }
    }
    else if(Contents_Div.current.className =='Contents_Deactive'){
        
      Contents_Div.current.className ='Contents_Active';
      ReactDOM.render(<Contents_View Subject = {컨텐츠}
                                      CommentData = {컨텐츠.CommentData}
                                      CommentRefrash = {() => ReadContents(컨텐츠)}
                                      Refrash={()=>SelectDeveloperNote()}/>
                      , document.getElementById('Board_Contents'))
    }
    set현재컨텐츠(컨텐츠);
  }
  else
  {
    document.getElementById('Board_Contents').setAttribute('class','Contents_Active');
    ReactDOM.render(<Contents_View Subject={컨텐츠} 
                                   CommentData = {컨텐츠.CommentData} 
                                   CommentRefrash = {() => ReadContents(컨텐츠)} 
                                   Refrash={()=>SelectDeveloperNote()}/>
                   , document.getElementById('Board_Contents'))
  }
}

const ActionWriteMode=()=>{

  set현재컨텐츠({});

  if(Contents_Div.current.className =='Contents_Deactive'){
      Contents_Div.current.className ='Contents_Active';
      ReactDOM.render(<WriteMode Refrash={()=>SelectDeveloperNote()}/>,document.getElementById('Board_Contents'))
  }
  else{
      ReactDOM.render(<WriteMode Refrash={()=>SelectDeveloperNote()}/>,document.getElementById('Board_Contents'))
  }
}
  useEffect(() => {
    SelectDeveloperNote();

    if(props.Data != undefined) {
      ReadContents(props.Data);
    }
  }, []); 
  return (
    <div className='MobileBoard'>
      <button className='WriteButton' onClick={()=>ActionWriteMode()}>신규 글쓰기</button>
      <div ref={Contents_Div} id ='Board_Contents' className='Contents_Deactive'/>
      {게시글.map((Data,i) => 
      (
        <div className='MobileBoardItem'  onClick={()=>ReadContents(Data)}>
          <div id='Subject'> <ul><li></li></ul> {Data.NOTICE_TITLE}</div>
          <div id='Writer'> [작성자 : {Data.NOTICE_NAME}] [조회수: {Data.SEARCH_COUNT}] </div>
          {Session.UserId == 'dexterity'?<td width='45px'><button onClick={()=>DataDelete(Data)}>삭제</button></td>:''}
        </div>
      ))}
    </div>
  );
}

export default DeveloperNoteBoard;