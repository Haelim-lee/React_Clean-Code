import React, {  createRef,useState, useRef,useEffect,useMemo } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

function HtmlEditer(props) {
  const [TextEditerTitle,setTextEditerTitle] = useState('');
  const [SendData,setSendData] = useState({"num":"", "id":"", "name":"", "title":"", "contents":""});
  const quillRef = useRef();

  useEffect(() => { // 폼로드와 비슷한 개념
    if(props.Data != undefined){
      setSendData({...SendData,num:props.Data.NUM,title:props.Data.NOTICE_TITLE,category:props.Data.NOTICE_CATEGORY,contents:props.Data.NOTICE_CONTENTS,PUBLIC:props.Data.PUBLIC});
      setTextEditerTitle(props.Data.NOTICE_TITLE);
    }
  }, []); 
  useEffect(() => { // 폼로드와 비슷한 개념
    if(props.Data != undefined){
      setSendData({...SendData,num:props.Data.NUM,title:props.Data.NOTICE_TITLE,category:props.SelectCategory,contents:props.Data.NOTICE_CONTENTS,PUBLIC:props.Public});
      setTextEditerTitle(props.Data.NOTICE_TITLE);
    }
    else{
      setSendData({...SendData,category:props.SelectCategory,PUBLIC:props.Public});
    }
  }, [props.SelectCategory,props.Public]); 

const OnTextTitleChanged = (ev)=>{
  setSendData({...SendData,title:ev.target.value})
  setTextEditerTitle(ev.target.value);
}

const imageHandler =()=>{
  console.log('이미지');
  const quill = quillRef.current.getEditor();
  //const range = quill.getSelection();
  const input = document.createElement("input");
    
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    
    input.onchange = async () => {
      const formData = new FormData();
      const file = input.files[0];
      formData.append("img", file); // 위에서 만든 폼데이터에 이미지 추가
          let SessionData = await new Promise(function(resolve) {
            fetch('http://antsnest.co.kr:4000/AttachFileUpload', {
              method: 'POST',
              mode: 'cors',
              credentials:'include',
              body: formData,
            }).then((res)=>res.json())
          .then((res)=>{
            resolve(res);
            const range = quill.getSelection()?.index; 
            //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.
            if (typeof (range) !== "number") return;
            /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
            따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/
            quill.setSelection(range, 1);
            /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
            위치 인덱스와 길이를 넣어주면 된다.*/
            let url = "";
            url = 'http://antsnest.co.kr:4000/ftp/AttachFile/'+res.filename;
            quill.clipboard.dangerouslyPasteHTML(range,`<img src=${url} alt="image" />`);
            
          })
          .catch(err=>alert(err+'오류'))
          });
       }



    
}
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline','clean'],
        ['image', 'code-block'],
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [])
  const rteChange = (content, delta, source, editor) => {
      var Text=editor.getHTML();
    setSendData({...SendData , contents:Text});
	}



  return (
    <div>
          <div>
            <p>제목 <input className='내용_입력기' type='text' value={TextEditerTitle} onChange={OnTextTitleChanged}></input> </p>
            <ReactQuill ref={quillRef} modules={modules} 
            placeholder={'글을 입니다.'}
            onChange={rteChange} 
            defaultValue={props.Data===undefined?'':props.Data.NOTICE_CONTENTS}
            />
          </div>
          <button onClick={()=>props.Submit(SendData)}>작성완료</button>
      </div>
  );
}

export default HtmlEditer;