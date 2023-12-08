import React,{createRef} from 'react';
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
import FileDownload1 from '../../../ftp/NodeMaster.msi';
import FileDownload4 from '../../../ftp/NodeMasterLocal.msi';
import FileDownload2 from '../../../ftp/KetoSecret.msi';
import FileDownload3 from '../../../ftp/Ftp.zip';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';

const WindowsApp = createRef();
const MobileApp = createRef();
const WebApp = createRef();
const MenuArray = [WindowsApp,MobileApp,WebApp];
const ActiveCheck=(Menu,MenuArray)=>{
  try{
    MenuArray.map((Item,Index)=>{
      if(Item.current.className === 'TabActive')
        Item.current.className = '';
    })
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
            <li><Link to="/Download" ref={WindowsApp}  id='WindowsApp' className="TabActive" onClick={()=>ActiveCheck(WindowsApp,MenuArray)}> 윈도우앱 </Link></li>
            <li><Link to="/DownloadMobile" ref={MobileApp}  id='MoblieApp' onClick={()=>ActiveCheck(MobileApp,MenuArray)}> 모바일앱</Link></li>
            <li><a id='UnityApp' className="" id="FREE"> 유니티앱</a></li>
            <li><a id='WorkDoc' className="" id="FREE"> API</a></li>
          </ul>
        </div>
        <div className='DownloadMasterPanel'>
         <h1>노드 마스터 (Node Master) for Windows</h1>
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
                   <a href={FileDownload1} download='NodeMaster.msi'><button className='downbutton' width='100%'>[클라우드]노드마스터 다운로드 V 0.01</button><br/><br/></a>
                   <a href={FileDownload4} download='NodeMasterLocal.msi'><button className='downbutton' width='100%'>[로컬]노드마스터 다운로드 V 0.01</button><br/><br/></a>
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
         <br/><br/><br/><br/>
         <h1>키토 시크릿 (Keto Secret) for Windows</h1>
         <table>
           <tr>
             <td><img src={ImgKetoSecret4} width='500px'></img></td>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='left'  size='1' width='300px' color='black'/>
                <ul>
                  <li>최신 버전: V 0.01 - 2020/10/08</li>
                  <li>이전 버전: V 0.00 - 2020/8/08</li>
                  <li>라이선스 : 무료 소프트웨어</li>
                </ul>
               
                <a href={FileDownload2} download='KetoSecret.msi'><button className='downbutton' width='100%'>키토 시크릿 다운로드 V 0.01</button></a><br/><br/>
                   <br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </td>
             </tr>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img src={ImgKetoSecret1} width='100px' height='80px'/>
                  <img src={ImgKetoSecret2} width='100px' height='80px'/>
                  <img src={ImgKetoSecret3} width='100px' height='80px'/>
                  <img src={ImgKetoSecret4} width='100px' height='80px'/>
                  <img src={ImgKetoSecret5} width='100px' height='80px'/>
                  <img src={ImgKetoSecret6} width='100px' height='80px'/>
                  <img src={ImgKetoSecret7} width='100px' height='80px'/>
                  <img src={ImgKetoSecret8} width='100px' height='80px'/>
                 </div>
               </td>
             </tr>
         </table>

         <br/><br/><br/><br/>
         <h1>헬퍼 독(Helper Doc) for Windows</h1>
         <table>
           <tr>
             <td><img src={ImgHelperDoc1} width='500px'></img></td>
             <td>
                <h2 align='center'>다운로드</h2>
                    <hr align='left'  size='1' width='300px' color='black'/>
                <ul>
                  <li>최신 버전: V 0.01 - 2020/10/08</li>
                  <li>이전 버전: V 0.00 - 2020/8/08</li>
                  <li>라이선스 : 무료 소프트웨어</li>
                </ul>
                <a href={FileDownload3} download='Ftp.zip'><button className='downbutton' width='100%'>아직 준비중입니다..</button></a><br/><br/>
                   <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </td>
             </tr>
             <tr>
               <td colSpan='2'>
                 <div className='pix'>
                  <img src={ImgHelperDoc1} width='100px' height='80px'/>
                  <img src={ImgHelperDoc2} width='100px' height='80px'/>
                  <img src={ImgHelperDoc3} width='100px' height='80px'/>
                  <img src={ImgHelperDoc4} width='100px' height='80px'/>
                  <img src={ImgHelperDoc5} width='100px' height='80px'/>
                  <img src={ImgHelperDoc6} width='100px' height='80px'/>
                  <img src={ImgHelperDoc7} width='100px' height='80px'/>
                  <img src={ImgHelperDoc8} width='100px' height='80px'/>
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
