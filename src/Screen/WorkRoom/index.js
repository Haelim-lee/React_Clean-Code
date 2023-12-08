import { Alarm, NoEncryption } from '@material-ui/icons';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import React, {  createRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import DeveloperBoard from './MyWork/Developer';
import Person from '@material-ui/icons/Person';
import Public from '@material-ui/icons/Public';
import {WorkRoomConfig} from '../../Common/ContextUtil/WorkRoomConfig';
import TabContorl from './MyWork/Tab';
import './MyWork/style.css';

function MyWork(){
  const WorkCalendarRef = createRef();
  const WorkRoomRef = createRef();
  const PortfolioRef = createRef();
  const Config = useContext(WorkRoomConfig);
  const [Sender,setSender] =useState({isPublic:true});
  var Action=undefined;

  const handleSaveDialog = (handleSaveClick) => {
    Action = handleSaveClick;
}
  
  return (
    <WorkRoomConfig.Provider value={Config}>
    <div className='Wrapper'>
          <h1>앤츠네스트 작업실</h1>
        <div className='TabControl'>
          <div className='TabPage'>
            <ul className="SubTabPage">
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkRoom' id='WorkRoom' className="TabActive" ref={WorkRoomRef}> 작업관리</Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/Portfolio' id='Portfolio' className="" ref={PortfolioRef}> 포트폴리오 </Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkCalendar' id='WorkCalendar' className="" ref={WorkCalendarRef}> 일정관리</Link></li>
              <li style={{float:'right',borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><a onClick={()=>Action(false)} className="" style={{padding:'11px 14px'}}> <Person/> </a></li>
              <li style={{float:'right',borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><a onClick={()=>Action(true)} className="" style={{padding:'11px 14px'}}> <Public/> </a></li>
            </ul>
              <TabContorl args = {handleSaveDialog} SelectedTab={'Developer'}/>
          <div style = {{  borderWidth:'1px', borderStyle:'solid' ,borderBottomStyle:'none' ,borderColor:'silver'}} id='Board_View'/>
        </div>
        </div>
      </div>
      </WorkRoomConfig.Provider>
  );
}

export default MyWork;