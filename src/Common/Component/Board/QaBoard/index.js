import React, { createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Contents_View from './Contents_View';
import WriteMode from './WriteMode';
import './style.css';

//전역 프로퍼티
var MyPage = 0;
var CurrentMinItem = 0;
var CurrentMaxItem = 0;
var NextButtonEnable = false;
//컴포넌트
function QaBoard(props) {

  const Contents_Div  = createRef();
  const [게시글,set게시글] = useState([{"컬럼1":"","컬럼2":"","컬럼3":""}]);
  const [리스트,set리스트]= useState({"PageCount":0,"Page":0});
  const [페이지리스트,set페이지리스트]=useState([]);
  const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
  const [현재컨텐츠,set현재컨텐츠] = useState({});
  const [Session,setSession] = useState({});

  
  useEffect(() => { // 폼로드와 비슷한 개념
    GetPageList();
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

  //액션
  const SelectQaBoardPage=(Min,Max)=>{
  CurrentMinItem = Min;
  CurrentMaxItem = Max;
  var Data = {"MinNumber":Min,"MaxNumber":Max};

  if(props.LinkAction === true)
    props.Selecter('Qa');

  fetch('http://antsnest.co.kr:4000/SelectQaBoardPage', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)}
    ).then((res)=>res.json())
    .then(msg =>set게시글(msg))
    .catch(err=>alert('Page '+err));
}

const GetPageList= async () => {
  let 정보 = await new Promise(function(resolve) { //게시물카운트, 페이지카운트 계산값을 가저옴
  fetch('http://antsnest.co.kr:4000/SelectQaBoardPageList', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({"Data":"Data"})})
  .then((res)=>res.json())
  .then(Param => resolve(Param))
  .catch(err=>alert('PageList 불러오기 메소드'+err));
  });
    let 페이지카운트 = [];
    for(let 루프카운트=0; 루프카운트 < 정보[0].TOTALPAGE+1;루프카운트++){
      if(루프카운트+1>(MyPage*10) && 루프카운트<((MyPage+1)*10)) 페이지카운트.push(루프카운트+1);
    }
      NextButtonEnable = (페이지카운트[페이지카운트.length-1] == 정보[0].TOTALPAGE+1 && (정보[0].ITEMCOUNT > (MyPage+1)*10)*10)?  true : false;//다음버튼을 만들어야하는지 여부
      set페이지리스트(페이지카운트);
}

const DataDelete=(Data)=>{
  fetch('http://antsnest.co.kr:4000/DeleteQaBoard', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)}
    ).then(()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)).catch(err=>alert('DataDelete'+err));
}

const DataUpdate = (SendData,Data)=>{
  var Send = {"NUM":Data.NUM, "NOTICE_TITLE":SendData.title, "NOTICE_CONTENTS": SendData.contents}
  fetch('http://antsnest.co.kr:4000/UpdateQaBoard', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Send)}
    ).then(()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)).catch(err=>alert('DataUpdate'+err));
}

const ReadContents = (Data)=>{
  fetch('http://antsnest.co.kr:4000/ReadQaBoard', {
    method: 'POST',           
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)}
    ).then((res)=>res.json())
    .then((msg)=>ReadComments(msg[0],Contents_Div))
    .then(SearchCountPlus(Data))
    .catch(err=>alert('Read'+ err));
}

// 조회수 증가
const SearchCountPlus = (Data)=>{
  fetch('http://antsnest.co.kr:4000/QaSearchCountPlus', {
    method: 'POST',           
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)})
    .catch(err=>alert('QaSearchCountPlus'+ err));
}

