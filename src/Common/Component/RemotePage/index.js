import React, {  createRef,useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
function RemotePage() {
  const [Text,setText] =useState();

  const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
  };

  const rteChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
	}
  useEffect(() => {

  }, []); 
  return (
      <div className='Wrapper'>
       <ReactQuill modules={modules}  onChange={rteChange} />
    </div>
  );
}

export default RemotePage;