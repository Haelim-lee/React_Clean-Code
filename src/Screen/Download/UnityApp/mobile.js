import React from 'react';
import ImgNode from '../../../image/NodeMaster.jpg';
import ImgNodeFind from '../../../image/NodeMaster-Find.jpg';
import ImgNodeMemo from '../../../image/NodeMaster-Memo.jpg';
import ImgNodeCheck from '../../../image/NodeMaster-Check.jpg';
import ImgNode1 from '../../../image/NodeMaster1.jpg';
import ImgNode2 from '../../../image/NodeMaster2.jpg';
import ImgNode3 from '../../../image/NodeMaster3.jpg';
import ImgNode4 from '../../../image/NodeMaster4.jpg';
import ImgKetoSecret1 from '../../../image/KetoSecret1.png';
import ImgKetoSecret2 from '../../../image/KetoSecret2.png';
import ImgKetoSecret3 from '../../../image/KetoSecret3.png';
import ImgKetoSecret4 from '../../../image/KetoSecret4.png';
import ImgKetoSecret5 from '../../../image/KetoSecret5.png';
import ImgKetoSecret6 from '../../../image/KetoSecret6.png';
import ImgKetoSecret7 from '../../../image/KetoSecret7.png';
import ImgKetoSecret8 from '../../../image/KetoSecret8.png';
import ImgHelperDoc1 from '../../../image/HelperDoc1.png';
import ImgHelperDoc2 from '../../../image/HelperDoc2.png';
import ImgHelperDoc3 from '../../../image/HelperDoc3.png';
import ImgHelperDoc4 from '../../../image/HelperDoc4.png';
import ImgHelperDoc5 from '../../../image/HelperDoc5.png';
import ImgHelperDoc6 from '../../../image/HelperDoc6.png';
import ImgHelperDoc7 from '../../../image/HelperDoc7.png';
import ImgHelperDoc8 from '../../../image/HelperDoc8.png';
import FileDownload from '../../../ftp/NodeMaster.msi';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../style.css';

function Download() {
   
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
  let BizMemberTitle={
    padding: "2px",
    textAlign: "center",
    backgroundColor: "#474e5d",
    color: "white"
  
  };
  return (
    <div className='Wrapper'>
                       <div id='MobilelTabPage' style={TabPageStyle}>
          <ul id='MobileTabNavigater' style = { SubNavStyle} >
          <li style={ListStyle}><Link to="/WindowsDown" className="active"> 윈도우앱</Link></li>
          <li style={ListStyle}><Link to="/MobileDown" className=""> 모바일앱</Link></li>
          <li style={ListStyle}><Link to="/UnityDown" className=""> 유니버셜앱</Link></li>
            </ul>
            </div>
         <div className='DownloadMasterPanel'>
         <h1>준비중입니다.</h1>
          </div>
    </div>
  );
}

export default Download;
