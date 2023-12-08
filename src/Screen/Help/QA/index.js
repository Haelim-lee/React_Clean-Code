import React, {  createRef,useState, useEffect } from 'react';
// import '../style.css';
import HelpDesk from '../../../image/HelpDesk.png';
var 현재페이지 = 0;//
var NextButtonEnable = false;
var MinRange = 0;//MinRange
var MaxRange = 0;//MaxRange

function HELP() {
  const [QA_게시글,setQA_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [QA_페이지리스트,set페이지리스트]=useState([]);
  const QnARef = createRef();
  const BugReportRef = createRef();
  const SuggestionsRef = createRef();
  const [Session, setSession] = useState({});
  const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {setSession(msg)})
    .catch(err=>alert(err+'오류'));
  }
   //관리자용 데이터삭제 기능
   const DataDelete=(Data)=>{
    fetch('http://antsnest.co.kr:4000/DeleteQAQABoard', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)}
      ).then(()=>Search(MinRange,MaxRange)).catch(err=>alert('DataDelete'+err));
  }
  const Search= async(Min,Max)=>{
    MinRange = Min;
    MaxRange = Max;
    let Data = {"MinNumber":Min,"MaxNumber":Max};
    let 게시글데이터 = await new Promise(function(resolve) {
    fetch('http://antsnest.co.kr:4000/SelectQAQABoardPage', {method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' } , body: JSON.stringify(Data)})
    .then((res)=>res.json())
    .then(Param=>resolve(Param))
    .catch(err=>alert('게시글 얻기 실패 '+err));
    });
    setQA_게시글(게시글데이터 , GetPageList());
  }
  const ClearData= () => {
    document.getElementById("contents").value= null;
  }
  //2.페이징카운트 기능
  const GetPageList= async () => {
    let 정보 = await new Promise(function(resolve) { //게시물카운트, 페이지카운트 계산값을 가저옴
    fetch('http://antsnest.co.kr:4000/handleSelectQAQABoardPageList', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({"Data":"Data"})})
    .then((res)=>res.json())
    .then(Param => resolve(Param))
    .catch(err=>alert('PageList 불러오기 메소드'+err));
    });
      let 페이지카운트 = [];
      for(let 루프카운트=0; 루프카운트 < 정보[0].TOTALPAGE+1;루프카운트++){
        if(루프카운트+1>(현재페이지*10) && 루프카운트<((현재페이지+1)*10)) 페이지카운트.push(루프카운트+1);
      }
        NextButtonEnable = 페이지카운트[페이지카운트.length-1] == 정보.TOTALPAGE+1 ?  true : false;//다음버튼을 만들어야하는지 여부
        set페이지리스트(페이지카운트);
  }

  const SelectQA=()=>{
    fetch('http://antsnest.co.kr:4000/SelectQAQA_ORG')
    .then(res => res.json())
    .then(msg =>setQA_게시글(msg))
    .catch(err=>alert('오류'));
  }

  const DataInsert = () => {
    fetch('http://antsnest.co.kr:4000/InsertQAQABoard', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify(SendData)}
      ).then(ClearData)
      .then(SelectQA)
      .catch(err=>alert('DataInsert'+err));
  }

  useEffect(() => {
    CreateSession();
    SelectQA();
  }, []); 
  return (
    <div className='Wrapper'>
        <div className='TabControl'>
          <p align='center'>
          <div className='TabPage'>
          <table className='QA_게시판'>
            <thead>
            <tr><th style={{borderLeftStyle:'none'}} width='30px'>No</th><th width='70px'>작성자</th><th style={Session.UserId =='dexterity'? {borderRightStyle:'solid'}:{borderRightStyle:'none'}} width='70%'>내용</th> {Session.UserId =='dexterity'?<th width='30px'>삭제</th>:''}</tr>
            </thead>
            <tbody>
              {QA_게시글.map((Data,i) => 
              {return(
              <tr><td width='30px'><div align='center'>{i+1}</div></td><td width='10%'><div align='center'>{Data.NOTICE_NAME}</div></td><td width='45%'>{Data.NOTICE_TITLE}</td>
              {Session.UserId == 'dexterity'?<td width='45px'><button onClick={()=>DataDelete(Data)}>삭제</button></td>:''}
              </tr>
              );} )}
            </tbody>
          </table>
          { Session.UserId == undefined?<p><div>로그인을 해야 작성이 가능합니다.</div></p>
          :
            <div className = '글쓰기_컨트롤'>
              작성자 <input className='작성자_입력기' type='text' value={Session.UserId == undefined ? SendData.name: Session.Name}  onChange={(ev)=>setSendData({...SendData,name:ev.target.value})}></input>&nbsp;  
              내용 <input id ='contents' className='내용_입력기' type='text' onChange={(ev)=> setSendData({...SendData, title:ev.target.value, contents:ev.target.value})}/> &nbsp; 
              <button onClick={DataInsert}>글쓰기</button>
            </div>
          }
        </div>
        </p>
      </div>
    </div>
  );
}


export default HELP;