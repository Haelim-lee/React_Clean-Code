import React, { createRef, useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import { Redirect } from 'react-router'
import ReactDOM from 'react-dom';

import MyLogo from '../../../image/MyLogo.png';


var JoinOk=false;
function MemberJoin(props) {
 
    const [LoginData,setLoginData] = useState({"UserId":"","UserPw":"","UserCheckPw":"","UserEmail":"","Gender":"1"});
    const [radio, setRadio] = useState('1');
    const [Session,setSession] = useState({});
    const onChangeHandler = (e) => {
        LoginData.Gender = e.target.value;
        setRadio(e.target.value);
    }
    const CreateSession=()=>{
      fetch('http://antsnest.co.kr:4000/CreateSession',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setSession(msg)})
      .catch(err=>alert(err+'오류'));
    }
    const Join=(Data)=>{
        fetch('http://antsnest.co.kr:4000/Join', {
          method: 'POST',
          mode: 'cors',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Data)}
          ).then((res)=>res.json())
          .then(JoinOk = true)
          .then(()=>CreateSession())
          .catch(err=>alert('Page 회원가입 오류'+err));
    }
    useEffect(() => {
      JoinOk=false;
    }, []); 
      return (
        <div className='Wrapper'>
        <div className='MyInfoBox'>
        <table className='LoginTable'>
          {JoinOk ==false ?'':<Redirect to='/'/>}
            <tr>
                <td><img src={MyLogo}/>
                    <li><input type='text' className = 'User' value={LoginData.UserId}  placeholder={'아이디'} onChange={(ev)=>setLoginData({...LoginData,UserId:ev.target.value})}/> </li>
                    <li><input type='password' className='Password' value={LoginData.UserPw }  placeholder={'비밀번호'} onChange={(ev)=>setLoginData({...LoginData,UserPw:ev.target.value})}/></li>
                    <li><input type='password' className='CheckPassword' value={LoginData.UserCheckPw }  placeholder={'비밀번호확인'} onChange={(ev)=>setLoginData({...LoginData,UserCheckPw:ev.target.value})}/></li>
                    <li><input type='text' className='UserName' value={LoginData.UserName }  placeholder={'이름'} onChange={(ev)=>setLoginData({...LoginData,UserName:ev.target.value})}/></li>
                    <li><input type='text' className='BirthDay' value={LoginData.UserBirthDay}  placeholder={'생년월일'} onChange={(ev)=>setLoginData({...LoginData,UserBirthDay:ev.target.value})}/></li>
                    <li><input type='text' className='Email' value={LoginData.UserEmail }  placeholder={'이메일 주소'} onChange={(ev)=>setLoginData({...LoginData,UserEmail:ev.target.value})}/></li>
                    <li><input type='radio' checked={radio === '1' ? true : false } name='남자' value='1' onChange={(e)=>onChangeHandler(e)}></input><label>남자</label><input type='radio' checked= {radio === '2' ? true : false }  name='여자' value='2' onChange={(e)=>onChangeHandler(e)}></input><label>여자</label></li>
                    <li><button className='LoginButton' onClick={()=>Join(LoginData)}>회원가입</button></li>
                </td>
              </tr>
          </table>
          </div>
          </div>
      );
    }
  
  
    
  export default MemberJoin;
