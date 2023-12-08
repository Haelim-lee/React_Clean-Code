import React, { createRef,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LinkDeveloperBoard from './Developer';
import LinkModelerBoard from './Modeler';
import LinkDesignBoard from './Designer';
import LinkWorkBoard from './Work';
import LinkPlanBoard from './Plan';
import LinkInfraBoard from './Infra';
import LinkMediaBoard from './Media';
import Select from '@material-ui/core/Select';

var CategorySearch=undefined;
function TabContorl(props){

const Developer = createRef();
const Modeler = createRef();
const Design = createRef();
const Infra = createRef();
const Plan = createRef();
const Work = createRef();
const Media = createRef();
const MenuArray = [Developer,Modeler,Design,Infra,Plan,Work,Media];
const [Category,setCategory] = useState(['ALL','NoData']);
var [SelecedCategory,setSelectedCategory] = useState("");
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
          getDeveloperCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkDeveloperBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
      }
        else if (Menu.current.id==='Modeler'){
          getModelerCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkModelerBoard  args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
        else if (Menu.current.id==='Design'){
          getDesignCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkDesignBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
        else if (Menu.current.id==='Infra'){
          getInfraCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkInfraBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
        else if (Menu.current.id==='Media'){
          getMediaCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkMediaBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
        else if (Menu.current.id==='Plan'){
          getPlanCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkPlanBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
        else if (Menu.current.id==='Work'){
          getWorkCategory();
          setSelectedCategory('ALL');
          ReactDOM.render(<LinkWorkBoard args={props.args} CategorySelect={CategoryRefrash} LinkAction={true}/>,document.getElementById('Board_View'));
        }
      }
  }
  catch(err){
    alert(err);
  }
}
const getDesignCategory=()=>{
  fetch('http://antsnest.co.kr:4000/DesignCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('DesignCategoryList'+err));
}
const getDeveloperCategory=()=>{
  fetch('http://antsnest.co.kr:4000/DeveloperCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
  }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('DeveloperCategoryList'+err));
}
const getInfraCategory=()=>{
  fetch('http://antsnest.co.kr:4000/InfraCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('InfraCategoryList'+err));
}
const getMediaCategory=()=>{
  fetch('http://antsnest.co.kr:4000/MediaCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('MediaCategoryList'+err));
}
const getModelerCategory=()=>{
  fetch('http://antsnest.co.kr:4000/ModelerCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('ModelerCategoryList'+err));
}
const getPlanCategory=()=>{
  fetch('http://antsnest.co.kr:4000/PlanCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('PlanCategoryList'+err));
}
const getWorkCategory=()=>{
  fetch('http://antsnest.co.kr:4000/WorkCategoryList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    }
    ).then(res => res.json())
    .then((msg) => {
      setCategory(msg);
    })
    .catch(err=>alert('WorkCategoryList'+err));
}

const CategoryRefrash = (handleSaveClick) => {
  CategorySearch = handleSaveClick;
}
const SelectedCategory=(e)=>{
  setSelectedCategory(e.target.value);
  if(CategorySearch!==undefined)
  CategorySearch(e.target.value);
}
useEffect(() => {
  if(props.SelectedTab == 'Developer') ActiveCheck(Developer);
  else if(props.SelectedTab == 'Modeler') ActiveCheck(Modeler);
  else if(props.SelectedTab == 'Design') ActiveCheck(Design);
  else if(props.SelectedTab == 'Infra') ActiveCheck(Infra);
  else if(props.SelectedTab == 'Media') ActiveCheck(Media);
  else if(props.SelectedTab == 'Plan') ActiveCheck(Plan);
  else if(props.SelectedTab == 'Work') ActiveCheck(Work);

}, []); 


return(
    <div className='TabPage'>
        <ul className="SubNavCategory" style = {{ borderStyle:'solid',borderBottomStyle:'none',borderColor:'silver', borderWidth:'1px'}} >
            <li><a id='Developer' className="" ref={Developer} onClick={()=>ActiveCheck(Developer)}> 프로그래밍</a></li>
            <li><a id='Modeler' className="" ref={Modeler} onClick={()=>ActiveCheck(Modeler)}> 모델링</a></li>
            <li><a id='Design' className="" ref={Design}  onClick={()=>ActiveCheck(Design)}> 디자인</a></li>
            <li><a id='Infra' className="" ref={Infra}   onClick={()=>ActiveCheck(Infra)}> 인프라</a></li>
            <li><a id='Media' className="" ref={Media}   onClick={()=>ActiveCheck(Media)}> 미디어</a></li>
            <li><a id='Plan' className="" ref={Plan}   onClick={()=>ActiveCheck(Plan)}> 기획/설계</a></li>
            <li><a id='Work' className="" ref={Work}   onClick={()=>ActiveCheck(Work)}> 업무일지</a></li>
            <li style={{float:'right',padding:'9px 14px'}}><Select style={{ width:"150px" }} value={SelecedCategory} defaultValue={"ALL"} type='text' onChange={SelectedCategory}>
            <option value='ALL'>ALL</option>
              {Category.map((Data,i) => (<option key={i}>{Data.NOTICE_CATEGORY}</option>))}
            </Select></li>
          </ul>
           
          <hr/>
        </div>
)
}
export default TabContorl;