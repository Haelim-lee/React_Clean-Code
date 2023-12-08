import React, { createRef, useState } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from '../../../Screen/Home';
import Company from '../../../Screen/Company/BizPlan';
import Product from '../../../Screen/Product/WindowsApp';
import Community from '../../../Screen/Community';
import Help from '../../../Screen/Help';
import Portfolio from '../../../Screen/WorkRoom/Portfolio';
import Download from '../../../Screen/Download/WindowsApp';
import './style.css';

function ActiveCheck(Menu,MenuArray){
  MenuArray.map((Item,Index)=>{
    if(Item.current.className === 'active')
    Item.current.className = '';
  })
    if(Menu.current.className === 'active')
      Menu.current.className = '';
    else
      Menu.current.className = 'active';
}



function Metro() {
  //Property
  const HomeMenu = createRef();
  const CompanyMenu = createRef();
  const ProductMenu = createRef();
  const DownloadMenu = createRef();
  const CommunityMenu = createRef();
  const HelpMenu  = createRef();
  const WorkRoomMenu  = createRef();
  const MenuArray = [HomeMenu,CompanyMenu,ProductMenu,DownloadMenu,CommunityMenu,WorkRoomMenu,HelpMenu];
    let TitleStyle = {margin:'0px',marginLeft:'5px',fontSize:'30px', fontFamily:'NotoSans-Medium',textAlign:'center',lineHeight:'20px',display:'flex',fontWeight:'100'};
    let SubTitleStyle = {margin:'0px',marginLeft:'4px',  fontFamily:'NotoSans-Medium',textAlign:'left',fontWeight:'100',lineHeight:'25px' };
    return (
      <div style={{display:'flex',borderBottomStyle:'solid', width:'1024px',height:'70px'}}>
        <div id='LogoArea' style ={{display:"inline-flex",width:'200px' ,marginTop:'14px',marginBottom:'12px',marginRight:'290px',flexDirection:"column",justifyContent:'center'}}>
        <Link ref={HomeMenu} style={{textDecoration:'none',color:'black'}} to='/' id="HOME" onClick={()=>ActiveCheck(HomeMenu,MenuArray)}><label style={TitleStyle}>ANTSNEST</label>
          <h6 style={SubTitleStyle}>DEVELOPER CENTER</h6></Link>
      </div>
          <ul className="Nav">
          <li ref={CompanyMenu}><Link to='/Company' id="COMPANY" onClick={()=>ActiveCheck(CompanyMenu,MenuArray)}> 사업기획</Link></li>
          <li ref={ProductMenu}><Link to='/Product' id="PRODUCET" onClick={()=>ActiveCheck(ProductMenu,MenuArray)}> 제품설명</Link></li>
          <li ref={DownloadMenu}><Link to='/Download' id="DOWNLOAD" onClick={()=>ActiveCheck(DownloadMenu,MenuArray)} > 다운로드</Link></li>
          <li ref={CommunityMenu}><Link to='/Community' id="COMMUNITY" onClick={()=>ActiveCheck(CommunityMenu,MenuArray)} > 커뮤니티</Link></li>
          <li ref={WorkRoomMenu}><Link to='/WorkRoom' id="WORKROOM" onClick={()=>ActiveCheck(WorkRoomMenu,MenuArray)} > 작업실</Link></li>
          <li ref={HelpMenu}><Link to='/Help' id="HELP" onClick={()=>ActiveCheck(HelpMenu,MenuArray)} > 고객지원</Link></li>
        </ul>
       </div>
    );
  }


  
export default Metro;



