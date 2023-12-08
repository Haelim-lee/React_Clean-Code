import React, { createRef, useState ,useEffect} from 'react';
import ReactDOM from 'react-dom';
import MyLogo from '../../../image/MyLogo.png';
import './style.css'

function ActionLink(NavId){
if(NavId=='id')
    ReactDOM.render(<FindIdView/>, document.getElementById('FindMemberInfoView'));
else
    ReactDOM.render(<FindPwView/>, document.getElementById('FindMemberInfoView'));
}

function FindIdView(){
    const [SendData,setSendData] = useState({"UserName":"","UserEmail":""});
    const FindId= async()=>{
        let 리턴데이터 = await new Promise(function(resolve) {
        fetch('http://antsnest.co.kr:4000/MemberFindId', {method: 'POST', mode: 'cors', credentials:'include', headers: { 'Content-Type': 'application/json' } , body: JSON.stringify(SendData)})
        .then((res)=>res.json())
        .then(Param=>resolve(Param))
        .catch(err=>alert('아이디 찾기 '+err));
        });
        ReactDOM.render(<span>
          아이디 : {리턴데이터[0].USER_ID}
        </span>, document.getElementById('아이디'));
      }
    return(
    <p align='center'>
    <div className='TabPageBig'>
      <ul className="SubNavLeft">
      <li><a id='FindId' className="TabActive" onClick={()=>ActionLink('id')}> 아이디 찾기</a></li>
      <li><a id='FindPw' className="" onClick={()=>ActionLink('pw')}>비밀번호 찾기</a></li>
    </ul>
    <table>
        <tr>
            <td><img src={MyLogo}/></td>
                <ul>
                    <li><input type='text' className ='User' placeholder={'이메일 주소'} onChange={(ev)=>setSendData({...SendData,UserEmail:ev.target.value})}/> </li>
                    <li><input type='text' className='UserName'  placeholder={'이름'} onChange={(ev)=>setSendData({...SendData,UserName:ev.target.value})}/></li>
                    <li><button className='LoginButton'  onClick={()=>FindId()}>아이디 찾기</button></li>
                </ul>
                <div id='아이디'></div>
          </tr>
      </table>
    </div>
    </p>
    );
}

var CertificationKey ='';
function ShowChangePassword(){
  const [ResetData,setResetData] = useState({"UserPw":"","UserPwCheck":"","CertKey":"","UserId":""});
  const PasswordUpdate= async()=>{
    let 리턴데이터 = await new Promise(function(resolve) {
    fetch('http://antsnest.co.kr:4000/MemberPwUpdate', {method: 'POST', mode: 'cors', credentials:'include', headers: { 'Content-Type': 'application/json' } , body: JSON.stringify(ResetData)})
    .then((res)=>res.json())
    .then(Param=>resolve(Param))
    .catch(err=>alert('비밀번호 변경 실패 '+err));
    });}
  const ChangePassword=()=>{
    if(CertificationKey === ResetData.CertKey && ResetData.UserPw === ResetData.UserPwCheck)
    {
      PasswordUpdate();
    }
    else{
      alert('인증번호가 틀립니다.');
    }
  }
  return(
  <ul>
  <li>인증번호 : <input type='password' value={ResetData.CertKey} className = 'CertificationKey' placeholder={'인증번호'} onChange={(ev)=>setResetData({...ResetData,CertKey:ev.target.value})}/></li>
  <li>아이디 : <input type='text' className = 'User' placeholder={'아이디'} onChange={(ev)=>setResetData({...ResetData,UserId:ev.target.value})}/> </li>
  <li>변경할 비밀번호 : <input type='password'  value={ResetData.UserPw} className = 'CertificationKey' placeholder={'변경할 비밀번호'} onChange={(ev)=>setResetData({...ResetData,UserPw:ev.target.value})}/></li>
  <li>비밀번호 확인 : <input type='password' value={ResetData.UserPwCheck} className = 'CertificationKey' placeholder={'비밀번호 확인'} onChange={(ev)=>setResetData({...ResetData,UserPwCheck:ev.target.value})}/></li>
  <li><button className='LoginButton' onClick={()=>ChangePassword()}>비밀번호 변경</button></li>
</ul>
)}
function FindPwView(){
    const [SendData,setSendData] = useState({"UserId":"","UserEmail":""});
    const Certification= async()=>{
        let 리턴데이터 = await new Promise(function(resolve) {
        fetch('http://antsnest.co.kr:4000/MemberFindPw', {method: 'POST', mode: 'cors', credentials:'include', headers: { 'Content-Type': 'application/json' } , body: JSON.stringify(SendData)})
        .then((res)=>res.json())
        .then(Param=>resolve(Param))
        .catch(err=>alert('인증번호 전송 실패 '+err));
        });
        CertificationKey = 리턴데이터.Key;
        ReactDOM.render(<ShowChangePassword/>, document.getElementById('인증번호'));
      }
    
    return(
    <p align='center'>
    <div className='TabPageBig'>
      <ul className="SubNavLeft">
      <li><a id='FindId' className="" onClick={()=>ActionLink('id')}> 아이디 찾기</a></li>
      <li><a id='FindPw' className="TabActive" onClick={()=>ActionLink('pw')}>비밀번호 찾기</a></li>
    </ul>
    <table>
        <tr>
            <td><img src={MyLogo}/></td>
                <ul>
                    <li><input type='text' className='UserName'  placeholder={'이메일 주소'} onChange={(ev)=>setSendData({...SendData,UserEmail:ev.target.value})}/></li>
                    
                    <li><button className='LoginButton' onClick={()=>Certification()}>비밀번호 찾기</button></li>
                </ul>
                <div id='인증번호'></div>
          </tr>
      </table>
    </div>
    </p>
        );
}

function FindMemberInfo() {
    useEffect(() => { // 폼로드와 비슷한 개념
        ActionLink('id');
      }, []); 

      return (<div id ='FindMemberInfoView'></div>);
    }
  export default FindMemberInfo;
