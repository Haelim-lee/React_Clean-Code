import React, { createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Contents_View from './Contents_View';
import WriteMode from './WriteMode';
import TabContorl from '../Tab';

//전역 프로퍼티
var 현재페이지 = 0;//
var 선택된페이지 = 1;//
var NextButtonEnable = false;
var MinRange = 0;//MinRange
var MaxRange = 0;//MaxRange
let SelectedCategory = "ALL";

function InfraBoard(props) {
//게시판속성
const Contents_Div  = createRef();
const [게시글,set게시글] = useState([{"컬럼1":"","컬럼2":"","컬럼3":""}]);
const [페이지리스트,set페이지리스트]=useState([]);
const [현재컨텐츠,set현재컨텐츠] = useState({});

let 공개여부 = true;
const [세션,set세션] = useState({});

const CreateSession= async()=>{
  let SessionData = await new Promise(function(resolve) {
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then(Param=> resolve(Param))
    .catch(err=>alert(err+'오류'))
    });
    set세션(SessionData);
 }
    //1.조회
    const Search= async(Min,Max)=>{
      MinRange = Min;
      MaxRange = Max;
      let Data = {"MinNumber":Min,"MaxNumber":Max,IsPublic:공개여부,Category:SelectedCategory};
      let 게시글데이터 = await new Promise(function(resolve) {
      fetch('http://antsnest.co.kr:4000/SelectInfraBoardPage', {method: 'POST', mode: 'cors',   credentials:'include',headers: { 'Content-Type': 'application/json' } , body: JSON.stringify(Data)})
      .then((res)=>res.json())
      .then(Param=>resolve(Param))
      .catch(err=>alert('게시글 얻기 실패 '+err));
      });
      set게시글(게시글데이터 , GetPageList());
    }
//2.페이징카운트 기능
const GetPageList= async () => {
  let Data = {IsPublic:공개여부,Category:SelectedCategory};
  let 정보 = await new Promise(function(resolve) { //게시물카운트, 페이지카운트 계산값을 가저옴
  fetch('http://antsnest.co.kr:4000/SelectInfraBoardPageList', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Data)})
  .then((res)=>res.json())
  .then(Param => resolve(Param))
  .catch(err=>alert('PageList 불러오기 메소드'+err));
  });
    let 페이지카운트 = [];
    for(let 루프카운트=0; 루프카운트 < 정보[0].TOTALPAGE+1;루프카운트++){
      if(루프카운트+1>(현재페이지*10) && 루프카운트<((현재페이지+1)*10)) 페이지카운트.push(루프카운트+1);
    }
      NextButtonEnable = (페이지카운트[페이지카운트.length-1] == 정보[0].TOTALPAGE+1 && (정보[0].ITEMCOUNT > (현재페이지+1)*10)*10)?  true : false;//다음버튼을 만들어야하는지 여부
      set페이지리스트(페이지카운트);
}
 //관리자용 데이터삭제 기능
  const DataDelete=(Data)=>{
    fetch('http://antsnest.co.kr:4000/DeleteInfraBoard', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)}
      ).then(()=>Search(MinRange,MaxRange)).catch(err=>alert('DataDelete'+err));
  }
