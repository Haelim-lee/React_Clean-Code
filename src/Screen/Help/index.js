import React, {  createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QABoard from './QA';
import BugBoard from './Bug';
import '../style.css';
import HelpDesk from '../../image/HelpDesk.png';

function Board(props) {
  const QA = createRef();
  const Bug = createRef();
  const Suggestions = createRef();
  const Inquiry = createRef();
  const MenuArray = [QA, Bug, Suggestions, Inquiry];
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

  const ActiveFind = (SelectedTab) => {
    if (SelectedTab === 'QA')
        ActiveCheck(QA, MenuArray);
    else if (SelectedTab === 'Bug')
    ActiveCheck(QA, MenuArray);
  }

  const ActiveCheck =(Menu, MenuArray) => {
    try{
      MenuArray.map((item, Index) => {
        if (item.current.className === 'TabActive')
        item.current.className = '';
      })
      
      if (Menu.current.className === 'TabActive')
        Menu.current.className = '';
      else {
        Menu.current.className = 'TabActive';

        if(Menu.current.id==='QA')
          ReactDOM.render(<QABoard Selecter={ActiveFind} LinkAction={false}/>,document.getElementById('Board_View'));
      }
    }
    catch (err) {

    }
  }

  useEffect(() => {
    CreateSession();

    var data = {"NUM":props.match.params.NUM, "NOTICE_NAME":"", "NOTICE_TEXT":""}
        if (props.type === 'QA') {
            // 아직 구현예정 없음
        } else if (props.type === 'Bug')  {
            // 아직 구현예정 없음
        } else {
            ReactDOM.render(<QABoard  Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
        }
  }, []);

  return(
    <div className= 'Wrapper'>
      {/* <h1>앤츠네스트 고객지원</h1>
      <img src={HelpDesk}/> */}
        <div className = 'TabControl'>
          <p align='center'>  
            <div className='TabPage'>
              <ul className= 'SubNav'>
                  <li><a id='QA' className="" ref={QA} href="#QA" onClick={()=> ActiveCheck(QA, MenuArray)}>Q & A</a></li>
                  <li><a id='Bug' className="" ref={Bug} href="#Bug">버그신고</a></li>
                  <li><a id='Suggestions' className="" ref={Suggestions} href="#Suggestions">의견함</a></li>
                  <li><a id='Inquiry' className="" ref={Inquiry} href="#Inquiry">1대1 문의</a></li>
              </ul>
              <div id= 'Board_View'/>
            </div>
          </p>
        </div>
    </div>
  );
}

export default Board;