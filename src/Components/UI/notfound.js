import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import { Container, Button,InputGroup,FormControl } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import {fade, makeStyles} from "@material-ui/core/styles";
import {AppBar,Toolbar,IconButton,Typography,InputBase,Badge,MenuItem,Menu,Fade} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {searchProduct} from '../../store/actions/storeFront'
import VerticalCenterLoginPopup from "../LoginSignUp/LoginSignUp";
import Popover from "material-ui-popup-state/HoverPopover";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Sidebar from './sidebar';
import { ShoppingCart, LogOut } from "react-feather";
import { FiSearch } from "react-icons/fi"; 
import { User } from "react-feather";
import { Zap } from "react-feather";
import { Sliders } from "react-feather";
import { Heart } from "react-feather";
import "../appBar.css";



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
    backgroundColor: "rgb(12, 14, 19) !important",
    transition: "all 0.2s",
  },

  beforescrollnav: {
    backgroundColor: "transparent !important",
    transition: "all 0.2s",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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

  const [modalShow, setModalShow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchKeyword, setSearchKeyword] = React.useState(null);

  const cart = useSelector(state => state.cart);
  const productDetail = useSelector(state => state.productDetail);
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

  const handleOnSearch = (event) => {
    setSearchKeyword(event.target.value)
  }

  const onSearch = (e) => {
    if(e.which === 13 && searchKeyword !== null || e.type === 'click' && searchKeyword !== null){
      dispatch(searchProduct(searchKeyword))
        // if(props.location.pathname === '/' || props.location.pathname === '/:nestedUrl/:id'){
          props.history.push({
            pathname: '/Prebuilds',
            state: {from: searchKeyword}
          })
        // }
    }
    // return <Redirect from="/"  to={{
    //   pathname: '/Prebuilds' 
    //  }}/>
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
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'>
                  <MenuIcon />
                </IconButton>
                <Link to='/'>
                  <Typography className={classes.title} variant='h6' noWrap>
                    Gravity
                  </Typography>
                </Link>

                {/* <div
                  className='desktopMenuItem'
                  variant='contained'
                  {...bindHover(popupState2)}
                  style={{
                    marginLeft: 35,
                    marginRight: 25,
                    textTransform: "uppercase",
                  }}>
                  Build your PC
                </div> */}

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
                  <Link to='/buildYourPC'>
                    <MenuItem onClick={popupState2.close}>
                      <Zap
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></Zap>
                      Suggest Me
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={popupState2.close}>
                    <Sliders
                      style={{
                        marginRight: "11px",
                        width: "19px",
                      }}></Sliders>
                    Customize Yourself
                  </MenuItem>
                </Popover>
              <Link to='/Prebuilds'>
                <Typography
                  className='desktopMenuItem'
                  variant='subtitle1'
                  noWrap
                  style={{
                    marginTop:3,
                    paddingLeft: 25,
                    paddingRight: 25,
                    textTransform: "uppercase",
                  }}>
                  PRE-BUILD PCs
                </Typography>
              </Link>
                {/* <Link to='/storeFront'>
                  <Typography
                    className='desktopMenuItem'
                    variant='subtitle1'
                    noWrap
                    style={{
                      paddingLeft: 25,
                      paddingRight: 25,
                      textTransform: "uppercase",
                    }}>
                    VISIT STORE
                  </Typography>
                </Link> */}
{/* && props.location.pathname !== '/YourCart' && props.location.pathname !== '/Checkout/' */}
                <div className={classes.grow} />
                {props.location.pathname !== '/YourCart' && props.location.pathname !== '/Checkout' && props.location.pathname !== '/paymentComplete'  ?
                 <div className={classes.search} id='desktopSearchBar'>
                  <div className={classes.searchIcon}>
                  <SearchIcon style={{cursor:'pointer'}} onClick={onSearch}/>
                  </div>
                  <InputBase
                    placeholder='Search…'
                    onChange={handleOnSearch}
                    onKeyPress={(e) => onSearch(e)}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div> 
              //   <InputGroup onChange={handleOnSearch}
              //   onKeyPress={(e) => onSearch(e)}
              //   size="sm" className="search sm-3">
              //   <FormControl
              //     placeholder="Search Prebuilds..."
              //     aria-label="Search Prebuilds..."
              //     aria-describedby="basic-addon2"
              //   />
              //   <InputGroup.Append>
              //     <Button onClick={onSearch} variant="outline-secondary"><FiSearch/></Button>
              //   </InputGroup.Append>
              // </InputGroup>
                : null}
                <div className={classes.sectionDesktop}>
                
                <NavLink to='/YourCart'>
                  <IconButton aria-label='show 17 new notifications' color='inherit'>
                    <Badge badgeContent={cart ? cart : null} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </NavLink>

                  <IconButton
                    variant='contained'
                    {...bindHover(popupState)}
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='inherit'>
                    <User />
                    <p style={{fontSize: 10, marginTop: 18, position: 'absolute'}}>(Guest)</p>
                  </IconButton>
                  {/* <Popover
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
                    <MenuItem onClick={popupState.close}>
                      <Button
                        variant='primary'
                        onClick={() => setModalShow(true)}>
                        Login/SignUp
                      </Button>
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose}>
                      <User
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></User>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Heart
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></Heart>
                      Wishlist
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <LogOut
                        style={{
                          marginRight: "11px",
                          width: "19px",
                        }}></LogOut>
                      Logout
                    </MenuItem>
                  </Popover> */}
                  <VerticalCenterLoginPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
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
                  Gravity
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

                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    onClick={handleProfileMenuOpen}
                    color='inherit'>
                    <User />
                    <p style={{fontSize: 10, marginTop: 18, position: 'absolute'}}>(Guest)</p>
                  </IconButton>
                </div>
              </Toolbar>

              <div>
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
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </div>
  );
}

export default withRouter(AppBarMobile);