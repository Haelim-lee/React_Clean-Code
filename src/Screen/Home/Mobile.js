import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MyLogo from '../../image/MyLogo.png';
import Board from '../../Common/Component/Board/Mobile';
import FreeBoard from '../../Common/Component/Board/FreeBoard/Mobile';
import NewsBoard from '../../Common/Component/Board/NewsBoard/Mobile';
import QaBoard from '../../Common/Component/Board/QaBoard/Mobile';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Notice from '../Community/mobile';
import '../style.css';

function HOME() {
  const [공지사항_게시글,set공지사항_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [QA_게시글,setQA_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
  const [자유게시판_게시글,set자유게시판_게시글] = useState([{"컬럼1":"","컬럼2":""}]);
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
  let TabPageStyle = {
    display:'flex',
    flexWrap:"wrap",
                };
  let SubNavStyle = {
    display:'flex',
    margin:'0px',
    justifyContent:'space-evenly',
    width:'100%',
    padding:'0',
    flexWrap:"wrap",
    borderBottomStyle:'solid',
    borderBottomWidth:'1px'
  };
  let ListStyle = {
    display:'flex',
    listStyleType:'none',
    margin:'15px',
  };
  return (
    <div id='WrapperBox' className='Wrapper'>
          <div id='MobilelTabPage' style={TabPageStyle}>
          <ul id='MobileTabNavigater' style = { SubNavStyle} >
              <li style={ListStyle}><Link to="/" className="active"> 홈</Link></li>
              <li style={ListStyle}><Link to="/TimeLine" className=""> 타임라인</Link></li>
              <li style={ListStyle}><Link to="/Photo" className="active"> 피드</Link></li>
            </ul>
        </div>
        <div className='HomeMasterPanel'>
          <h1>앤츠네스트</h1>
      <img src={MyLogo}></img>
        <p align="center">
          <div className="컨텐츠">
              <div className='게시판_컨테이너'> 
                <h1 className='공지사항_헤더'>공지사항</h1>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='70px'>작성자</th><th width='70%'>내용</th></tr>
                  </thead>
                  <tbody>
                    {공지사항_게시글.map((Data,i) => 
                    (
                    <tr><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink' to={'/NewsBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
              
            </div>
            
            <div className='게시판_컨테이너'> 
                <h1 className='공지사항_헤더'>자유게시판</h1>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='70px'>작성자</th><th width='70%'>내용</th></tr>
                  </thead>
                  <tbody>   
                    {자유게시판_게시글.map((Data,i) => 
                    (
                    <tr><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink' to={'/FreeBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className='게시판_컨테이너'> 
                <h1 className='공지사항_헤더'>Q & A</h1>
                <table className='공지사항_게시판'>
                  <thead>
                  <tr><th width='2%'>No</th><th width='70px'>작성자</th><th width='70%'>내용</th></tr>
                  </thead>
                  <tbody>
                    {QA_게시글.map((Data,i) => 
                    (
                    <tr><td width='2%'><div align='center'>{i+1}</div></td><td><div align='center'>{Data.NOTICE_NAME}</div></td><td><Link className='NewsLink' to={'/QaBoard/'+Data.NUM}>{Data.NOTICE_TITLE}</Link></td></tr>
                    ))}
                  </tbody>
                </table>
            </div>
      </div>
      </p>
    </div>

    </div>
  );
}

export default HOME;
