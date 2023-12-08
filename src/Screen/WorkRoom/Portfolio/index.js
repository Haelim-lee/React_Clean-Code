import React, {  createRef,useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import DeveloperBoard from '../MyWork/Developer';
import ModelerBoard from '../MyWork/Modeler';

import Designer from './Designer';
import Person from '@material-ui/icons/Person';
import Public from '@material-ui/icons/Public';
import TabContorl from './Tab';
import './style.css';



function PORTFOLIO() {
  const WorkCalendarRef = createRef();
  const WorkRoomRef = createRef();
  const PortfolioRef = createRef();
  

  return (
        <div>
           <h1>앤츠네스트 작업실</h1>
          <div className='TabControl'>
          <div className='TabPage'>
            <ul className="SubNav">
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkRoom' id='WorkRoom' className="" ref={WorkRoomRef}> 작업관리</Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/Portfolio' id='Portfolio' className="TabActive" ref={PortfolioRef}> 포트폴리오 </Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkCalendar' id='WorkCalendar' className="" ref={WorkCalendarRef}> 일정관리</Link></li>
              <li style={{float:'right',borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkCalendar' id='WorkCalendar' className="" style={{padding:'11px 14px'}} ref={WorkCalendarRef}> <Person/></Link></li>
              <li style={{float:'right',borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkCalendar' id='WorkCalendar' className="" style={{padding:'11px 14px'}}  ref={WorkCalendarRef}> <Public/></Link></li>
          </ul>
        </div>
        <TabContorl SelectedTab={'Developer'}/>
        <div id='Portfolio_View'/>

      </div>
    </div>
    
  );
}

export default PORTFOLIO;