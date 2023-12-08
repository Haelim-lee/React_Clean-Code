import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Mobile from './Mobile';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

//모바일 구분용 정보 체크
var uAgent = navigator.userAgent.toLowerCase();
var mDevice =new Array('iPhone', 'iPod', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'samsung', 'sonyericsson', 'mobile', 'symbian', 'opera mobi', 'opera mini', 'iemobile');
var MyDevice = 'PC';
for (var i = 0; i < mDevice.length; i++)
if (uAgent.indexOf(mDevice[i]) != -1)
{
  MyDevice = 'Mobile';
}

if(MyDevice =='PC'){
  ReactDOM.render(
    <React.StrictMode>
       <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
else{
  ReactDOM.render(
    <React.StrictMode>
        <Router>
        <Mobile />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
