import React, { createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LinkDeveloperBoard from './Developer';
import LinkModelerBoard from './Modeler';
import LinkDesignBoard from './Designer';
import LinkInfraBoard from './Infra';
import LinkMediaBoard from './Media';
import Select from '@material-ui/core/Select';


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
        if(Menu.current.id==='Developer')
          ReactDOM.render(<LinkDeveloperBoard LinkAction={true}/>,document.getElementById('Portfolio_View'));
        else if (Menu.current.id==='Modeler')
          ReactDOM.render(<LinkModelerBoard  LinkAction={true}/>,document.getElementById('Portfolio_View'));
        else if (Menu.current.id==='Design')
          ReactDOM.render(<LinkDesignBoard LinkAction={true}/>,document.getElementById('Portfolio_View'));
        else if (Menu.current.id==='Infra')
          ReactDOM.render(<LinkInfraBoard LinkAction={true}/>,document.getElementById('Portfolio_View'));
        else if (Menu.current.id==='Media')
          ReactDOM.render(<LinkMediaBoard LinkAction={true}/>,document.getElementById('Portfolio_View'));
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
return(
<div className='TabPage'>
        <ul style = {{width:'1024px', borderStyle:'solid',borderBottomStyle:'none',borderColor:'silver', borderWidth:'1px'}} className="SubNav">
            <li><a id='Developer' className="" ref={Developer} onClick={()=>ActiveCheck(Developer)}> 프로그래밍</a></li>
            <li><a id='Modeler' className="" ref={Modeler} onClick={()=>ActiveCheck(Modeler)}> 모델링</a></li>
            <li><a id='Design' className="" ref={Design}  onClick={()=>ActiveCheck(Design)}> 디자인</a></li>
            <li><a id='Infra' className="" ref={Infra}   onClick={()=>ActiveCheck(Infra)}> 인프라</a></li>
            <li><a id='Media' className="" ref={Media}   onClick={()=>ActiveCheck(Media)}> 미디어</a></li>
            <li style={{float:'right',padding:'9px 14px'}}>
              <Select style={{width:'150px'}} defaultValue={"ALL"}>
                <option value="ALL">ALL</option>
                <option value="C#">C#</option>
                <option value="JAVA">JAVA</option>
              </Select>
            </li>
          </ul>
        </div>
)
}
export default TabContorl;