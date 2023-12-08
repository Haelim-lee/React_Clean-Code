import session from 'express-session';
import React, {  createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import HtmlEditer from '../../../../Common/Component/HtmlEditer';
import './style.css';

function WriteMode(props){
    const [Session,setSession] = useState({});
    const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
    const [Category,setCategory] = useState(['ALL','NoData']);
    const [CategoryValue,setCategoryValue] =  useState(props.Data===undefined?'ALL':props.Data.NOTICE_CATEGORY);
    const [IsPublicValue,setIsPublicValue] =  useState(props.Data===undefined? '공개' :props.Data.Public===1? '공개':'비공개');
    useEffect(() => { // 폼로드와 비슷한 개념
      getCategory();
      CreateSession();
      if(props.Data != undefined){
        setSendData({...SendData,title:props.Data.NOTICE_TITLE,Category:props.Data.NOTICE_CATEGORY,contents:props.Data.NOTICE_CONTENTS,PUBLIC:props.Data.PUBLIC});
      }
    }, []); 

    const CreateSession=()=>{
        fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
        .then(res => res.json())
        .then((msg) => {setSession(msg)})
        .catch(err=>alert(err+'오류'));
      }

    const Link =()=> {
        ReactDOM.render(<div/>,document.getElementById('Board_Contents'));
        document.getElementById('Board_Contents').setAttribute('class','Contents_Deactive');
        };

    const DataSubmit = (SendData) =>{
      if(props.Data === undefined)
        fetch('http://antsnest.co.kr:4000/InsertPlanBoard', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          credentials:'include',
          body: JSON.stringify(SendData)}
          ).then(props.Refrash)
          .then(Link).catch(err=>alert('DataInsert'+err));
        else
          fetch('http://antsnest.co.kr:4000/UpdatePlanBoard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(SendData)}
            ).then(props.Refrash).then(Link).catch(err=>alert('UpdateItem'+err));
    }
    const getCategory=()=>{
      fetch('http://antsnest.co.kr:4000/PlanCategoryList', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(SendData)}
        ).then(res => res.json())
        .then((msg) => {
          setCategory(msg);
          setCategoryValue(msg[0].NOTICE_CATEGORY);
          setSendData({...SendData,Category:msg[0].NOTICE_CATEGORY});
        })
        .catch(err=>alert('PlanCategoryList'+err));
    }
    const onChangeCategoryAction=(e)=>{
      setCategoryValue(e.target.value); 
      setSendData({...SendData,Category:e.target.value});
    }
    return(
      <div>
      <div>
      <table style={{display:'flex', justifyContent:'center'}}>
          <tbody>
            <tr>
              <td id="WriteCondition" style={{display:'flex'}}> 
                <label>작성자 </label> 
              <input className='작성자_입력기' type='text' value={Session.UserId == undefined ? SendData.name: Session.Name}  onChange={(ev)=>setSendData({...SendData,name:ev.target.value})}></input> 
              <label style={{paddingLeft:'10px'}}>카테고리 </label>
              <select value={CategoryValue} onChange={(e)=>setCategoryValue(e.target.value)} type='text'>
                {Category.map((Data,i) => (<option key={i}>{Data.NOTICE_CATEGORY}</option>))}
              </select>
              <label style={{paddingLeft:'10px'}}>공개여부 </label>
                  <select value={IsPublicValue} onChange={(ev)=>setIsPublicValue(ev.target.value)}  type='text'>
                    <option>공개</option>
                    <option>비공개</option>
                  </select>
              </td>
            </tr>
          </tbody>
          </table>
            <div id='EditerBox' style={{minHeight:'300px'}}>
            <HtmlEditer Submit={DataSubmit} setData={setSendData} Data={props.Data} SelectCategory={CategoryValue} Public={IsPublicValue}/>
        </div>
      </div>
  </div>
  )
}


export default WriteMode;