import React from 'react';
import ImgNode from '../../../image/NodeMaster.jpg';
import ImgNodeFind from '../../../image/NodeMaster-Find.jpg';
import ImgNodeMemo from '../../../image/NodeMaster-Memo.jpg';
import ImgNodeCheck from '../../../image/NodeMaster-Check.jpg';
import HelpDeskImg from '../../../image/HelpDesk.png';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
function WindowsApp() {
   
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
  let BizMemberTitle={
    padding: "2px",
    textAlign: "center",
    backgroundColor: "#474e5d",
    color: "white"
  
  };
  return (
        <div className='Wrapper'>
            <div id='MobilelTabPage' style={TabPageStyle}>
              <ul id='MobileTabNavigater' style = { SubNavStyle} >
                <li style={ListStyle}><Link to="/WindowsProduct" className="active"> 윈도우앱</Link></li>
                <li style={ListStyle}><Link to="/MobileProduct" className=""> 모바일앱</Link></li>
                <li style={ListStyle}><Link to="/UnityProduct" className=""> 유니버셜앱</Link></li>
                </ul>
            </div>
            <div style={BizMemberTitle} >
            윈도우앱 가이드<br/>
          </div>
          <div className='ProductMasterPanel'>
            <h3>노드 마스터 사용자 메뉴얼</h3>
            <hr align='left'  size='1' width='300px' color='black'/>
            <h5>데이터 정리 수집 프로그램<br/>트리뷰와 텝 형태로 많은 자료를 목차형태로 볼수있는 정리도구</h5>
            <ul>
              <li>1.텝별로 구분되는 수많은 목차형태의 메모</li>
              <li>2.모든 파일 내에서 원하는 자료를 찾을수 있는 강력한 검색기능</li>
            </ul>
            <img src={ImgNode} width='300px'></img>
            <h3>주요기능(로컬버전) - 무료 라이센스</h3>
            <hr align='left' size='1' width='300px' color='black'/>
            <h5>목차에 메모를 정리할 수 있는 메모기능</h5>
            <ul>
              <li>1.모든 메모 생성시 일자를 기록하여 쉽게 정리가능</li>
              <li>2.최종 수정일을 항상 기록</li>
            </ul>
            <img src={ImgNodeMemo} width='300px'></img>
            <h5>복잡한 데이터를 쉽게 찾을 수 있는 검색기능</h5>
            <hr align='left'  size='1' width='300px' color='black'/>
            <ul>
              <li>1.텝이 많을시 텝별로 검색</li>
              <li>2.파일전체를 검색하는 기능 지원</li>
            </ul>
            <img src={ImgNodeFind} width='300px'></img>
            <h5>진행중인 일의 진행도를 체크리스트로 손쉽게 확인</h5>
            <hr align='left'  size='1' width='300px' color='black'/>
            <ul>
              <li>1.자격증 목차정리 진행도</li>
              <li>2.체크리스트</li>
            </ul>
            <img src={ImgNodeCheck} width='300px'></img>
            <br/><br/><br/><br/><br/><br/>
          <br/>
          <br/>
          </div>
          
    </div>
  );
}

export default WindowsApp;
