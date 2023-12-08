import React from 'react';
import logo from './logo.svg';
import MobileMetro from './Common/Component/MobileMetro';
import Home from './Screen/Home/Mobile';
import TimeLine from './Screen/Home/MobileTimeLine';
import Company from './Screen/Company/mobile';
import BizMember from './Screen/Company/BizMember/mobile';
import BizSkill from './Screen/Company/BizSkill/mobile';
import WindowsApp from './Screen/Product/WindowsApp/mobile';
import MobileApp from './Screen/Product/MobileApp/mobile';
import UnityApp from './Screen/Product/UnityApp/mobile';
import Community from './Screen/Community/mobile';

import WindowsDown from './Screen/Download/WindowsApp/mobile';
import MobileDown from './Screen/Download/MobileApp/mobile';
import UnityDown from './Screen/Download/UnityApp/mobile';

import Help from './Screen/Help';
import WorkRoom from './Screen/WorkRoom/Mobile';

import Portfolio from './Screen/WorkRoom/Portfolio/mobile';

import Join from './Common/Component/ChatRoom/Join/JoinMobile';
import Chat from './Common/Component/ChatRoom/Chat/Chat';
import Board from './Common/Component/Board/Mobile';
import Photo from './Common/Component/Photo/Mobile';
import Login from './Common/Component/LoginBox/LoginMobile';
import MemberJoin from './Common/Component/LoginBox/MobileJoinView';

import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import ReactDOM from 'react-dom';

import './App.css';

function Mobile() {
  return (
    <div className="App">
      <header className="App-header">
        <MobileMetro/>
      </header>
      <div id = "Contents" className="MasterPanel">
          <Route path="/" exact component={Home} />
          <Route path="/TimeLine" exact component={TimeLine} />
          <Route path="/Company" exact component={Company} />
          <Route path="/BizSkill" exact component={BizSkill} key="BizSkill" />
          <Route path="/BizMember" exact component={BizMember} />

          <Route path="/WindowsProduct" exact component={WindowsApp} />
          <Route path="/MobileProduct" exact component={MobileApp} />
          <Route path="/UnityProduct" exact component={UnityApp} />

          <Route path="/Community" exact component={Community} />
          <Route path="/Help" exact component={Help} />
          <Route path="/WorkRoom" exact component={WorkRoom} />

          <Route path="/WindowsDown" exact component={WindowsDown} />
          <Route path="/MobileDown" exact component={MobileDown} />
          <Route path="/UnityDown" exact component={UnityDown} />

          <Route path="/Portfolio" exact component={Portfolio} key="Portfolio" />

          <Route path="/join" exact component={Join} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/Photo" exact component={Photo} />
          <Route path="/Board" exact component={Board} />
          <Route path="/Login" exact component={Login} />
          <Route path="/MemberJoin" exact component={MemberJoin} />
          <Route path="/FreeBoard/:NUM" render={(props) => (<Board {...props} Type={'FreeBoard'} />)}/>
          <Route path="/NewsBoard/:NUM" render={(props) => (<Board {...props} Type={'NewsBoard'} />)}/>
          <Route path="/QaBoard/:NUM" render={(props) => (<Board {...props} Type={'QaBoard'} />)}/>
      </div>
      <footer className="App-footer"> · 상호 : 앤츠네스트 ·  대표 : 용수현, 박상욱<br/> · 사업자등록번호 : 000-00-00000<br/> Copyright© By Dexterity All rights reserved.<br/>접속 디바이스 : 모바일</footer>
    </div>
  );
}

export default Mobile;
