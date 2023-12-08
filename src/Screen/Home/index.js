import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import LoginBox from '../../Common/Component/LoginBox/Login'
import LogoutBox from '../../Common/Component/LoginBox/Logout'
import { Redirect } from 'react-router'
import SearchIcon from '../../image/SearchDot.svg';
import '../style.css';


var JoinOk=false;

function HOME() {
  const [공지사항_게시글,set공지사항_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [QA_게시글,setQA_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [자유게시판_게시글,set자유게시판_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [FindData,setFindData] = useState({"num":"","name":"","write":"","contents":""});
  const [Session,setSession] = useState({});
  

  const CreateSession=()=>{
    fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
    .then(res => res.json())
    .then((msg) => {setSession(msg)})
    .catch(err=>alert(err+'오류'));
  }
  const SelectNews=()=>{
    
    fetch('http://antsnest.co.kr:4000/SelectNews')
    .then(res => res.json())
    .then(msg =>set공지사항_게시글(msg))
    
    .catch(err=>alert('오류'));
  }
  const SelectQA=()=>{
    
    fetch('http://antsnest.co.kr:4000/SelectQA')
    .then(res => res.json())
    .then(msg =>setQA_게시글(msg))
    
    .catch(err=>alert('오류'));
  }
  const SelectFree=()=>{
    fetch('http://antsnest.co.kr:4000/SelectFree')
    .then(res => res.json())
    .then(msg =>set자유게시판_게시글(msg))
    .catch(err=>alert('오류'));
  }
  
  useEffect(() => {
    SelectNews();
    SelectQA();
    SelectFree();
    CreateSession();
  }, []); 
  return (
    <div id='WrapperBox' className='Wrapper'>
        {Session.State != 'LOGIN' ?'':<Redirect to='/'/>}
        <div className='HomeMasterPanel'>
            <div style={ {display:'none'}} className='FinderBox'><h1>앤츠네스트</h1>
            <table border='0'>
              <tbody>
                <tr style={{height:'40px'}}>
                  <td style={{padding:'0'}} >
                    <input style={{lineHeight:'38px',fontSize:'24pt',padding:'0px'}} type='text' className = 'Finder' value={FindData.write} placeholder={'검색어'} onChange={(ev)=>setFindData({...FindData,write:ev.target.value})}/>
                  </td>
                  <td style={{padding:'0'}}>
                    <button style={{paddingTop:'4px' , cursor:'pointer'}}>
                    <img width='35px' height='32px' src={SearchIcon}></img>
                    </button>
                  </td>
              </tr>
              </tbody>
            </table>
            </div>
            {/* <hr size='1' width='100%' color='black'/> */}
          {Session.State != 'LOGIN' ?  <LoginBox Refrash={()=> CreateSession()}/>:<LogoutBox UserInfo={Session} Refrash={()=>CreateSession()}/>}
          <hr size='1' width='100%' color='black'/>
          <div className="컨텐츠">
              <div className='게시판_컨테이너'> 
              <Link className='HeaderLink'  to={'/NewsBoard/'+0}><h3 className='공지사항_헤더'>공지사항</h3></Link>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='22px'>작성자</th><th width='44%'>내용</th></tr>
                  </thead>
                  <tbody>
                    {공지사항_게시글.map((Data,i) => 
                    (
                    <tr key={i}><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink'  to={'/NewsBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
            </div>
            
            <div className='게시판_컨테이너'> 
              <Link className='HeaderLink'  to={'/FreeBoard/'+0}><h3 className='공지사항_헤더'>자유게시판</h3></Link>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='22px'>작성자</th><th width='44%'>내용</th></tr>
                  </thead>
                  <tbody>
                    {자유게시판_게시글.map((Data,i) => 
                    (
                    <tr key={i}><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink'  to={'/FreeBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className='게시판_컨테이너'> 
              <Link className='HeaderLink'  to={'/QaBoard/'+0}><h3 className='공지사항_헤더'>Q & A</h3></Link>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='22px'>작성자</th><th width='44%'>내용</th></tr>
                  </thead>
                  <tbody>
                    {QA_게시글.map((Data,i) => 
                    (
                    <tr key={i}><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink'  to={'/QaBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
            </div>
      </div>
    </div>

    </div>
  );
}
export default HOME;
