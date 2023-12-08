import React, {createRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline/Mobile';
import MyPicture from './MyPicture/Mobile';
import './style.css';
import session from 'express-session';

function Photo(props) {
    
    const time = createRef(); // 타임라인 메뉴
    const my = createRef(); // 내사진 메뉴
    const menuArray = [time, my]; // 메뉴 배열
    const [Session,setSession] = useState({});

    const getSession=async(msg)=>{
        let MySession=msg;
        await setSession(MySession);
      }
    const CreateSession=()=>{
        fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
        .then(res => res.json())
        .then((msg)=>{getSession(msg)})
        .catch(err=>alert(err+'오류'))
    }
      
    const activeFind = (selectedTab) => {
        if (selectedTab === 'time') {
            activeCheck(time, menuArray);
        } else if (selectedTab === 'my') {
            activeCheck(my, menuArray);
        }
    }

    /// 선택 tab에 따른 화면 이동
    const activeCheck= (menu, menuArray) => {
       
        try {
            menuArray.map((item, index) => {
                if (item.current.className === 'tabActive') {
                    item.current.className = '';
                }
            })

            if (menu.current.className === 'tabActive') {
                menu.current.className = '';
            } else {
                menu.current.className = 'tabActive';
                
                if (menu.current.id === 'timeline') {
                    ReactDOM.render(<Timeline selector = {activeFind} linkAction={true}/>, document.getElementById('Board_View'));
                } else if (menu.current.id === 'myPicture') {
                    ReactDOM.render(<MyPicture selector = {activeFind} linkAction={true}/>, document.getElementById('Board_View'));
                }
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        
        CreateSession();

        var data = {"NUM":props.match.params.NUM, "NOTICE_NAME":"", "NOTICE_TEXT":""}
        if (props.type === 'time') {
            // 아직 구현예정 없음
        } else if (props.type === 'my')  {
            // 아직 구현예정 없음
        } else {
            ReactDOM.render(<Timeline  Selecter={activeFind} LinkAction={true}/>,document.getElementById('Board_View'));
        }
    }, []);

    return (
        <div className= 'Wrapper'>
            <div className = 'TabControl'>
                <p align='center'>
                    <div className='TabPage'>
                        <ul className= 'SubNav'>
                            <li><a id='timeline' className="" ref={time} href="#timeline" onClick={()=> activeCheck(time, menuArray)}>타임라인</a></li>
                            {Session.UserId == undefined ? '' :
                            <li><a id='myPicture' className="" ref={my} href="#myPicture" onClick={()=> activeCheck(my, menuArray)}>내사진첩</a></li>
                            }
                        </ul>
                        <div id= 'Board_View'/>
                    </div>
                </p>
            </div>
        </div>
    );
}

export default Photo;