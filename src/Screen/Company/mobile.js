import React from 'react';
import Img1 from '../../image/MobileCompanyIntro1.png';
import Img2 from '../../image/MobileCompanyIntro2.png';
import Img3 from '../../image/MobileCompanyIntro3.png';
import Img4 from '../../image/MobileCompanyIntro4.png';
import Img5 from '../../image/MobileCompanyIntro5.png';
import Img6 from '../../image/MobileCompanyIntro6.png';
import Img7 from '../../image/MobileCompanyIntro7.png';
import Img8 from '../../image/MobileCompanyIntro8.png';
import Img9 from '../../image/MobileCompanyIntro9.png';
import Img10 from '../../image/MobileCompanyIntro10.png';
import Img11 from '../../image/MobileCompanyIntro11.png';
import Img12 from '../../image/MobileCompanyIntro12.png';
import '../style.css';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';

function COMPANY() {
 
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
  
  }

  return (
    <div className='Wrapper'>
        <div id='MobilelTabPage' style={TabPageStyle}>
          <ul id='MobileTabNavigater' style = { SubNavStyle} >
              <li style={ListStyle}><Link to="/Company" className="active"> 사업계획</Link></li>
              <li style={ListStyle}><Link to="/BizSkill" className=""> 기술이력</Link></li>
              <li style={ListStyle}><Link to="/BizMember" className=""> 구성원</Link></li>
            </ul>
          <div className='CompanyMasterPanel'>
          <div style={BizMemberTitle} >
            기획서<br/>
          </div>
            <img width='100%' src={Img1}></img>
            <img width='100%' src={Img2}></img>
            <img width='100%' src={Img3}></img>
            <img width='100%' src={Img4}></img>
            <img width='100%' src={Img5}></img>
            <img width='100%' src={Img6}></img>
            <img width='100%' src={Img7}></img>
            <img width='100%' src={Img8}></img>
            <img width='100%' src={Img9}></img>
            <img width='100%' src={Img10}></img>
            <img width='100%' src={Img11}></img>
            <img width='100%' src={Img12}></img>
          </div>
      </div>
    </div>
  );
}

export default COMPANY;
