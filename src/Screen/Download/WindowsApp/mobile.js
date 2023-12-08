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

function WindowsDown() {
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
  
  }

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
            윈도우앱 다운로드<br/>
          </div>
         <div className='DownloadMasterPanel'>
         <h2 style={{textAlign: 'center',paddingLeft: '20px',marginBottom:'1px'}}>노드 마스터<br/> (Node Master)</h2>
         <img src={ImgNode} width='65%' height='150px'/>
         <hr width='100%'/>
         <table className='Info' align="center">
         <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img src={ImgNode} height='80px'/>
                  <img src={ImgNodeFind} height='80px'/>
                  <img src={ImgNodeMemo} height='80px'/>
                  <img src={ImgNodeCheck} height='80px'/>
                  <img src={ImgNode1} height='80px'/>
                  <img src={ImgNode2} height='80px'/>
                  <img src={ImgNode3} height='80px'/>
                  <img src={ImgNode4} height='80px'/>
                 </div>
               </td>
             </tr>  
           <tr>
           <td className='SoftwareInfo' colSpan='2'>
                <h2 align='CENTER'>다운로드</h2>
                    <hr size='1' width='300px' color='black'/>
                    <p align='center'><div className='DownInfo'>
                      <ul>
                        <li>최신 버전: V 0.01 - 2020/10/08</li>
                        <li>이전 버전: V 0.00 - 2020/8/08</li>
                        <li>라이선스 : 무료 소프트웨어</li>
                      </ul>
                    </div></p>
                   <a href={FileDownload} download='NodeMaster.msi'><button className='downbutton' width='100%'>노드마스터 다운로드 V 0.01</button><br/><br/></a>
             </td>
             </tr>
            
         </table>
         <hr width='100%'/>
         <h2 style={{textAlign: 'center',paddingLeft: '20px',marginBottom:'1px'}}>키토 시크릿 <br/>  (Keto Secret)</h2>
         <img src={ImgKetoSecret1} width='65%' height='150px'/>
         <hr width='100%'/>
         <table>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img src={ImgKetoSecret1} width='25%' height='80px'/>
                  <img src={ImgKetoSecret2} width='25%' height='80px'/>
                  <img src={ImgKetoSecret3} width='25%' height='80px'/>
                  <img src={ImgKetoSecret4} width='25%' height='80px'/>
                  <img src={ImgKetoSecret5} width='25%' height='80px'/>
                  <img src={ImgKetoSecret6} width='25%' height='80px'/>
                  <img src={ImgKetoSecret7} width='25%' height='80px'/>
                  <img src={ImgKetoSecret8} width='25%' height='80px'/>
                 </div>
               </td>
             </tr>
             <tr>
           <td colSpan='2'>
                <h2 align='CENTER'>다운로드</h2>
                    <hr align='CENTER'  size='1' width='300px' color='black'/>
                    <p align='center'><div className='DownInfo'>
                      <ul>
                        <li>최신 버전: V 0.01 - 2020/10/08</li>
                        <li>이전 버전: V 0.00 - 2020/8/08</li>
                        <li>라이선스 : 무료 소프트웨어</li>
                      </ul>
                    </div></p>
                   <button className='downbutton' width='100%'>아직 준비중입니다..</button><br/><br/>
                   <hr width='100%'/>
                   <br/>
             </td>
             </tr>
         </table>

         <br/>
         <h2 style={{textAlign: 'center',paddingLeft: '20px',marginBottom:'1px'}}>헬퍼 독(Helper Doc) <br/> for Windows</h2>
         <img src={ImgHelperDoc1} width='65%' height='150px'/>
         <hr width='100%'/>
         <table>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img src={ImgHelperDoc1} width='25%' height='80px'/>
                  <img src={ImgHelperDoc2} width='25%' height='80px'/>
                  <img src={ImgHelperDoc3} width='25%' height='80px'/>
                  <img src={ImgHelperDoc4} width='25%' height='80px'/>
                  <img src={ImgHelperDoc5} width='25%' height='80px'/>
                  <img src={ImgHelperDoc6} width='25%' height='80px'/>
                  <img src={ImgHelperDoc7} width='25%' height='80px'/>
                  <img src={ImgHelperDoc8} width='25%' height='80px'/>
                 </div>
               </td>
             </tr>
             <tr>
           <td colSpan='2'>
                <h2 align='CENTER'>다운로드</h2>
                    <hr align='CENTER'  size='1' width='300px' color='black'/>
                    <p align='center'><div className='DownInfo'>
                      <ul>
                        <li>최신 버전: V 0.01 - 2020/10/08</li>
                        <li>이전 버전: V 0.00 - 2020/8/08</li>
                        <li>라이선스 : 무료 소프트웨어</li>
                      </ul>
                    </div></p>
                   <button className='downbutton' width='100%'>아직 준비중입니다..</button><br/><br/>
                   <hr width='100%'/>
                   <br/><br/><br/>
             </td>
             </tr>
         </table>
          </div>
    </div>
  );
}

export default WindowsDown;
