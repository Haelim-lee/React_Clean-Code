import React,{createRef} from 'react';
import ImgNode from '../../../image/NodeMaster.jpg';
import ImgNodeFind from '../../../image/NodeMaster-Find.jpg';
import ImgNodeMemo from '../../../image/NodeMaster-Memo.jpg';
import ImgNodeCheck from '../../../image/NodeMaster-Check.jpg';
import ImgNode1 from '../../../image/NodeMaster1.jpg';
import ImgNode2 from '../../../image/NodeMaster2.jpg';
import ImgNode3 from '../../../image/NodeMaster3.jpg';
import ImgNode4 from '../../../image/NodeMaster4.jpg';
import FileDownload1 from '../../../ftp/NodeMaster.msi';

import { BrowserRouter as Router, Route,Link} from 'react-router-dom';


function Download() {
  const WindowsApp = createRef();
  const MobileApp = createRef();
  const WebApp = createRef();
  const MenuArray = [WindowsApp,MobileApp,WebApp];
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
  return (
    <div className='Wrapper'>
    <div className='TabControl'>
        <p align='center'>
        <div className='TabPageBig'>
          <ul className="SubNavLeft">
          <li><Link to="/Download" ref={WindowsApp}  id='WindowsApp' className="TabActive" onClick={()=>ActiveCheck(WindowsApp,MenuArray)}> 윈도우앱 </Link></li>
          <li><Link to="/DownloadMobile" ref={MobileApp}  id='MoblieApp' onClick={()=>ActiveCheck(MobileApp,MenuArray)}> 모바일앱</Link></li>
          <li><a id='UnityApp' className="" id="FREE"> 유니티앱</a></li>
          <li><a id='WorkDoc' className="" id="FREE"> API</a></li>
        </ul>
      </div>
      <div className='DownloadMasterPanel'>
       <h1>KRdotNet (Node Master) for DotNetFrameWork</h1>
       <table>
         <tr>
           <td><img src={ImgNode} width='500px'></img></td>
           <td>
              <h2 align='center'>다운로드</h2>
                  <hr align='left'  size='1' width='300px' color='black'/>
              <ul>
                <li>최신 버전: V 0.01 - 2020/10/08</li>
                <li>이전 버전: V 0.00 - 2020/8/08</li>
                <li>라이선스 : 무료 소프트웨어</li> 
              </ul>
                 <a href={FileDownload1} download='NodeMaster.msi'><button className='downbutton' width='100%'>KRdotNet 다운로드 V 0.01</button><br/><br/></a>
           </td>
           </tr>
           <tr>
             <td colSpan='2'>
               <div className='pix'>
               <img src={ImgNode} width='100px' height='80px'/>
                <img src={ImgNodeFind} width='100px' height='80px'/>
                <img src={ImgNodeMemo} width='100px' height='80px'/>
                <img src={ImgNodeCheck} width='100px' height='80px'/>
                <img src={ImgNode1} width='100px' height='80px'/>
                <img src={ImgNode2} width='100px' height='80px'/>
                <img src={ImgNode3} width='100px' height='80px'/>
                <img src={ImgNode4} width='100px' height='80px'/>
               </div>
             </td>
           </tr>
       </table>
        </div>
      </p>
    </div>
  </div>
        
  );
}

export default Download;
