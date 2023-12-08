import React,{createRef} from 'react';
import ImgNode from '../../../image/SkyApp.png';
import ImgNode1 from '../../../image/앤츠네스트앱.png';
import ImgNode2 from '../../../image/antsnest.png';
import ImgNode3 from '../../../image/antsnest2.png';
import ImgNode4 from '../../../image/AntsNestInt.jpg';

import FileDownload1 from '../../../ftp/SkyApp.apk';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';


const WindowsApp = createRef();
const MobileApp = createRef();
const MenuArray = [WindowsApp,MobileApp];
const ActiveCheck=(Menu,MenuArray)=>{
  try{
    MenuArray.map((Item,Index)=>{ if(Item.current.className === 'TabActive') Item.current.className = ''; })
      if(Menu.current.className === 'TabActive')
        Menu.current.className = '';
      else
        Menu.current.className = 'TabActive';
  }
  catch(err){
  }
}

function Download() {

  return (
    <div className='Wrapper'>
      <div className='TabControl'>
          <div className='TabPageBig'>
            <ul className="SubNavLeft">
            <li><Link to="/Download" ref={WindowsApp}  id='WindowsApp' className="" onClick={()=>ActiveCheck(WindowsApp,MenuArray)}> 윈도우앱 </Link></li>
            <li><Link to="/DownloadMobile" ref={MobileApp}  id='MoblieApp' className="TabActive" onClick={()=>ActiveCheck(MobileApp,MenuArray)}> 모바일앱</Link></li>
            <li><a id='UnityApp' className="" id="FREE"> 유니티앱</a></li>
            <li><a id='WorkDoc' className="" id="FREE"> API</a></li>
          </ul>
        </div>
        <div className='DownloadMasterPanel'>
         <h1>스카이앱 (SkyApp) for Mobile</h1>
         <table>
           <tr>
             <td><img src={ImgNode1} width='500px' height='700px'></img></td>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='left'  size='1' width='300px' color='black'/>
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
         <br/><br/><br/><br/>
         <h1>키토 시크릿 (Keto Secret) for Android</h1>
         <table>
           <tr>
             <td><img width='500px'></img></td>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='left'  size='1' width='300px' color='black'/>
                <ul>
                  <li>최신 버전: V 0.01 - 2020/10/08</li>
                  <li>이전 버전: V 0.00 - 2020/8/08</li>
                  <li>라이선스 : 무료 소프트웨어</li>
                </ul>
                <a download='Ftp.zip'><button className='downbutton' width='100%'>[개발중] 아직 준비중입니다..</button></a><br/><br/>
                   <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
    </div>
        
  );
}

export default Download;
