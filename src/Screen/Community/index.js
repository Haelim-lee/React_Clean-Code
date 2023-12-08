import React from 'react';
import Board from '../../Common/Component/Board';
import ChatRoom from '../../Common/Component/ChatRoom/ChatRoom';

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
// ReactDOM.render(<ChatRoom />, document.querySelector('#root'));

function NOTICE() {
  return (
    <div className='Wrapper'>
            <h1>앤츠네스트 커뮤니티</h1>
        <div className='NoticeMasterPanel'>
          <div className='Chat'><Link to='/Join'><img src={chatroom} width='70%' height='80%'></img ><span>채팅방</span></Link></div>
          <div className='Board'><Link to='/Board'><img src={Freeboard} width='70%' height='80%'></img ><span>게시판</span></Link></div>
          <div className='Camera'><Link to='/Photo'><img src={Camera} width='70%' height='80%'></img ><span>사진첩</span></Link></div>
          <div className='Camcorder'><Link to='/Video'><img src={Camcorder} width='50%' height='50%'></img><span>영상통화</span></Link></div>
          <div className='RemoteSupport'><Link to='/Remote'><img src={RemoteSupport} width='70%' height='80%'></img ><span>원격지원</span></Link></div>
          <div className='Cloud'><Link to='/Cloud'><img src={Cloud} width='70%' height='80%'></img ><span>클라우드</span></Link></div>
          <div className='Kakao'><a href="http://story.kakao.com/ch/ants"><br/><img src={Kakao} width='70%' height='80%'></img ></a></div>
          <div className='Blog'><a href="https://blog.naver.com/yhs1103korea"><br/><img src={Blog} width='70%' height='80%' ></img ></a></div>
          
        </div>
    </div>
  );
}

export default NOTICE;
