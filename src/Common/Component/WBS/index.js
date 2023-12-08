import React, { createRef,useState, useEffect } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import { Redirect } from 'react-router'
import './style.css';

function WBS() {

    const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
    const [게시글,set게시글] = useState([{"컬럼1":"","컬럼2":"","컬럼3":""}]);
    const DataSubmit = () =>{
          fetch('http://antsnest.co.kr:4000/WBSTODOInsert', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include',
            body: JSON.stringify(SendData)}
            )
            .catch(err=>alert('DataInsert'+err));
      }
      const GetData = () =>{
        fetch('http://antsnest.co.kr:4000/GetWorkCalendarWBS', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            }
            ).then((res)=>res.json())
            .then(msg =>set게시글(msg))
            .catch(err=>alert('Page '+err));
        }
  useEffect(() => {
    GetData();
  }, []); 
  return (
      <div>
    <h1>일정관리 [WBS시스템]</h1>
    <div style={{textAlign:'center', display:'inline-flex', justifyContent:'center'}} className='ToolBox'>
      <table width='100%'>
        <tbody>
          <tr><td><label style={{alignSelf:'center',fontSize:'22pt'}}>제목 </label></td><td style={{width:'90%'}}><input style={{width:'100%',height:'32px', alignSelf:'center'}}  id='titleInput' className='일정명' type='text' onChange={(ev)=>setSendData({...SendData,title:ev.target.value})}/></td></tr>
          <tr><td><label style={{alignSelf:'center',fontSize:'22pt'}}>내용 </label></td><td style={{width:'90%'}}><textarea style={{width:'100%',height:'120px', alignSelf:'center'}} id='titleInput'  value={SendData.contents}  className='일정명' type='text' onChange={(ev)=>setSendData({...SendData,contents:ev.target.value})}/></td></tr>
          <tr><td colSpan='3'><button style={{width:'100%',height:'32px', alignSelf:'center'}}  onClick={DataSubmit}>일 정 추 가</button></td></tr>
        </tbody>
      </table>
        
    </div>
        <div className='MasterLayout'>
        <div style={{overflow:'Hidden'}} className='Plan'>TODO LIST
        <table>
          <tbody>
        {게시글.map((Data,i) => (
            <tr key={i}>
              <td style={{borderStyle:'solid' , borderWidth:'1px'}}><div align='center'>{Data.WBS_TODO_TITLE}</div></td>
              <td style={{borderStyle:'solid' , borderWidth:'1px'}}><div align='center'>{Data.WBS_TODO_SUBJECT}</div></td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
        <div className='Calendar'>달력</div>
    </div>
 </div>
  );
}
export default WBS;
