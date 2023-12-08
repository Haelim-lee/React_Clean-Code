import React from 'react';
import ImgApp1 from '../../../image/SkyApp.png';
import ImgApp2 from '../../../image/ketosecretLogo.png';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
function PRODUCT() {
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
            모바일앱 가이드<br/>
          </div>
          <div className='ProductMasterPanel'>
          
          <h3>앤츠네스트앱 사용자 메뉴얼</h3>
          <hr align='left'  size='1' width='600px' color='black'/>
          <img src={ImgApp1} width='150px'></img>
          <h4>준비중입니다.</h4>

          <h3>키토시크릿 사용자 메뉴얼</h3>
          <hr align='left'  size='1' width='600px' color='black'/>
          <img src={ImgApp2} width='150px'></img>
          <h4>준비중입니다.</h4>
            <br/><br/><br/><br/><br/><br/>
          <br/>
          <br/>
          </div>
          
    </div>
  );
}

export default PRODUCT;
