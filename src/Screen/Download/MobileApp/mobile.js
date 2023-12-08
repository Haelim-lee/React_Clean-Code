import React from 'react';


import ImgNode from '../../../image/SkyApp.png';
import ImgNode1 from '../../../image/앤츠네스트앱.png';
import ImgNode2 from '../../../image/antsnest.png';
import ImgNode3 from '../../../image/antsnest2.png';
import ImgNode4 from '../../../image/AntsNestInt.jpg';
import FileDownload1 from '../../../ftp/SkyApp.apk';
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
            <div style={BizMemberTitle} >
            모바일앱 다운로드<br/>
          </div>
         <div className='DownloadMasterPanel'>
         <h2 style={{textAlign: 'left',paddingLeft: '20px',marginBottom:'1px'}}>스카이앱 (SkyApp) for Mobile</h2>
         <table>
           <tr>
             <td><img src={ImgNode1} width='75%' height='400px'></img></td>
            </tr>
            <tr>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='center'  size='1' width='300px' color='black'/>
                <ul>
                  <li>최신 버전: V 0.01 - 2020/10/08</li>
                  <li>이전 버전: V 0.00 - 2020/8/08</li>
                  <li>라이선스 : 무료 소프트웨어</li> 
                </ul>
                   <a href={FileDownload1} download='SkyApp.apk'><button className='downbutton' width='100%'>[개발중] 스카이앱 APK  앱다운로드 V 0.01</button><br/><br/></a>
                   <a href={FileDownload1} download='SkyApp.apk'><button className='downbutton' width='100%'>[개발중] 스카이앱 IPA  앱다운로드 V 0.01</button><br/><br/></a>
             </td>
             </tr>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                 <img src={ImgNode} width='100px' height='80px'/>
                  <img src={ImgNode1} width='100px' height='80px'/>
                  <img src={ImgNode2}width='100px' height='80px'/>
                  <img src={ImgNode3} width='100px' height='80px'/>
                  <img src={ImgNode4} width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                 </div>
               </td>
             </tr>
         </table>
         <h2 style={{textAlign: 'left',paddingLeft: '20px',marginBottom:'1px'}}>키토 시크릿 (Keto Secret) <br/>for Android</h2>
         <table>
           <tr>
             <td><img  width='75%' height='400px'></img></td>
             </tr>
             <tr>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='center'   size='1' width='300px' color='black'/>
                <ul>
                  <li>최신 버전: V 0.01 - 2020/10/08</li>
                  <li>이전 버전: V 0.00 - 2020/8/08</li>
                  <li>라이선스 : 무료 소프트웨어</li>
                </ul>
                <a download='Ftp.zip'><button className='downbutton' width='100%'>[개발중] 아직 준비중입니다..</button></a><br/><br/>
                   
             </td>
             </tr>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                  <img width='100px' height='80px'/>
                 </div>
               </td>
             </tr>
         </table>
          </div>
    </div>
  );
}

export default Download;
