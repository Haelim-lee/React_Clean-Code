import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';

import { Redirect } from 'react-router'
import './style.css';

function MyInfoUpdate(props) {
     useEffect(() => {
     
    }, []); 
     
    const [LoginData,setLoginData] = useState({"UserId":"","UserPw":"","UserCheckPw":"","UserEmail":"","Gender":"1"});
    const [radio, setRadio] = useState('1');
    const [Session,setSession] = useState({});
    const onChangeHandler = (e) => {
        LoginData.Gender = e.target.value;
        setRadio(e.target.value);
    }

    useEffect(() => {
      
    }, []); 

    return(
        <div id='JoinPopupView'>
      <span id='UserInfoLayout'>
          <form>
              <h1>회원정보수정</h1>
              {/* <img src={MyLogo}/> */}
              <hr/>
              <label htmlFor="email"><b>E-Mail</b> 
              <input type='text' className='Email' value={LoginData.UserEmail }  placeholder={'이메일 주소'} required onChange={(ev)=>setLoginData({...LoginData,UserEmail:ev.target.value})}/>
              </label>
              <label htmlFor="psw"><b>Password</b></label>
                <input type='password' className='AccountPassword' value={LoginData.UserPw }  required placeholder={'비밀번호'} onChange={(ev)=>setLoginData({...LoginData,UserPw:ev.target.value})}/>
                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input type='password' className='AccountCheckPassword' value={LoginData.UserCheckPw }  required placeholder={'비밀번호확인'} onChange={(ev)=>setLoginData({...LoginData,UserCheckPw:ev.target.value})}/>
              <hr/>
              <label htmlFor="email"><b>이름</b> 
              <input type='text' className='UserName' value={LoginData.UserName }  placeholder={'이름'} required onChange={(ev)=>setLoginData({...LoginData,UserName:ev.target.value})}/></label>
              <label htmlFor="email"><b>생년월일</b> 
              <input type='text' className='BirthDay' value={LoginData.UserBirthDay}  placeholder={'생년월일'} required onChange={(ev)=>setLoginData({...LoginData,UserBirthDay:ev.target.value})}/></label>
              <label htmlFor="email"><b>주소</b> <input type="text" placeholder="주소" name="psw" required/></label>
              <label htmlFor="email"><b>연락처</b> <input type="text" placeholder="010-0000-0000" name="psw" required/></label>
              <label htmlFor="Gender"><b>성별</b> 
              <div className='RadioGroup'><span><input type='radio' checked={radio === '1' ? true : false } name='남자' value='1' onChange={(e)=>onChangeHandler(e)}></input><label>남자</label></span><span><input type='radio' checked= {radio === '2' ? true : false }  name='여자' value='2' onChange={(e)=>onChangeHandler(e)}></input><label>여자</label></span></div>
              </label>
              <div className="clearfix">
                <button type="button" className="signupbtn">정보수정</button>
              </div>
          </form>
      </span>
  </div>

    );
}

export default MyInfoUpdate;