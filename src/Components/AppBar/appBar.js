import React, {useEffect} from "react";
import axios from 'axios';
import { Link, withRouter } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import { Container, Modal, Button } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import {fade, makeStyles} from "@material-ui/core/styles";
import {AppBar,Toolbar,IconButton,Typography,InputBase,Badge,MenuItem,Menu,Fade, Snackbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {searchProduct, initProducts, setEmptySearch} from '../../store/actions/storeFront'
import VerticalCenterLoginPopup from "../../container/authentication/LoginSignUp";
import { alpha } from '@material-ui/core/styles';
import Popover from "material-ui-popup-state/HoverPopover";
import PopupState from 'material-ui-popup-state';

import {
  usePopupState,
  bindHover,
  bindPopover,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Sidebar from './sidebar';
import { ShoppingCart, LogOut } from "react-feather";
import { FiSearch } from "react-icons/fi"; 
import { FaClipboardList } from "react-icons/fa"; 
import { User } from "react-feather";
import { Zap } from "react-feather";
import { Sliders } from "react-feather";
import { Heart } from "react-feather";
import { useAlert } from 'react-alert'
import { isLogin, logout } from "../../container/authentication/authUtilities";
import { MoonLoader } from "react-spinners";
import cclogo from '../../assets/navlogo-challenger.png';
import "./appBar.css";
import "./index.scss";


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={true} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  afterscrollnav: {
    backgroundColor: "var(--base-dark, rgb(12, 14, 19)) !important",
    transition: "all 0.2s",
  },

  beforescrollnav: {
    backgroundColor: "transparent !important",
    transition: "all 0.2s",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    cursor:"pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 9, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));


function AppBarMobile(props) {

  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [accessories, setAccessories] = React.useState('');
  const [pcparts, setPcparts] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [openPop, setOpenPop] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchKeyword, setSearchKeyword] = React.useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  
  const handleMouseOver = () => {
    // setCategoryLoading(true);
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
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    handleMouseOver();
  },[]);
  const [stateLogin, setStateLogin] = React.useState({
    openLogin: true,
    verticallogin: "top",
    horizontallogin: "center",
  });

  const alert = useAlert();
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { vertical, horizontal, open } = state;

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const { window } = props;
 
  const triggerColor = useScrollTrigger({
    target: window ? window(0) : undefined,
    disableHysteresis: true,
    threshold: 0
  });
  const classes = useStyles();
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNavigate = (arg) => {
    if(arg === 'prebuild'){
      dispatch(initProducts(1, 'prebuild'))
      props.history.push({
        pathname: '/Prebuilds'
      })
    }
    if(arg === 'laptop'){
      dispatch(initProducts(1, 'laptop'))
      props.history.push({
        pathname: '/laptops'
      })
    }
  }
  const handleOnSearch = (event) => {
    setSearchKeyword(event.target.value)
  }

  const onSearch = async (e) => {
    if(e.which === 13 && searchKeyword !== null || e.type === 'click' && searchKeyword !== null){
      if(props.history.location.pathname === '/Prebuilds'){
        e.target.blur();
        dispatch(initProducts(1, 'prebuildSearch', searchKeyword))
           setTimeout(() => {
             props.history.push({
               pathname: '/Prebuilds',
               state: {from: searchKeyword}
             })
           }, 500)
      }
      else if(props.history.location.pathname === '/laptops'){
        e.target.blur();
        dispatch(initProducts(1, 'laptopSearch', searchKeyword))
           setTimeout(() => {
             props.history.push({
               pathname: '/laptops',
               state: {from: searchKeyword}
             })
           }, 500)
      } else if(props.history.location.pathname === `/pcparts/${accessories}`){
        e.target.blur();
        dispatch(initProducts(1, 'pcpartsSearch', searchKeyword, accessories))
           setTimeout(() => {
             props.history.push({
               pathname: `/pcparts/${accessories}`,
               state: {from: searchKeyword}
             })
           }, 500)
      } else {
        e.target.blur();
        dispatch(initProducts(1, 'search', searchKeyword))
           setTimeout(() => {
             props.history.push({
               pathname: '/searchresults',
               state: {from: searchKeyword}
             })
           }, 500)
      }
    }
  }

  const handleClickAway = () => {
    popupState.close();
  }
  const handleLoginPopup = () => {
    setModalShow(true);
    popupState.close();
  }

  const handleLogoutPopup = () => {
    setOpenPop(true);
    popupState.close();
  }

  const handleMyOrder = () => {
    popupState.close();
    props.history.push('/myorders')
  }

  const handleMyProfile = () => {
    popupState.close();
    props.history.push('/myprofile')
  }
  const MyVerticallyCenteredModal = (props) => {
    return (
    <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>Logout</Modal.Header>
      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setOpenPop(false)}>Cancel</p>
        <Button onClick={handleLogout} variant="danger">{'Logout'}</Button>
      </Modal.Footer> 
    </Modal>
  );
}

  const handleLogout = () => {
    const auth_token = JSON.parse(localStorage.getItem("currentUser"));
    let headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${auth_token}`,
		};
    axios.post('/logout', {}, {headers})
    .then(res => {
      logout();
      setOpenPop(false); 
      alert.success('Successfully logged out', {
        timeout:2000
      }) 
    })
    .catch(error => {
      if(error.response.data.error === 'No active session!' ){
        logout();
        setOpenPop(false); 
      } else{
        setOpenPop(false); 
        alert.error('something went wrong!', {
          timeout:3000
        })
      }
    })
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={101} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <User />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const popupState2 = usePopupState({
    variant: "popover2",
    popupId: "demoPopover2",
  });

  const popupState3 = usePopupState({
    variant: "popover3",
    popupId: "demoPopover3",
  });

  const navigateToPcparts = async (pcpart) => {
    setAccessories(pcpart);
    popupState3.close();
    await dispatch(initProducts(1, pcpart))
    props.history.push({
      pathname: `/pcparts/${pcpart}`
    })
  }

  return (
    <div className={classes.grow}>
      <div id='desktopAppBar'>
        <HideOnScroll {...props}>
          <AppBar
            className={triggerColor ? "filledBar" : "beforescrollnav"}
            elevation={0}>
            <Container id='ContainerWidth'>
              <Toolbar>
                <IconButton
                  edge='start'
                  className="menu-button"
                  color='inherit'
                  aria-label='open drawer'>
                  <MenuIcon />
                </IconButton>
                <Link to='/'>
                  <Typography className={classes.title} variant='h6' noWrap>
                  <img className="cclogo" src={cclogo} alt="logo"/>
                  </Typography>
                </Link>

                <Typography
                  className='desktopMenuItem'
                  // variant='contained'
                  {...bindHover(popupState2)}
                  style={{
                    marginLeft: 35,
                    marginRight: 25,
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}>
                  BUILD YOUR PC
                </Typography>

                <Popover
                  {...bindPopover(popupState2)}
                  TransitionComponent={Fade}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  disableScrollLock={true}
                  disableRestoreFocus
                  style={{ overflow: "auto" }}>
                  <Link to='/suggestme'>
                    <MenuItem onClick={popupState2.close}>
                      <Zap
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></Zap>
                      Suggest Me
                    </MenuItem>
                  </Link>
                  <Link to='/customizeyourself'>
                  <MenuItem onClick={popupState2.close}>
                    <Sliders
                      style={{
                        marginRight: "11px",
                        width: "19px",
                      }}></Sliders>
                    Customize Yourself
                  </MenuItem>
                  </Link>
                </Popover>
              {/* <Link to={{pathname:'/Prebuilds', state:{from: 'pre'}}}> */}
                <Typography
                  onClick={()=>handleNavigate('prebuild')}
                  className='desktopMenuItem'
                  variant='subtitle1'
                  noWrap
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    cursor:'pointer'
                  }}>
                  PRE-BUILD PCs
                </Typography>
                <Typography
                  onClick={()=>handleNavigate('laptop')}
                  className='desktopMenuItem'
                  variant='subtitle1'
                  noWrap
                  style={{
                    paddingLeft: 25,
                    paddingRight: 0,
                    cursor:'pointer'
                  }}>
                  LAPTOPS
                </Typography>

                <Typography
                  {...bindHover(popupState3)}
                  className='desktopMenuItem'
                  variant='subtitle1'
                  noWrap
                  style={{
                    paddingLeft: 25,
                    paddingRight: 0,
                    cursor:'pointer'
                  }}>
                  PERIPHERALS
                </Typography>
                <Typography
                  className='desktopMenuItem'
                  onClick={()=>props.history.push('/about')}
                  variant='subtitle1'
                  noWrap
                  style={{
                    paddingLeft: 25,
                    paddingRight: 0,
                    cursor:'pointer'
                  }}>
                  ABOUT US
                </Typography>
                <Popover
                  {...bindPopover(popupState3)}
                  TransitionComponent={Fade}
                  // style={{width: "1009px"}}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  disableScrollLock={true}
                  disableRestoreFocus
                  style={{ overflow: "auto" }}>
                    {categoryLoading ?
                    <p style={{padding:'120px'}}>
                      <MoonLoader color={'white'}/>
                    </p> :
                    pcparts.map((parts, idx) => {
                      return <MenuItem key={idx} style={{width: "300px"}} onClick={()=>navigateToPcparts(parts.category)}>
                      {parts.category}
                    </MenuItem>})} 
                </Popover>
                <div className={classes.grow} />
                {props.location.pathname !== '/YourCart' && props.location.pathname !== '/Checkout' && props.location.pathname !== '/paymentComplete'  ?
                 <div className={classes.search} id='desktopSearchBar'>            
                  <SearchIcon style={{margin:'0 10px',cursor:'pointer'}} onClick={onSearch}/>
                  <InputBase
                    placeholder='Search…'
                    onChange={handleOnSearch}
                    onKeyPress={(e) => onSearch(e)}
                    style={{color:'white'}}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div> 
                : null}
                <div className={classes.sectionDesktop}>
                
                <NavLink to='/YourCart'>
                  <IconButton aria-label='show 17 new notifications' color='inherit'>
                    <Badge badgeContent={cart ? cart : null} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </NavLink>
                {/* <ClickAwayListener onClickAway={handleClickAway}> */}
                  <IconButton
                    {...bindHover(popupState)}
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='inherit'>
                    <User />
                  </IconButton>
                  {/* </ClickAwayListener> */}
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    disableScrollLock={true}
                    disableRestoreFocus
                    style={{ overflow: "auto" }}>
                    {isLogin() === false ? 
                    <MenuItem onClick={handleLoginPopup}>
                    <User
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></User> Login/SignUp
                    </MenuItem> : null}                          
                   {isLogin() && <MenuItem onClick={handleMyProfile}>
                      <User
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></User>
                      My Profile
                    </MenuItem>}
                    {isLogin() === true ? <MenuItem onClick={handleMyOrder}>
                      <FaClipboardList
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></FaClipboardList>
                      Orders
                    </MenuItem> : null}
                    {isLogin() ? 
                    <Link to="/mylist">
                      <MenuItem onClick={ () => popupState.close()}>
                        <Heart
                          style={{
                            marginRight: "11px",
                            width: "19px",
                          }}></Heart>
                        Saved List
                      </MenuItem>
                    </Link> : null}
                    {isLogin() === true ? <MenuItem onClick={handleLogoutPopup}>
                      <LogOut
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></LogOut>
                      Logout
                    </MenuItem> : null}
                  </Popover>
                  <MyVerticallyCenteredModal
                    show={openPop}
                    onHide={() => setOpenPop(false)}
                    />
                </div>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </div>

      <div id='mobileSearchAppBar'>
        <HideOnScroll {...props}>
          <AppBar
            elevation={0}
            className={triggerColor ? "filledBar" : "beforescrollnav"}>
            <Container style={{ maxWidth: 1459 }}>
              <Toolbar>
              <Sidebar/>
              <Link to='/'>
                <Typography className={classes.title} variant='h6' noWrap>
                  <img className="cclogo" src={cclogo} alt="logo"/>
                </Typography>
              </Link>
              <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  
                <NavLink to='/YourCart'>
                  <IconButton aria-label='show 17 new notifications' color='inherit'>
                    <Badge badgeContent={cart ? cart : null} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </NavLink>
              <ClickAwayListener onClickAway={handleClickAway}> 
                <IconButton
                    variant='contained'
                    onClick={()=>popupState.open()}
                    {...bindHover(popupState)}
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='inherit'>
                    <User />
                    </IconButton>
                    </ClickAwayListener>
                  <VerticalCenterLoginPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <MyVerticallyCenteredModal
                    show={openPop}
                    onHide={() => setOpenPop(false)}
                    />
                </div>
              </Toolbar>

              <div style={{marginBottom:20}}>
              {props.location.pathname !== '/YourCart' && props.location.pathname !== '/Checkout' && props.location.pathname !== '/paymentComplete' ? 
              <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    onChange={handleOnSearch}
                    onKeyPress={(e) => onSearch(e)}
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}      
                    inputProps={{ "aria-label": "search" }}
                  />
                </div> : null}
              </div>
            </Container>
          </AppBar>
        </HideOnScroll>
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message='Logged out successfully!'
        key={vertical + horizontal}
      />
    </div>
  );
}

export default withRouter(AppBarMobile);