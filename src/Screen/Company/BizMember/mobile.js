import './style.css';
import React, { createRef } from 'react';
import Dexterity from '../../../image/Dexterity.jpg';
import ParkParkMy from '../../../image/ParkParkMy.jpg';
import butters from '../../../image/butters.jpg';
import Proudin from '../../../image/Proudin.jpg';
import Future from '../../../image/Future.jpg';
import Woojong from '../../../image/Woojong.jpg';
import Hollis from '../../../image/Hollis.jpg';
import pghpgh from '../../../image/pghpgh.png';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';


function BizMember() {
  const BizPlan = createRef();
  const BizMember = createRef();
  const BizSkill = createRef();
const MenuArray = [BizPlan,BizMember,BizSkill];
const ActiveCheck=(Menu,MenuArray)=>{
  try{
    MenuArray.map((Item,Index)=>{
      if(Item.current.className === 'TabActive')
        Item.current.className = '';
    })
      if(Menu.current.className === 'TabActive')
        Menu.current.className = '';
      else
        Menu.current.className = 'TabActive';
  }
  catch(err){
    
  }
}
 
let TabPageStyle = {
  display:'flex',
  flexWrap:"wrap",
  width: '100%'
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
    <div className='TabControl'>
      <div id='MobilelTabPage' style={TabPageStyle}>
              <ul id='MobileTabNavigater' style = { SubNavStyle} >
                <li style={ListStyle}><Link to="/Company" className="active"> 사업계획</Link></li>
                <li style={ListStyle}><Link to="/BizSkill" className=""> 기술이력</Link></li>
                <li style={ListStyle}><Link to="/BizMember" className=""> 구성원</Link></li>
                </ul>
    <div id='BizMemberView'>
      <div style={BizMemberTitle} >
  About Us Page<br/>
</div>
      <h2>Project Team</h2>
                        <div className="row">
                              <div className="column">
                                    <div className="card">
                                      <img width="110px" height="110px" src={Dexterity} alt="Dexterity"/>
                                      <div className="containerBox">
                                        <h3>용수현</h3>
                                        <p className="title">Project Leader</p>
                                        <p>[프로젝트 그룹 대표]<br/>
                                        Rnd 개발,인프라 담당
                                         </p>
                                        <p id='email'>ysh1103korea@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                                <div className="column">
                                                <div className="card">
                                                  <img  width="110px" height="110px"  src={Proudin} alt="Proudin"/>
                                                  <div className="containerBox">
                                                    <h3>박상욱</h3>
                                                    {/* <p className="title">Art Director</p> */}
                                                    <p className="title">Project Leader</p>
                                                    <p>[프로젝트 그룹 대표] <br/>
                                                    서버 및 데이터베이스 담당</p>
                                                    <p>psw88@antsnest.co.kr</p>
                                                    <p><button className="button">Contact</button></p>
                                                  </div>
                                                </div>
                                              </div>
                        </div>
                        <div className="row">
                        <div className="column">
                                  <div className="card">
                                    <img width="110px" height="110px" src={butters} alt="John"/>
                                    <div className="containerBox">
                                      <h3>최용호</h3>
                                      <p className="title">Project Member</p>
                                      <p>[WebApp Developer] <br/>
                                          Spa 웹앱 개발 담당</p>
                                      <p>john@example.com</p>
                                      <p><button className="button">Contact</button></p>
                                    </div>
                                  </div>
                                </div>
                              <div className="column">
                                    <div className="card">
                                    <img width="110px" height="110px" src={ParkParkMy} alt="ParkParkMy"/>
                                      <div className="containerBox">
                                        <h3>박명준</h3>
                                        <p className="title">Project Member</p>
                                        <p>[Application Developer]<br/>
                                              Java / .Net 응용 개발</p>
                                              <p> ParkParkMy@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                        </div>
                        <div className="row">
                          
                        <div className="column">
                                                <div className="card">
                                                <img width="110px" height="110px" src={Future} alt="Future"/>
                                                  <div className="containerBox">
                                                    <h3>이혜림</h3>
                                                    {/* <p className="title">Art Director</p> */}
                                                    <p className="title">Project Member</p>
                                                    <p>[Application Developer]<br/>
                                                    WPF /.Net 응용 개발</p>
                                                    <p>gPfla8966@gmail.com</p>
                                                    <p><button className="button">Contact</button></p>
                                                  </div>
                                                </div>
                                              </div>
                               
                                <div className="column">
                                  <div className="card">
                                  <img width="110px" height="110px" src={Woojong} alt="Woojong"/>
                                    <div className="containerBox">
                                      <h3>진우종</h3>
                                      <p className="title">Project Member</p>
                                          <p>[WebApp Developer] <br/>
                                          Spa 웹앱 개발 담당</p>
                                      <p>john@example.com</p>
                                      <p><button className="button">Contact</button></p>
                                    </div>
                                  </div>
                                </div>
                                </div>

                              <div className="row">

                        <div className="column">
                                  <div className="card">
                                  <img width="110px" height="110px" src={Hollis} alt="Hollis"/>
                                    <div className="containerBox">
                                      <h3>김연주</h3>
                                      <p className="title">3D Designer</p>

                                      <p>[PhotoShop,3DMAX]<br/>3D 모델링 리소스</p>
                                      <p>john@example.com</p>
                                      <p><button className="button">Contact</button></p>
                                    </div>
                                  </div>
                                </div>
                              <div className="column">
                                    <div className="card">
                                    <img width="110px" height="110px" src={pghpgh} alt="ParkParkMy"/>
                                      <div className="containerBox">
                                        <h3>박경화</h3>
                                        <p className="title">Project Member</p>
                                        <p>[리눅스,데이터베이스]<br/>
                                        인프라 구축 설계</p>
                                        <p>ysh1103korea@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                              </div>

                              <div className="row">
                              <div className="column">
                                  <div className="card">
                                    <img src="/w3images/team2.jpg" alt="Dexterity"/>
                                    <div className="containerBox">
                                      <h3>허정준</h3>
                                      {/* <p className="title">Art Director</p> */}
                                      <p className="title">Project Member</p>
                                      <p>[Application Developer]<br/>
                                      프로시저 인터페이스</p>
                                      <p>psw88@antsnest.co.kr</p>
                                      <p><button className="button">Contact</button></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br/>
                              <br/><br/>
                              <br/>
            </div>
            </div>
        </div>
  );
}

export default BizMember;
