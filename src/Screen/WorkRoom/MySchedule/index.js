import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import React, {  createRef,useState, useEffect } from 'react';
import WBS from '../../../Common/Component/WBS'
import ReactDOM from 'react-dom';

function MySchedule(){
  const WorkCalendarRef = createRef();
  const WorkRoomRef = createRef();
  const PortfolioRef = createRef();
  useEffect(() => {
      ReactDOM.render(<WBS Selecter={'Developer'} LinkAction={true}/>,document.getElementById('Board_View'));
  }, []); 
  return (
    <div className='Wrapper'>
          <h1>앤츠네스트 작업실</h1>
        <div className='TabControl'>
          <div className='TabPage'>
            <ul className="SubNav">
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkRoom' id='WorkRoom' className="TabActive" ref={WorkRoomRef}> 작업관리</Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/Portfolio' id='Portfolio' className="" ref={PortfolioRef}> 포트폴리오 </Link></li>
              <li style={{borderColor:'silver',borderStyle:'solid' ,borderWidth:'1px', borderBottomStyle:'none', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}><Link to='/WorkCalendar' id='WorkCalendar' className="" ref={WorkCalendarRef}> 일정관리</Link></li>
            </ul>
          <div style = {{ borderWidth:'1px', borderStyle:'solid',borderBottomStyle:'none' ,borderColor:'silver'}} id='Board_View'/>
        </div>
        </div>
      </div>
  );
}

export default MySchedule;