import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MyLogo from '../../image/MyLogo.png';
import Board from '../../Common/Component/Board/Mobile';
import FreeBoard from '../../Common/Component/Board/FreeBoard/Mobile';
import NewsBoard from '../../Common/Component/Board/NewsBoard/Mobile';
import QaBoard from '../../Common/Component/Board/QaBoard/Mobile';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Notice from '../Community/mobile';
import '../style.css';

function MobileTimeLine() {
  const [Feed,setFeed] = useState([{}]);
    const getFeed=()=>{
      fetch('http://antsnest.co.kr:4000/GetAllFeedPhoto_ORG',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
       //.then(msg=>alert(JSON.stringify(msg)))
      .catch(err=>alert(err+'오류'));
    }
  useEffect(() => {
    getFeed();
  }, []); 
  let TabPageStyle = {
    display:'flex',
    flexWrap:"wrap",
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
  return (
    <div id='WrapperBox' className='Wrapper'>
              <div id='MobilelTabPage' style={TabPageStyle}>
          <ul id='MobileTabNavigater' style = { SubNavStyle} >
              <li style={ListStyle}><Link to="/" className="active"> 홈</Link></li>
              <li style={ListStyle}><Link to="/TimeLine" className=""> 타임라인</Link></li>
              <li style={ListStyle}><Link to="/Photo" className="active"> 피드</Link></li>
            </ul>
        </div>
              <div className='ThumbnailViewer' style={{display:'flex',justifyContent:'center',width:'100%'}}>
              <div>
                {Feed.map((Data,i) => 
                    (
                      <img id='NewPhotoThumbnail' width='145px' height='145px' src={Feed[0]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Data.pix_loadPath}/>
                    ))}
              </div>
            </div>

    </div>
  );
}

export default MobileTimeLine;
