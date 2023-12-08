import React, {  createRef,useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

function TextEditer(props) {
const [TextEditerTitle,setTextEditerTitle] = useState('');
const [TextEditerContents,setTextEditerContents] = useState('');
const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});

const OnTextTitleChanged = (ev)=>{
  setSendData({...SendData,title:ev.target.value})
  setTextEditerTitle(ev.target.value);
}
const OnTextContentsChanged = (ev)=>{
  setSendData({...SendData,contents:ev.target.value});
  setTextEditerContents(ev.target.value);
}

  return (<div>
          <hr align='center'  size='1' width='80%' color='black'/>
          <p>제목 <input className='내용_입력기' type='text' value={TextEditerTitle} onChange={OnTextTitleChanged}></input> </p>
          <textarea className='본문입력기' value={TextEditerContents} onChange={OnTextContentsChanged} ></textarea>
          <p><button onClick={()=>props.Submit(SendData)}>작성완료</button></p>
          </div>
        );
      }
export default TextEditer;