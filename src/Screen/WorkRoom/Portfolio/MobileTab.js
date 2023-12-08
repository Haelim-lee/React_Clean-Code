import React, { createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LinkDeveloperBoard from './Developer/mobile';
import LinkModelerBoard from './Modeler/moblie';
import LinkDesignBoard from './Designer/mobile';
import LinkInfraBoard from './Infra/mobile';
import LinkMediaBoard from './Media/mobile';

var CategorySearch=undefined;
function TabContorl(props){

const Developer = createRef();
const Modeler = createRef();
const Design = createRef();
const Infra = createRef();
const Media = createRef();
const MenuArray = [Developer,Modeler,Design,Infra,Media];
const ActiveCheck=(Menu)=>{
  try{
    MenuArray.map((Item,Index)=>{
      if(Item.current.className === 'TabActive')
        Item.current.className = '';
    })
      if(Menu.current.className === 'TabActive')
        Menu.current.className = '';
      else
      {
        Menu.current.className = 'TabActive';
        if(Menu.current.id==='Developer'){
          ReactDOM.render(<LinkDeveloperBoard/>,document.getElementById('Portfolio_View'));
      }
        else if (Menu.current.id==='Modeler'){
          ReactDOM.render(<LinkModelerBoard/>,document.getElementById('Portfolio_View'));
        }
        else if (Menu.current.id==='Design'){
          ReactDOM.render(<LinkDesignBoard/>,document.getElementById('Portfolio_View'));
        }
        else if (Menu.current.id==='Infra'){
          ReactDOM.render(<LinkInfraBoard/>,document.getElementById('Portfolio_View'));
        }
        else if (Menu.current.id==='Media'){
          ReactDOM.render(<LinkMediaBoard/>,document.getElementById('Portfolio_View'));
        }
      }
  }
  catch(err){
    alert(err);
  }
}


useEffect(() => {
  if(props.SelectedTab == 'Developer') ActiveCheck(Developer);
  else if(props.SelectedTab == 'Modeler') ActiveCheck(Modeler);
  else if(props.SelectedTab == 'Design') ActiveCheck(Design);
  else if(props.SelectedTab == 'Infra') ActiveCheck(Infra);
  else if(props.SelectedTab == 'Media') ActiveCheck(Media);
}, []); 

let TabPageStyle = {
  display:'flex',
  flexWrap:"wrap",
              };
let SubNavStyle = {
  display:'flex',
  margin:'0px',
  justifyContent:'space-between',
  width:'100%',
  padding:'0',
  flexWrap:"wrap",
  borderBottomStyle:'solid',
  borderBottomWidth:'1px'
};
let ListStyle = {
  display:'flex',
  listStyleType:'none',
  margin:'15px',
};
return(
    <div style={TabPageStyle}>
        <ul style = {SubNavStyle} >
            <li style={ListStyle}><a id='Developer' className="" ref={Developer} onClick={()=>ActiveCheck(Developer)}> 프로그래밍</a></li>
            <li style={ListStyle}><a id='Modeler' className="" ref={Modeler} onClick={()=>ActiveCheck(Modeler)}> 모델링</a></li>
            <li style={ListStyle}><a id='Design' className="" ref={Design}  onClick={()=>ActiveCheck(Design)}> 디자인</a></li>
            <li style={ListStyle}><a id='Infra' className="" ref={Infra}   onClick={()=>ActiveCheck(Infra)}> 인프라</a></li>
            <li style={ListStyle}><a id='Media' className="" ref={Media}   onClick={()=>ActiveCheck(Media)}> 미디어</a></li>
          </ul>
        </div>
)
}
export default TabContorl;