//컨텐츠 읽기
  const ReadContents = (Data)=>{
    fetch('http://antsnest.co.kr:4000/ReadInfraBoard', {
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
    fetch('http://antsnest.co.kr:4000/InfraSearchCountPlus', {
      method: 'POST',           
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)})
      .catch(err=>alert('InfraSearchCountPlus'+ err));
  }

 // 댓글 가져오기
 const ReadComments = (Data) => {
  fetch('http://antsnest.co.kr:4000/ReadInfraComments', {
    method:'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)})
    .then(res=>res.json())
    .then(msg=>RefrashContents({...Data,"CommentData":msg}))
    .catch(err=>alert(err + '오류'));
}

  
const RefrashContents=(컨텐츠)=>{
  if(Contents_Div.current!=null){
      Contents_Div.current.className = (Contents_Div.current.className =='Contents_Active' && 현재컨텐츠.NUM == 컨텐츠.NUM) ?  'Contents_Deactive':'Contents_Active'; //동일한것을 클릭하는 경우를 제외하고 컨텐츠 열기
      if(Contents_Div.current.className =='Contents_Deactive')//닫는경우
        ReactDOM.render(<Contents_View Refrash={()=>Search(MinRange,MaxRange)}/>,document.getElementById('Board_Contents'));
      else if(Contents_Div.current.className =='Contents_Active')//열려있는창닫고 빈값으로 랜더링 다시하기
        ReactDOM.render(<Contents_View Subject={컨텐츠} CommentData={컨텐츠.CommentData} CommentRefrash = {() => ReadContents(컨텐츠)} Refrash={()=>Search(MinRange,MaxRange)}/> , document.getElementById('Board_Contents'))
      set현재컨텐츠(컨텐츠);
  }
  else {
      document.getElementById('Board_Contents').setAttribute('class','Contents_Active');
      ReactDOM.render(<Contents_View Subject={컨텐츠} CommentData={컨텐츠.CommentData} CommentRefrash = {() => ReadContents(컨텐츠)} Refrash={()=>Search(MinRange,MaxRange)}/> ,document.getElementById('Board_Contents'))
  }
}
const ActionWriteMode=()=>{
  set현재컨텐츠({});
  Contents_Div.current.className = Contents_Div.current.className =='Contents_Deactive' ? 'Contents_Active': Contents_Div.current.className;
      ReactDOM.render(<WriteMode Refrash={()=>Search(MinRange,MaxRange)}/>,document.getElementById('Board_Contents'));
}

  // 화면로드
  useEffect(() => {
    SelectedCategory = "ALL";
    props.CategorySelect((Value)=>{
      SelectedCategory=Value;
      Search('0','10');
    });
    CreateSession();
    Search('0','10');
    props.args((Value)=>{
      공개여부=Value;
      Search('0','10');
    }
    );
    if(props.Data != undefined) ReadContents(props.Data);
  }, []);  
  
  return (
    <div>
        <div ref={Contents_Div} id ='Board_Contents' className='Contents_Deactive'/>
      <table className='QA_게시판'>
        <thead>
        <tr><th style={{borderLeftStyle:'none'}} width='30px'>No</th><th width='70px'>작성자</th><th width='70px'>카테고리</th><th width='65%'>내용</th> <th style={세션.UserId =='dexterity'? {borderRightStyle:'solid'}:{borderRightStyle:'none'}} width='70px'>조회수</th> {세션.UserId =='dexterity'?<th width='70px'>삭제</th>:''}</tr>
        </thead>
        <tbody>
            {게시글.map((Data,i) => (
            <tr key={i}>
              <td><div align='center'>{Data.NUM}</div></td>
              <td><div align='center'>{Data.NOTICE_NAME}</div></td>
              <td><div align='center'>{Data.NOTICE_CATEGORY}</div></td>
              <td><a onClick={()=>ReadContents(Data)}>{Data.NOTICE_TITLE}</a></td>
              <td> <div align='center'>{Data.SEARCH_COUNT}</div></td>
              {세션.UserId == 'dexterity'?<td width='45px'><button onClick={()=>DataDelete(Data)}>삭제</button></td>:''}
            </tr>
            ))}
          </tbody>
      </table> 
      {페이지리스트.map((Data,index)=>(<span key={index} >
        {(index == 0) && (Data > 1)? <a onClick={()=>{ 현재페이지-=1; GetPageList();}}> [이전]</a>:''}
        <a onClick={()=>{ Search((Data)*10-9,(Data)*10); 선택된페이지 = Data;}}><label style={선택된페이지===Data?{color:'red'}:{color:'black'}}>[{Data}]</label></a> 
        {(index==9) && (NextButtonEnable==false)?<a onClick={()=>{ 현재페이지+=1; GetPageList();}}
             >[다음]</a>:''}</span>))}
      <button disabled={세션.UserId===undefined? true:false}  className='WriteButton' onClick={()=>ActionWriteMode()}>신규 글쓰기</button>
    </div>
  );
}

export default InfraBoard;