import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import {IconButton, Collapse} from "@material-ui/core";
// import { Sliders, Zap } from "react-feather";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom"
import {initProducts} from '../../store/actions/storeFront';
import { MoonLoader } from "react-spinners";
// import { BiCustomize, BiCabinet } from "react-icons/bi";
import { BsDot } from "react-icons/bs"; 
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
// import { MdComputer } from "react-icons/md";
import axios from "axios";
import './sidebar.css';
import Config from '../../store/Config';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 function Sidebar(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [pcparts, setPcparts] = React.useState([]);
  const handleClick = () =>{
    setCategoryLoading(true);
    setOpen(!open)
    axios.get('/productSpecification/category')
    .then(res => {
      const subcategoryData = res.data.allCategory.filter(category => {
        return category.category !== 'Prebuild' && category.category !== 'Laptop'
      })
      setPcparts(subcategoryData)
      setCategoryLoading(false);
    })
    .catch(error => {
      setCategoryLoading(false);
    })  
  };

  const handleNavigate = (category) => {
    if(category === 'prebuild'){
      dispatch(initProducts(1, category))
      setState({  'top': false });
      return props.history.push({
        pathname: '/Prebuilds'
      })
    }
    if(category === 'laptop'){
      dispatch(initProducts(1, category))
      setState({  'top': false });
      return props.history.push({
        pathname: '/laptops'
      })
    } 
    else {
      dispatch(initProducts(1, category))
      setState({  'top': false });
      return props.history.push({
        pathname: `/pcparts/${category}`
      })
    }   
  }

  const handleNavigate2 = (cat) => {
    setState({  'top': false });
    if(cat === 'customize'){
      props.history.push('/customizeyourself')
    }else {
      props.history.push('/suggestme')
    }
  }

  const handleAbout = () => {
    setState({  'top': false });
    props.history.push('/about')
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
          <Link to="/">
            <ListItem onClick={()=>setState({  'top': false })} className="head-title">
              {/* <p style={{marginTop:10, fontSize:15}}>CHALLENGER COMPUTERS</p> */}
              <div style={{display:'flex', alignItems:'center'}}>
              <img height="65" src={require('../../assets/CCLOGO.png')} alt={Config.challengers__title}/>
              <p style={{marginTop:10, fontSize:14, fontWeight:'bold'}}>CHALLENGER COMPUTERS</p>
              </div>
            </ListItem>
          </Link>
      </List>
      <hr style={{background: '#747474',marginTop: '-5px'}}/>
      <List style={{marginTop:-10}}>
        <ListItem  onClick={()=>handleNavigate('prebuild')} button>
          <div style={{display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><BiCabinet/></p> */}
            <p style={{marginLeft:15, fontSize:16, marginBottom:5}}>Prebuilds</p>
          </div>
        </ListItem>
      </List>
      <List style={{marginTop:-10}}>
        <ListItem  onClick={()=>handleNavigate('laptop')} button>
          <div style={{display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><MdComputer/></p> */}
            <p style={{marginLeft:15,fontSize:16, marginBottom:5}}>Laptops</p>
          </div>
        </ListItem>
      </List>
      <List style={{marginTop:-10}}>
        <ListItem  onClick={()=>handleNavigate2('customize')} button>
          <div style={{display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><Sliders/></p> */}
            <p style={{marginLeft:15,fontSize:16, marginBottom:5}}>Customize Yourself</p>
          </div>
        </ListItem>
      </List>
      <List style={{marginTop:-10}}>
        <ListItem  onClick={()=>handleNavigate2('suggest')} button>
          <div style={{display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><Zap/></p> */}
            <p style={{marginLeft:15, fontSize:16, marginBottom:5}}>Suggest Me</p>
          </div>
        </ListItem>
      </List>
      <List style={{marginTop:-10}}>
          <ListItem  onClick={handleClick} button>
          <div style={{marginLeft:13, display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><BiCustomize/></p> */}
            <p style={{fontSize:16, marginBottom:5}}>Peripherals {open ? <FaMinus style={{marginRight:8, marginLeft:80, marginTop:-3}}/> : <FaPlus style={{marginRight:8, marginLeft:80, marginTop:-3}}/>}</p>
          </div> 
          </ListItem> 
          <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            { categoryLoading ?
            <div style={{textAlign:'center', marginLeft:100}}><MoonLoader size={30} color={'white'}/></div> :
              pcparts.map((parts, index) => {
              return <ListItem style={{marginBottom:-10}} onClick={()=>handleNavigate(parts.category)} key={index} button>
                <div style={{display:'flex', width:'100%', alignItems:'center'}}>
                <p style={{marginLeft:25, fontSize:20}}><BsDot size={25}/></p>
                <p style={{marginLeft:5,fontSize:16}}>{parts.category}</p>
              </div> 
              </ListItem>
              })
            }
           </List>
         </Collapse>
      </List>
      <List style={{marginTop:-10}}>
        <ListItem  onClick={handleAbout} button>
          <div style={{display:'flex', width:'100%'}}>
            {/* <p style={{marginLeft:25, fontSize:22}}><FiUserCheck/></p> */}
            <p style={{marginLeft:15,fontSize:16, marginBottom:5}}>About us</p>
          </div>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'>
              <MenuIcon />
            </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default withRouter(Sidebar);