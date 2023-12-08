import React,{createRef} from 'react';
import ImgNode from '../../../image/NodeMaster.jpg';
import ImgNodeFind from '../../../image/NodeMaster-Find.jpg';
import ImgNodeMemo from '../../../image/NodeMaster-Memo.jpg';
import ImgNodeCheck from '../../../image/NodeMaster-Check.jpg';
import HelpDeskImg from '../../../image/HelpDesk.png';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
const WindowsApp = createRef();
const MobileApp = createRef();
const MenuArray = [WindowsApp,MobileApp];
const ActiveCheck=(Menu,MenuArray)=>{
  try{
    MenuArray.map((Item,Index)=>{ if(Item.current.className === 'TabActive') Item.current.className = ''; })
      if(Menu.current.className === 'TabActive')
        Menu.current.className = '';
      else
        Menu.current.className = 'TabActive';
  }
  catch(err){
  }
}

function PRODUCT() {
  return (
        <div className='Wrapper'>
          <div className='TabControl'>
          <div className='TabPageBig'>
          <ul className="SubNavLeft">
            <li><Link to="/Product" ref={WindowsApp}  id='WindowsApp' className="TabActive" onClick={()=>ActiveCheck(WindowsApp,MenuArray)}> 윈도우앱 </Link></li>
            <li><Link to="/ProductMobile" ref={MobileApp}  id='MoblieApp' className="" onClick={()=>ActiveCheck(MobileApp,MenuArray)}> 모바일앱</Link></li>
            <li><a id='UnityApp' className="" id="FREE"> 유니티앱</a></li>
            <li><a id='WorkDoc' className="" id="FREE"> API</a></li>
          </ul>
          <div className='ProductMasterPanel'>
          <h1>노드 마스터 사용자 메뉴얼</h1>
          <hr align='left'  size='1' width='600px' color='black'/>
          <h3>데이터 정리 수집 프로그램<br/>트리뷰와 텝 형태로 많은 자료를 목차형태로 볼수있는 정리도구</h3>
          <ul>
            <li>1.텝별로 구분되는 수많은 목차형태의 메모</li>
            <li>2.모든 파일 내에서 원하는 자료를 찾을수 있는 강력한 검색기능</li>
          </ul>
          <img src={ImgNode} width='600px'></img>
          <h1>주요기능(로컬버전) - 무료 라이센스</h1>
          <hr align='left' size='1' width='600px' color='black'/>
          <h3>목차에 메모를 정리할 수 있는 메모기능</h3>
          <ul>
            <li>1.모든 메모 생성시 일자를 기록하여 쉽게 정리가능</li>
            <li>2.최종 수정일을 항상 기록</li>
          </ul>
          <img src={ImgNodeMemo} width='1024px'></img>
          <h3>복잡한 데이터를 쉽게 찾을 수 있는 검색기능</h3>
          <hr align='left'  size='1' width='600px' color='black'/>
          <ul>
            <li>1.텝이 많을시 텝별로 검색</li>
            <li>2.파일전체를 검색하는 기능 지원</li>
          </ul>
          <img src={ImgNodeFind}></img>
          <h3>진행중인 일의 진행도를 체크리스트로 손쉽게 확인</h3>
          <hr align='left'  size='1' width='600px' color='black'/>
          <ul>
            <li>1.자격증 목차정리 진행도</li>
            <li>2.체크리스트</li>
          </ul>
          <img src={ImgNodeCheck}></img>
        </div>
        </div>
      </div>
       
    </div>
  );
}

export default PRODUCT;
