import React, {  createRef,useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import DeveloperBoard from '../MyWork/Developer';
import ModelerBoard from '../MyWork/Modeler';

import Designer from './Designer';
import Person from '@material-ui/icons/Person';
import Public from '@material-ui/icons/Public';
import TabContorl from './MobileTab';
import './style.css';

function PORTFOLIO() {

  return (
    <div>
 <TabContorl SelectedTab={'Developer'}/>
 <div id='Portfolio_View'/>
</div>
  );
}

export default PORTFOLIO;

