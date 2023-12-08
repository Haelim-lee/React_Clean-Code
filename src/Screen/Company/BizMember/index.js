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
  return (
    <div className='TabControl'>
          <div className='TabPageBig'>
            <ul className="SubNavLeft">
            <li><Link to="/Company" ref={BizPlan}   id='BizPlan'  className="" onClick={()=>ActiveCheck(BizPlan,MenuArray)}> 사업계획 </Link></li>
            <li><Link to='/BizSkill' ref={BizSkill} id="BizSkill"  className="" onClick={()=>ActiveCheck(BizSkill,MenuArray)}>기술이력 </Link></li>
            <li><Link to="/BizMember" ref={BizMember}  id='BizMember'  className="TabActive"  onClick={()=>ActiveCheck(BizMember,MenuArray)}> 구성원</Link></li>
          </ul>
    <div id='BizMemberView'>
      <div className="about-section">
  <h1>About Us Page</h1>
  <p>앤츠네스트</p>
  <p>프리랜서그룹 개발팀을 소개합니다.</p>
</div>

      <h2>Project Team</h2>
                        <div className="row">
                              <div className="column">
                                    <div className="card">
                                      <img width="300px" height="300px" src={Dexterity} alt="Dexterity"/>
                                      <div className="containerBox">
                                        <h2>용수현</h2>
                                        <p className="title">Project Leader</p>
                                        <p>[프로젝트 그룹 대표]<br/>
                                        Rnd 개발,인프라 담당
                                         </p>
                                        <p>ysh1103korea@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                                <div className="column">
                                                <div className="card">
                                                  <img  width="300px" height="300px"  src={Proudin} alt="Proudin"/>
                                                  <div className="containerBox">
                                                    <h2>박상욱</h2>
                                                    {/* <p className="title">Art Director</p> */}
                                                    <p className="title">Project Leader</p>
                                                    <p>[프로젝트 그룹 대표] <br/>
                                                    서버 및 데이터베이스 담당</p>
                                                    <p>psw88@antsnest.co.kr</p>
                                                    <p><button className="button">Contact</button></p>
                                                  </div>
                                                </div>
                                              </div>

                                <div className="column">
                                  <div className="card">
                                    <img width="300px" height="300px" src={butters} alt="John"/>
                                    <div className="containerBox">
                                      <h2>최용호</h2>
                                      <p className="title">Project Member</p>
                                      <p>WebApp Developer <br/>
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
                                      <img src={ParkParkMy} alt="ParkParkMy"/>
                                      <div className="containerBox">
                                        <h2>박명준</h2>
                                        <p className="title">Project Member</p>
                                        <p>[Application Developer]<br/>
                                              Java / .Net 응용 개발
                                         010-7362-8147</p>
                                        <p>ysh1103korea@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                                <div className="column">
                                                <div className="card">
                                                  <img src={Future} alt="Future"/>
                                                  <div className="containerBox">
                                                    <h2>이혜림</h2>
                                                    {/* <p className="title">Art Director</p> */}
                                                    <p className="title">Project Member</p>
                                                    <p>[Application Developer]<br/>
                                                    WPF /.Net 응용 개발</p>
                                                    <p>psw88@antsnest.co.kr</p>
                                                    <p><button className="button">Contact</button></p>
                                                  </div>
                                                </div>
                                              </div>
                               
                                <div className="column">
                                  <div className="card">
                                    <img src={Woojong} alt="Woojong"/>
                                    <div className="containerBox">
                                      <h2>진우종</h2>
                                      <p className="title">Project Member</p>
                                          <p>WebApp Developer <br/>
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
                                    <img src={Hollis} alt="Hollis"/>
                                    <div className="containerBox">
                                      <h2>김연주</h2>
                                      <p className="title">3D Designer</p>
                                      <p>3D 모델링 리소스</p>
                                      <p>john@example.com</p>
                                      <p><button className="button">Contact</button></p>
                                    </div>
                                  </div>
                                </div>
                              <div className="column">
                                    <div className="card">
                                      <img src={pghpgh} alt="ParkParkMy"/>
                                      <div className="containerBox">
                                        <h2>박경화</h2>
                                        <p className="title">Project Member</p>
                                        <p>[리눅스,데이터베이스]<br/>
                                        인프라 구축 설계</p>
                                        <p>ysh1103korea@antsnest.co.kr</p>
                                        <p><button className="button">Contact</button></p>
                                      </div>
                                      </div>
                                </div>
                                <div className="column">
                                                <div className="card">
                                                  <img src="/w3images/team2.jpg" alt="Dexterity"/>
                                                  <div className="containerBox">
                                                    <h2>허정준</h2>
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
            </div>
            </div>
        </div>
  );
}

export default BizMember;