// 댓글 가져오기
const ReadComments = (Data) => {
  fetch('http://antsnest.co.kr:4000/ReadQAComments', {
    method:'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data)})
    .then((res)=>res.json())
    .then((msg)=>RefrashContents({...Data,"CommentData":msg}))
    .catch(err=>alert(err + '오류'));
}

const RefrashContents=(컨텐츠)=>{
  if(Contents_Div.current!=null)
  {
    if(Contents_Div.current.className =='Contents_Active'){
      if(현재컨텐츠.NUM == 컨텐츠.NUM){
        Contents_Div.current.className ='Contents_Deactive';
        ReactDOM.render(<Contents_View Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>,document.getElementById('Board_Contents'));
      }
      else {
        ReactDOM.render(<Contents_View Subject={컨텐츠}
                                       CommentData={컨텐츠.CommentData} 
                                       CommentRefrash = {() => ReadContents(컨텐츠)} 
                                       Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>
                       , document.getElementById('Board_Contents'));
      }
    }
    else if(Contents_Div.current.className =='Contents_Deactive'){

      Contents_Div.current.className ='Contents_Active';
      ReactDOM.render(<Contents_View Subject={컨텐츠} 
                                       CommentData={컨텐츠.CommentData} 
                                       CommentRefrash = {() => ReadContents(컨텐츠)} 
                                       Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>
                        ,document.getElementById('Board_Contents'))
    }
    set현재컨텐츠(컨텐츠);
  } else{
      document.getElementById('Board_Contents').setAttribute('class','Contents_Active');
      ReactDOM.render(<Contents_View Subject={컨텐츠}  
                                     CommentData={컨텐츠.CommentData} 
                                     CommentRefrash = {() => ReadContents(컨텐츠)} 
                                     Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>
                      ,document.getElementById('Board_Contents'))
  }
}

const ActionWriteMode=()=>{

  set현재컨텐츠({});
  
  if(Contents_Div.current.className =='Contents_Deactive'){
      Contents_Div.current.className ='Contents_Active';
      ReactDOM.render(<WriteMode Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>,document.getElementById('Board_Contents'))
  }
  else{
      ReactDOM.render(<WriteMode Refrash={()=>SelectQaBoardPage(CurrentMinItem,CurrentMaxItem)}/>,document.getElementById('Board_Contents'))
  }
}

const nextPage=()=>{
  set리스트({...리스트,Page:MyPage+1},GetPageList());
}

const prevPage=()=>{
  set리스트({...리스트,Page:MyPage-1},GetPageList());
}

//화면로드
    useEffect(() => {
    SelectQaBoardPage('0','10');
    CreateSession();
    if(props.Data != undefined) {
      ReadContents(props.Data);
    }
  }, []); 

  {MyPage=리스트.Page}
  
  return (
    <div>
      <div ref={Contents_Div} id ='Board_Contents' className='Contents_Deactive'/>
      <table className='QA_게시판'>
        <thead>
        <tr><th width='5%'>No</th><th width='70px'>작성자</th><th width='65%'>내용</th> <th width='70px'>조회수</th> {Session.UserId =='dexterity'?<th width='70px'>삭제</th>:''}</tr>
          </thead>
        <tbody>
          {게시글.map((Data,i) => (
            <tr>
              <td><div align='center'>{Data.NUM}</div></td>
              <td><div align='center'>{Data.NOTICE_NAME}</div></td>
              <td><a onClick={()=>ReadContents(Data)}>{Data.NOTICE_TITLE}</a></td>
              <td> <div align='center'>{Data.SEARCH_COUNT}</div></td>
              {Session.UserId == 'dexterity'?<td width='45px'><button onClick={()=>DataDelete(Data)}>삭제</button></td>:''}
            </tr>
          ))}
        </tbody>
      </table> 
      {페이지리스트.map((Data,index)=>(<span>
        {(index == 0) && (Data > 1)? <a onClick={()=>prevPage()}> [이전]</a>:''}
          <a onClick={()=>SelectQaBoardPage((Data)*10-9,(Data)*10)}>[{Data}]</a> 
        {(index==9) && (NextButtonEnable==false)?<a onClick={()=>nextPage()}>[다음]</a>:''}</span>))}
      <button className='WriteButton' onClick={()=>ActionWriteMode()}>신규 글쓰기</button>
    </div>
  );
}

export default QaBoard;