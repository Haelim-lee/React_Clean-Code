import { Alarm, NoEncryption } from '@material-ui/icons';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import React, {  createRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import DeveloperBoard from './MyWork/Developer';
import Person from '@material-ui/icons/Person';
import Public from '@material-ui/icons/Public';
import {WorkRoomConfig} from '../../Common/ContextUtil/WorkRoomConfig';
import TabContorl from './MyWork/MobileTab';
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
          <div>
              <TabContorl args = {handleSaveDialog} SelectedTab={'Developer'}/>
          <div style = {{  borderWidth:'1px', borderStyle:'solid' ,borderBottomStyle:'none' ,borderColor:'silver'}} id='Board_View'/>
        </div>
        </div>
      </WorkRoomConfig.Provider>
  );
}

export default MyWork;