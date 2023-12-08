import React from 'react';
import ChatRoom from '../../Common/Component/ChatRoom/ChatRoom';
import Board from '../../Common/Component/Board/Mobile';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import chatroom from '../../image/pngegg.png';
import Freeboard from '../../image/board.png';
import Camera from '../../image/camera.png';
import Camcorder from '../../image/Camcorder.png';
import RemoteSupport from '../../image/RemoteSupport.png';
import Cloud from '../../image/Cloud.png';
import Kakao from '../../image/KakaoCh.png';
import Blog from '../../image/blog.png';
import '../style.css';

function NOTICE() {
  
  return (
    
    <div className='Wrapper'>
           <h1>앤츠네스트 작업실</h1>
        <div className='NoticeMasterPanel'>
          <div className='Chat'><Link className='MobileLink' to='/Join'><img src={chatroom} width='80%' height='80%'></img ><span><br/>채팅방</span></Link></div>
          <div className='Board'><Link className='MobileLink' to='/Board'><img src={Freeboard} width='80%' height='80%'></img ><span><br/>게시판</span></Link></div>
          <div className='Camera'><Link className='MobileLink' to='/Photo'><img src={Camera} width='70%' height='70%'></img ><span><br/>사진첩</span></Link></div>
          <div className='Camcorder'><Link className='MobileLink' to='/Video'><img src={Camcorder} width='70%' height='60%'></img ><span><br/>영상통화</span></Link></div>
          <div className='RemoteSupport'><Link className='MobileLink' to='/Remote'><img src={RemoteSupport} width='70%' height='80%'></img ><span><br/>원격지원</span></Link></div>
          <div className='Cloud'><Link className='MobileLink' to='/Cloud'><img src={Cloud} width='70%' height='70%'></img ><span><br/>클라우드</span></Link></div>
          <div className='Kakao'><a className='MobileLink' href="http://story.kakao.com/ch/ants"><img src={Kakao} width='70%' height='70%'></img ><br/>카카오채널</a></div>
          <div className='Blog'><a className='MobileLink' href="https://blog.naver.com/yhs1103korea"><img src={Blog} width='80%' height='80%' ></img ><br/>블로그</a></div>
        </div>
    </div>
  );
}

export default NOTICE;
