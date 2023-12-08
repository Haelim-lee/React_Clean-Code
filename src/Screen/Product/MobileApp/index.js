import React,{createRef} from 'react';

import ImgApp1 from '../../../image/SkyApp.png';
import ImgApp2 from '../../../image/ketosecretLogo.png';
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
            <li><Link to="/Product" ref={WindowsApp}  id='WindowsApp'  onClick={()=>ActiveCheck(WindowsApp,MenuArray)}> 윈도우앱 </Link></li>
            <li><Link to="/ProductMobile" ref={MobileApp}  id='MoblieApp' className="TabActive" onClick={()=>ActiveCheck(MobileApp,MenuArray)}> 모바일앱</Link></li>
            <li><a id='WorkDoc' className="" id="FREE"> 유니티앱</a></li>
            <li><a id='WorkDoc' className="" id="FREE"> API</a></li>
          </ul>
          <div className='ProductMasterPanel'>
          <h1>앤츠네스트앱 사용자 메뉴얼</h1>
          <hr align='left'  size='1' width='600px' color='black'/>
          <img src={ImgApp1} width='150px'></img>
          <h4>준비중입니다.</h4>

          <h1>키토시크릿 사용자 메뉴얼</h1>
          <hr align='left'  size='1' width='600px' color='black'/>
          <img src={ImgApp2} width='150px'></img>
          <h4>준비중입니다.</h4>
        </div>
        </div>
      </div>
    </div>
  );
}

export default PRODUCT;
