import { ArrowLeftSharp, Clear, DirectionsBike } from '@material-ui/icons';
import React, {  createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WriteMode from './WriteMode';
import './style.css';
  
function Contents_View(props){
  const [Session, setSession] = useState({});
  const [SendData,setSendData] = useState({"noticeNum":"", "id":"", "name":"", "commentText":""});
  
    var 댓글내용 = createRef();
    var 컨텐츠 = props.Subject;
    var 코멘트 = props.CommentData;

    useEffect(() => { // 폼로드와 비슷한 개념
        CreateSession();
       
        if(props.Subject != undefined){
          setSendData({...SendData,"noticeNum":props.Subject.NUM});
        }

      }, []); 
      useEffect(() => { // 폼로드와 비슷한 개념
        
      }, [코멘트]); 
      const CreateSession=()=>{
        fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
        .then(res => res.json())
        .then((msg) => {setSession(msg)})
        .catch(err=>alert(err+'오류'));
      }
    const ItemClose=()=>{
        document.getElementById('Board_Contents').className='Contents_Deactive';
        ReactDOM.render(<div/>,document.getElementById('Board_Contents'));
        props.Refrash();
    }
    const UpdateMode = ()=>{
        ReactDOM.render(<WriteMode Refrash={props.Refrash} Data = {컨텐츠}/>,document.getElementById('Board_Contents'));
      }
    const DeleteItem=()=>{
        fetch('http://antsnest.co.kr:4000/DeleteFreeBoard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(컨텐츠)}
            ).then(ItemClose).catch(err=>alert('DataDelete'+err));
    }

    const NoticeNumChange = (Data) => {
      var noticeData = {...SendData, "noticeNum":Data.NUM}

      InsertComment(noticeData);
    }

    // 댓글 등록 후 재조회
    const InsertComment = (Data) => {
      fetch('http://antsnest.co.kr:4000/InsertFreeComment',{
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Data)}
        )
        .then(props.CommentRefrash)
        .then(댓글내용.current.value='')
        .catch(err=>alert('InsertComment'+err));
    }
    
    // 댓글 삭제 후 재조회
    const DeleteComment = (Data) => {
      fetch('http://antsnest.co.kr:4000/DeleteFreeComment',{
        method: 'POST',
        mode: 'cors',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Data)}
        ).then(props.CommentRefrash).then(댓글내용.current.value='').catch(err=>alert('InsertComment'+err));
    }
    return(
    <div>
        <div className="ContentsBox">
            {컨텐츠?<span><a> [작성자 : {컨텐츠.NOTICE_NAME}] [조회수 : {컨텐츠.SEARCH_COUNT}] </a>
            {Session.Name === 컨텐츠.NOTICE_NAME?<button onClick={UpdateMode}>수정</button>:''}
            {Session.Name === 컨텐츠.NOTICE_NAME?<button onClick={DeleteItem}>삭제</button>:''}</span>:''}
            <h1>{컨텐츠?컨텐츠.NOTICE_TITLE:''}</h1>
            {/* {텍스트 Enert기능 추가} */}
            {컨텐츠 !=undefined && typeof(컨텐츠.NOTICE_CONTENTS)==='string' ?<span dangerouslySetInnerHTML={{__html:컨텐츠.NOTICE_CONTENTS}}></span>:''}
        </div>
        
        {컨텐츠?
        <div id='Comment' className="CommentBox">
          <h1>댓글 : {코멘트.length} 개</h1>
          <div className = '댓글_목록'>
            <hr/>
            {코멘트===undefined ?'':코멘트.map((Data, i) => (
              <spen>
                <li className = '댓글_li'><b>{Data.USER_NAME}</b>
                <div className = '댓글_div'>
                  <div>
                    {Data.CONTENTS}
                    <div className = '댓글_시간_div'>{Data.CREATE_TIME}</div>
                  </div>
                  {Session.UserId === Data.USER_ID ? <button className = "댓글삭제_버튼" onClick ={()=>DeleteComment(Data)}>삭제</button>:''}   
                </div>
                </li>
                <hr color= '#D8D8D8' size = "1"/>
              </spen>
              ))}
            <b>{Session.Name}</b> {/* 댓글 작성자*/}
            <br/>
            {Session.UserId == undefined?<div>로그인을 해야 댓글 작성이 가능합니다.</div>
            :
            <div className = '댓글_div'>
            <textarea className = "댓글_textarea" ref={댓글내용} onChange={(ev) => setSendData({...SendData,"commentText":ev.target.value})}/> {/* 댓글 내용*/}
            <button className = "댓글쓰기_버튼" onClick={() => NoticeNumChange(컨텐츠)}>등록</button><br/>
            </div>
            }
          </div>
        </div>
        :''}
    </div>
  )
}

export default Contents_View;