import { useEffect} from 'react';
import DefaultImg1 from '../../../image/CompanyIntro1.jpg'
import DefaultImg2 from '../../../image/CompanyIntro2.jpg'
import DefaultImg3 from '../../../image/CompanyIntro3.jpg'
import DefaultImg4 from '../../../image/CompanyIntro4.jpg'
import DefaultImg5 from '../../../image/CompanyIntro5.jpg'
import DefaultImg6 from '../../../image/CompanyIntro6.jpg'
import './style.css';


function SlideShowGallery() {
      useEffect(() => { // 폼로드와 비슷한 개념
        slideIndex=1;
        showSlides(slideIndex);
      }, []); 
      let slideIndex = 1;
    
 
    let showSlides=(n)=> {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("GalleryActive", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += "GalleryActive";
    captionText.innerHTML = dots[slideIndex-1].alt;
    }
    // Next/previous controls
    let plusSlides=(n)=> {
        showSlides(slideIndex += n);
    }
    let currentSlide=(n)=> {
        showSlides(slideIndex = n);
    }

    return (
  <div className="GalleryContainer">

  <div className="mySlides">
    <div className="numbertext">1 / 6</div>
      <img src={DefaultImg1}/>
  </div>

  <div className="mySlides">
    <div className="numbertext">2 / 6</div>
      <img src={DefaultImg2}/>
  </div>

  <div className="mySlides">
    <div className="numbertext">3 / 6</div>
      <img src={DefaultImg3}/>
  </div>

  <div className="mySlides">
    <div className="numbertext">4 / 6</div>
      <img src={DefaultImg4}/>
  </div>

  <div className="mySlides">
    <div className="numbertext">5 / 6</div>
      <img src={DefaultImg5}/>
  </div>

  <div className="mySlides">
    <div className="numbertext">6 / 6</div>
      <img src={DefaultImg6}/>
  </div>

  <a className="prev" onClick={()=>plusSlides(-1)}>&#10094;</a>
  <a className="next" onClick={()=>plusSlides(1)}>&#10095;</a>

  <div className="caption-container">
    <span id="caption"></span>
  </div>

  <div className="row">
    <div className="column">
      <img className="demo cursor" src={DefaultImg1}  onClick={()=>currentSlide(1)} alt="사업기획"/>
    </div>
    <div className="column">
      <img className="demo cursor" src={DefaultImg2}  onClick={()=>currentSlide(2)} alt="개요"/>
    </div>
    <div className="column">
      <img className="demo cursor" src={DefaultImg3}  onClick={()=>currentSlide(3)} alt="AI 홀로그램 결합"/>
    </div>
    <div className="column">
      <img className="demo cursor" src={DefaultImg4} onClick={()=>currentSlide(4)} alt="생각정리툴"/>
    </div>
    <div className="column">
      <img className="demo cursor" src={DefaultImg5}  onClick={()=>currentSlide(5)} alt="VR/AR 시뮬레이션 교육"/>
    </div>
    <div className="column">
      <img className="demo cursor" src={DefaultImg6} onClick={()=>currentSlide(6)} alt="앤츠 스토어"/>
    </div>
  </div>
</div>
    );
}
  
  export default SlideShowGallery;