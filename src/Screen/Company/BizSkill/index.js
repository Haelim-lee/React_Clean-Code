import React, { createRef } from 'react';
import Imgb1 from '../../../image/ImageSkill.gif';
import '../../style.css';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';

function BizSkill() {
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
let BizMemberTitle={
  padding: "2px",
  textAlign: "center",
  backgroundColor: "#474e5d",
  color: "white"

}
  return (
  <div className='TabControl'>
          <div className='TabPageBig'>
            <ul className="SubNavLeft">
            <li><Link to="/Company" ref={BizPlan}  id='BizPlan' onClick={()=>ActiveCheck(BizPlan,MenuArray)}> 사업계획 </Link></li>
            <li><Link to='/BizSkill' ref={BizSkill}  id="BizSkill"  className="TabActive" onClick={()=>ActiveCheck(BizSkill,MenuArray)}>기술이력 </Link></li>
            <li><Link to="/BizMember" ref={BizMember}  id='BizMember' onClick={()=>ActiveCheck(BizMember,MenuArray)}> 구성원</Link></li>
          </ul>
          <div style={{display:'flex',flexDirection:'column',width:'100%'}} className='BizSkillMasterPanel'>
          <div style={BizMemberTitle} >
            기술이력<br/>
          </div>
                <h1 style={{textAlign: 'left',paddingLeft: '20px',marginBottom:'1px'}}>Develpoer</h1>
              <ul style={{textAlign:'left'}}>
                <li>Java Spring Boot Backend</li>
                <li>.net Console Server</li>
                <li>Winform .Wpf,React Frontend</li>
                <li>Web Flux Reactor </li>
                <li>Asp.net Core Blazor </li>
          
              </ul>
                  <h1 style={{textAlign: 'left',paddingLeft: '20px',marginBottom:'1px'}}>Graphic</h1>
                  <ul style={{textAlign:'left'}}>
                <li>Photoshop</li>
                <li>3D Max </li>
                <li>Blander </li>
                <li>SubstancePainter </li>
              </ul>
                  <h1 style={{textAlign: 'left',paddingLeft: '20px',marginBottom:'1px'}}>DataBase</h1>
                  <ul style={{textAlign:'left'}}>
                <li>Oracle</li>
                <li>Ms-Sql </li>
                <li>MariaDB </li>
                <li>Postgsql </li>
              </ul>
                  <br/><br/><br/><br/><br/>
          </div>
        </div>
      </div>
  );
}

export default BizSkill;
