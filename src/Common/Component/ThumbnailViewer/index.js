import React, {  createRef,useState, useEffect } from 'react';
import './style.css'

function ThumbnailViewer() {
  const [Feed,setFeed] = useState([{}]);
    const getFeed=()=>{
      fetch('http://antsnest.co.kr:4000/GetFeedPhoto',{credentials:'include'})
      .then(res => res.json())
      .then((msg) => {setFeed(msg)})
       //.then(msg=>alert(JSON.stringify(msg)))
      .catch(err=>alert(err+'오류'));
    }
  useEffect(() => {
    getFeed();
  }, []); 
  return (
    <span>
      <div className='ThumbnailViewer'>
      <div>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[0]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[0].pix_loadPath}/>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[1]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[1].pix_loadPath}/>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[2]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[2].pix_loadPath}/>
      </div>
      <div>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[3]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[3].pix_loadPath}/>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[4]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[4].pix_loadPath}/>
        <img id='NewPhotoThumbnail' width='125px' height='125px' src={Feed[5]==undefined? 'NoImage.png':'http://antsnest.co.kr:4000/ftp/FileUpload/'+Feed[5].pix_loadPath}/>
      </div>
    </div>
  </span>
  );
}

export default ThumbnailViewer;