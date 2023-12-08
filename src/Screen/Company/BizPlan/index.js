import React,{createRef} from 'react';
import Img1 from '../../../image/CompanyIntro1.jpg';
import Img2 from '../../../image/CompanyIntro2.jpg';
import Img3 from '../../../image/CompanyIntro3.jpg';
import Img4 from '../../../image/CompanyIntro4.jpg';
import Img5 from '../../../image/CompanyIntro5.jpg';
import Img6 from '../../../image/CompanyIntro6.jpg';
import Img7 from '../../../image/CompanyIntro7.jpg';
import Img8 from '../../../image/CompanyIntro8.jpg';
import Img9 from '../../../image/CompanyIntro9.jpg';
import Img10 from '../../../image/CompanyIntro10.jpg';
import Img11 from '../../../image/CompanyIntro11.jpg';
import '../../style.css';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';





function COMPANY() {
  const BizPlan = createRef();
  const BizMember = createRef();
  const BizSkill = createRef();
const MenuArray = [BizPlan,BizMember,BizSkill];
const ActiveCheck=(Menu,MenuArray)=>{
try{
  MenuArray.map((Item,Index)=>{
    if(Item.current.className === 'TabActive')
      Item.current.className = '';
  })
    if(Menu.current.className === 'TabActive')
      Menu.current.className = '';
    else
      Menu.current.className = 'TabActive';
}
catch(err){
  
}
}
  return (
    <div className='Wrapper'>
<div className='TabControl'>
          <div className='TabPageBig'>
            <ul className="SubNavLeft">
            <li><Link to="/Company" ref={BizPlan} id='BizPlan' className="TabActive" onClick={()=>ActiveCheck(BizPlan,MenuArray)}> 사업계획 </Link></li>
            <li><Link to='/BizSkill' ref={BizSkill} id="BizSkill"  className="" onClick={()=>ActiveCheck(BizSkill,MenuArray)}>기술이력 </Link></li>
            <li><Link to="/BizMember" ref={BizMember}  id='BizMember' className="" onClick={()=>ActiveCheck(BizMember,MenuArray)}> 구성원</Link></li>
          </ul>
          <div className='CompanyMasterPanel'>
            <img width='1024px' src={Img1}></img>
            <img width='1024px' src={Img2}></img>
            <img width='1024px' src={Img3}></img>
            <img width='1024px' src={Img4}></img>
            <img width='1024px' src={Img5}></img>
            <img width='1024px' src={Img6}></img>
            <img width='1024px' src={Img7}></img>
            <img width='1024px' src={Img8}></img>
            <img width='1024px' src={Img9}></img>
            <img width='1024px' src={Img10}></img>
            <img width='1024px' src={Img11}></img>
        </div>
        </div>
      </div>
    </div>
  );
}

export default COMPANY;
