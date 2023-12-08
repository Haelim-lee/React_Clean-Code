import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/Person';
import Home from '../../../Screen/Home/Mobile';
import Company from '../../../Screen/Company/mobile';
import Product from '../../../Screen/Product/WindowsApp/mobile';
import Community from '../../../Screen/Community/mobile';
import Help from '../../../Screen/Help';
import Portfolio from '../../../Screen/WorkRoom/Portfolio/mobile';
import Download from '../../../Screen/Download/WindowsApp/mobile';
import './MobileStyle.css';
import { Height } from '@material-ui/icons';
import { write } from 'fs';

const styles = {
    root: {
    width:"100%",
    },
    menuButton: {
    flexGrow:1,
    width:"100%",
    height:"100%",
    marginRight: "auto",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    paddingLeft:'0px',
    paddingRight:'12px',
    paddingTop:'0px',
    paddingBottom:'0px',
    display: 'flex',
    },
    menuButton: {
        flexGrow:1,
        width:"100%",
        height:"100%",
        marginRight: "auto",
        justifyContent: "flex-end",
        flexDirection: "row-reverse",
        paddingLeft:'0px',
        paddingRight:'12px',
        paddingTop:'0px',
        paddingBottom:'0px',
        display: 'flex',
        },
    Icon:{
        width:"45px",
        height:"45px",
    },
    Link:{
        width:"45px",
        height:"45px",
    }
};




class AppShell extends React.Component {
constructor(props) {
super(props);
this.state = {
toggle: false
};
}
ActiveCheck(id){
    this.handleDrawerToggle();
}
handleDrawerToggle = () => {this.setState({toggle: !this.state.toggle});}
render() {
const { classes } = this.props;
return (
<div className={classes.root}>
<AppBar className='MobileAppBar' style={{ background: '#333' }} position="static">
<IconButton className={classes.menuButton} color="inherit">
<Link to='/Login' className={classes.Link}><LoginIcon width={45} height={45} onClick={this.Login} className={classes.Icon}/></Link>
<Link className={classes.Link}><MenuIcon  width={45} height={45} onClick={this.handleDrawerToggle} className={classes.Icon}/></Link>
</IconButton>
</AppBar>
<Drawer open={this.state.toggle} className="Drawer">
<Link to='/'><MenuItem onClick={()=>this.ActiveCheck('HOME')}>홈</MenuItem></Link>
<Link to='/Company'><MenuItem onClick={()=>this.ActiveCheck('COMPANY')}>사업기획</MenuItem></Link>
<Link to='/WindowsProduct'><MenuItem onClick={()=>this.ActiveCheck('PRODUCET')}>제품설명</MenuItem></Link>
<Link to='/WindowsDown'><MenuItem onClick={()=>this.ActiveCheck('DOWNLOAD')}>다운로드</MenuItem></Link>
<Link to='/WorkRoom'><MenuItem onClick={()=>this.ActiveCheck('WORKROOM')}>작업실</MenuItem></Link>
<Link to='/Portfolio'><MenuItem onClick={()=>this.ActiveCheck('PORTPOLIO')}>포트폴리오</MenuItem></Link>
<Link to='/WBS'><MenuItem onClick={()=>this.ActiveCheck('WBS')}>일정관리</MenuItem></Link>
<Link to='/Community'><MenuItem onClick={()=>this.ActiveCheck('COMMUNITY')}>커뮤니티</MenuItem></Link>
<Link to='/Help'><MenuItem onClick={()=>this.ActiveCheck('HELP')}>고객지원</MenuItem></Link>
</Drawer>
</div>
);
}
}

export default withStyles(styles)(AppShell);