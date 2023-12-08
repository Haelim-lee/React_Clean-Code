import React, { createRef } from 'react';
import logo from './logo.svg';

import Photo from './Common/Component/Photo';
import Metro from './Common/Component/Metro';
import Home from './Screen/Home';
import Company from './Screen/Company/BizPlan';
import BizMember from './Screen/Company/BizMember';
import BizSkill from './Screen/Company/BizSkill';
import Product from './Screen/Product/WindowsApp';
import ProductMobile from './Screen/Product/MobileApp';
import Community from './Screen/Community';
import Help from './Screen/Help';
import Portfolio from './Screen/WorkRoom/Portfolio';
import WorkCalendar from './Screen/WorkRoom/MySchedule';
import WorkRoom from './Screen/WorkRoom';
import Developer from './Screen/WorkRoom/MyWork/Developer';
import Download from './Screen/Download/WindowsApp';
import DownloadMobile from './Screen/Download/MobileApp';
import Join from './Common/Component/ChatRoom/Join/Join';
import Chat from './Common/Component/ChatRoom/Chat/Chat';
import Board from './Common/Component/Board/index';
import MemberJoin from './Common/Component/LoginBox/Join';
import FindMemberInfo from './Common/Component/LoginBox/FindMemberInfo';
import MyInfoUpdate from './Common/Component/LoginBox/MyInfoUpdate';
import Remote from './Common/Component/RemotePage';

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';


function App() {
  const MenuBar = createRef();
  return (
   
    <div className="App">
      <header className="App-header">
        <Metro/>
      </header>
      <div id = "Contents" className="MasterPanel">
          <Route path="/" exact component={Home} key="Home"/>
          <Route path="/Company" exact component={Company} key="Company" />
          <Route path="/BizSkill" exact component={BizSkill} key="BizSkill" />
          <Route path="/BizMember" exact component={BizMember} key="BizMember" />
          <Route path="/Product" exact component={Product} key="Product"  />
          <Route path="/ProductMobile" exact component={ProductMobile} key="ProductMobile" />
          <Route path="/Community" exact component={Community} key="Community" />
          <Route path="/Help" exact component={Help} key="Help" />
          <Route path="/WorkRoom" exact component={WorkRoom} key="WorkRoom" />
          <Route path="/Developer" exact component={Developer} key="Developer" />
          <Route path="/Portfolio" exact component={Portfolio} key="Portfolio" />
          <Route path="/Download" exact component={Download} key="Download" />
          <Route path="/DownloadMobile" exact component={DownloadMobile} key="DownloadMobile" />
          <Route path="/join" exact component={Join} key="Join" />
          <Route path="/chat" exact component={Chat} key="Chat" />
          <Route path="/Photo" exact component={Photo} key="Photo" />
          <Route path="/Board" exact component={Board} key="Board" />
          <Route path="/MemberJoin" exact component={MemberJoin} key="MemberJoin" />
          <Route path="/MyInfoUpdate" exact component={MyInfoUpdate} key="MyInfoUpdate" />
          <Route path="/FindMemberInfo" exact component={FindMemberInfo} key="FindMemberInfo" />
          <Route path="/FreeBoard/:NUM" render={(props) => (<Board {...props} Type={'FreeBoard'}/>)} key="FreeBoard"/>
          <Route path="/NewsBoard/:NUM" render={(props) => (<Board {...props} Type={'NewsBoard'} />)} key="NewsBoard" />
          <Route path="/QaBoard/:NUM" render={(props) => (<Board {...props} Type={'QaBoard'} />)} key="QaBoard" />
          <Route path="/DeveloperNoteBoard/:NUM" render={(props) => (<Board {...props} Type={'DeveloperNoteBoard'} key="DeveloperNoteBoard"  />)}/>
          <Route path="/Remote" exact component={Remote} key="Remote" />
          <Route path="/WorkCalendar" exact component={WorkCalendar} key="WorkCalendar" />
      </div>
      <footer className="App-footer">접속 디바이스 : PC · 상호 : 앤츠네스트 ·  대표 : 용수현, 박상욱 · 사업자등록번호 : 000-00-00000<br/> Copyright© By Dexterity All rights reserved.</footer>
    </div>
  );
}

export default App;
