import { Alarm } from '@material-ui/icons';
import React, {  createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FreeBoard from './FreeBoard';
import NewsBoard from './NewsBoard';
import QaBoard from './QaBoard';
import DeveloperNoteBoard from './DeveloperNoteBoard';
import './style.css';

function Board(props) {
  const News = createRef();
  const Free = createRef();
  const QA = createRef();
  const DeveloperNote = createRef();
  const MenuArray = [News,Free,QA,DeveloperNote];

  const ActiveFind=(SelectedTab)=>{
    
    if(SelectedTab ==='News')
        ActiveCheck(News,MenuArray);
    else if(SelectedTab ==='Free')
        ActiveCheck(Free,MenuArray);
    else if(SelectedTab ==='Qa')
        ActiveCheck(QA,MenuArray);
    else if(SelectedTab ==='DeveloperNote')
        ActiveCheck(DeveloperNote,MenuArray);
  }
  const ActiveCheck=(Menu,MenuArray)=>{
    try{
      MenuArray.map((Item,Index)=>{
        if(Item.current.className === 'TabActive')
          Item.current.className = '';
      })
        if(Menu.current.className === 'TabActive')
          Menu.current.className = '';
        else
        {
          Menu.current.className = 'TabActive';
          if(Menu.current.id==='NEWS')
            ReactDOM.render(<NewsBoard Selecter={ActiveFind} LinkAction={false}/>,document.getElementById('Board_View'));
          else if (Menu.current.id==='FREE')
            ReactDOM.render(<FreeBoard Selecter={ActiveFind}  LinkAction={false}/>,document.getElementById('Board_View'));
          else if (Menu.current.id==='QA')
            ReactDOM.render(<QaBoard Selecter={ActiveFind}  LinkAction={false}/>,document.getElementById('Board_View'));
          else if (Menu.current.id==='DEVELOPERNOTE')
            ReactDOM.render(<DeveloperNoteBoard Selecter={ActiveFind}  LinkAction={false}/>,document.getElementById('Board_View'));
        }
    }
    catch(err){
      
    }
  }


useEffect(() => {
    var Data = {"NUM":props.match.params.NUM, "NOTICE_NAME":"","NOTICE_TEXT":""}
    if(props.Type === 'FreeBoard')
    {
      if(Data.NUM == 0)
        ReactDOM.render(<FreeBoard Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
      else 
        ReactDOM.render(<FreeBoard Data={Data} Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
    }
    else if(props.Type === 'NewsBoard')
    {
      if(Data.NUM == 0)
        ReactDOM.render(<NewsBoard Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
      else 
        ReactDOM.render(<NewsBoard Data={Data} Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
    }
    else if(props.Type === 'QaBoard')
    {
        if(Data.NUM == 0)
          ReactDOM.render(<QaBoard Selecter={ActiveFind}  LinkAction={true}/>,document.getElementById('Board_View'));
        else 
          ReactDOM.render(<QaBoard Data={Data} Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
    }
    else if(props.Type === 'DeveloperNoteBoard')
    {
        if(Data.NUM == 0)
          ReactDOM.render(<DeveloperNoteBoard Selecter={ActiveFind}  LinkAction={true}/>,document.getElementById('Board_View'));
        else 
          ReactDOM.render(<DeveloperNoteBoard Data={Data} Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
    }
    else
      ReactDOM.render(<FreeBoard  Selecter={ActiveFind} LinkAction={true}/>,document.getElementById('Board_View'));
  }, []); 
  return (
    <div className='Wrapper'>
      <div className='TabControl'>
          <div className='TabPage'>
            <ul className="SubNav">
            <li><a id='NewsBoard' className="" ref={News}  id="NEWS" href="#NewsBoard"  onClick={()=>ActiveCheck(News,MenuArray)}> 공지사항</a></li>
            <li><a id='DeveloperNoteBoard' className="" ref={DeveloperNote}  id="DEVELOPERNOTE" href="#DeveloperNoteBoard"  onClick={()=>ActiveCheck(DeveloperNote,MenuArray)}> 개발자노트</a></li>
            <li><a id='FreeBoard' className="TabActive" ref={Free}  id="FREE" href="#FreeBoard"  onClick={()=>ActiveCheck(Free,MenuArray)}> 자유게시판</a></li>
            <li><a id='QaBoard' className="" ref={QA}  id="QA" href="#QnA"  onClick={()=>ActiveCheck(QA,MenuArray)}> Q&A</a></li>
          </ul>
          <div id='Board_View'/>
        </div>
      </div>
    </div>
    
  );
}

export default Board;