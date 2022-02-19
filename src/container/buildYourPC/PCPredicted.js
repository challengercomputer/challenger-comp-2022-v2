import React, {useEffect, useState} from "react";
import {Row, Col, Container,Table} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import Image from "react-bootstrap/Image";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from "react-redux";
import {cartAdded} from "../../store/actions/storeFront";
import { motion } from "framer-motion";
import Toolbar from "@material-ui/core/Toolbar";
import ReactLoading from "react-loading";
import {ScaleLoader} from "react-spinners";
import {isLogin} from '../authentication/authUtilities';
import axios from 'axios';
import "./buildForm.css";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";


//gameprogress
import LinearProgress from "@material-ui/core/LinearProgress";

//Import ICONS
import { ShoppingCart } from "react-feather";
import { ReactSVG } from "react-svg";

//css
import "./pcpredicted.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//material ui
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useAlert } from 'react-alert';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#E50926",
  },
}))(LinearProgress);


const pageTransition = {
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "100%" },
};

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 72,
    height: 35,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 5.3,
    "&$checked": {
      transform: "translateX(38px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#0071C5",
        opacity: 1,
        border: "none",
        // #E50926
      },
    },
    "&$focusVisible $thumb": {
      color: "#0071C5",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 100 / 2,
    backgroundColor: "#E50926",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const PCPredicted = (props) => {

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartProducts = useSelector(state => state.cartProducts);
  const selectedGames = useSelector(state => state.selectedGames)
  const [chosenGamesIntel, setChosenGamesIntel] = useState([]);
  const [chosenGamesAmd, setChosenGamesAmd] = useState([]);
  const [added, setAdded] = useState(false);
  const [intelPrebuild, setIntelPrebuild] = useState([]);
  const [amdPrebuild, setAmdPrebuild] = useState();
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [progress, setProgress] = useState(0);

  const handleCart = (id) => {
    setClicked(true)
    dispatch(cartAdded(id))
  }

  const handleCart2 = (id) => {
    setClicked2(true)
    dispatch(cartAdded(id))
  }

  useEffect(() => {
    window.scrollTo(0,0)
    axios.get(`/recommended?maxPrice=${props.match.params.value}`)
    .then(res => {
      // console.log(res,'es')
      setIntelPrebuild(res.data.intelPrebuild)
      setAmdPrebuild(res.data.amdPrebuild)
      if(!res.data.intelPrebuild && res.data.amdPrebuild){
        setState({checkedB:false});
      }
      setLoading(false)
    })
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 50;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 15);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addToWishlist = (id) => {
    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth_token}`,
		};
    axios.patch('/wishlist', {"productID": id},  {headers})
    .then(res => {
      alert.success('Added to wishlist', {
        timeout:3000
      })
    })
    .catch(error => {
      setAdded(true);
      alert.error(error.response.data.error, {
        timeout:3000
      })
    })
  }

  if(loading){
    return (
      <div className="py-150 d-flex justify-content-center">
        <ScaleLoader
          color={'var(--base-danger, red)'}
          size={75}/>
      </div>);
    }

    let resultGamesIntel;
    let resultGamesAmd;

    if(intelPrebuild){
      resultGamesIntel = intelPrebuild.games.filter(gam => selectedGames.some(game => gam.game === game.game));
    }
    if(amdPrebuild){
      resultGamesAmd = amdPrebuild.games.filter(gam => selectedGames.some(game => gam.game === game.game));
    }

    
    return (
      <React.Fragment>
        <Helmet>
          <title>{state.checkedB ? intelPrebuild?.specifications[5].value : amdPrebuild?.specifications[5].value } | {Config.challengers__title}</title>
          <link rel="canonical" href={window.location.href} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content={Config.challengers__websiteType} />

          <meta property="og:title" content={state.checkedB ? intelPrebuild?.specifications[5].value : amdPrebuild?.specifications[5].value } />
          <meta itemprop="name" content={state.checkedB ? intelPrebuild?.specifications[5].value : amdPrebuild?.specifications[5].value } />
          <meta name="twitter:title" content={state.checkedB ? intelPrebuild?.specifications[5].value : amdPrebuild?.specifications[5].value }/>

          <meta property="og:description" content={pageData.excerpt} />
          <meta itemprop="description" content={pageData.excerpt} />
          <meta name="twitter:description" content={pageData.excerpt} />
        </Helmet>

        <section className="pcpredicted-area pt-150 pb-70">
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        <Container>
          <motion.div
            initial='out'
            animate='in'
            exit='out'
            variants={pageTransition}>
            <Row>
              <Col lg={4} md={6} sm={12} style={{ textAlign: "center" }}>
                <Image
                  src={state.checkedB ? intelPrebuild?.productImages[0].s3URL : amdPrebuild?.productImages[0].s3URL}
                  width='65%'
                  style={{ marginBottom: "32px" }}
                />
                <br></br>
                {!resultGamesIntel || !resultGamesAmd 
                ? null :
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <h5
                    className={state.checkedB ? "null" : "amdText"}
                    style={{ fontWeight: "700" }}>
                    AMD
                  </h5>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={state.checkedB}
                        onChange={handleChange}
                        name='checkedB'
                      />
                    }
                    style={{
                      marginLeft: "0px",
                      marginRight: "0px",
                      marginTop: "-13px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  />
                  <h5
                    className={state.checkedB ? "intelText" : "null"}
                    style={{ fontWeight: "700" }}>
                    Intel
                  </h5>
                </span> }
  
                <h3 style={{ fontWeight: "700", marginTop: "24px" }}>
                  {state.checkedB ? intelPrebuild?.totalPrice : amdPrebuild?.totalPrice}
                </h3>
  
                <span
                  style={{
                    display: "flex",
                    marginTop: "32px",
                    justifyContent: "center",
                  }}>
                  <button  
                    onClick={isLogin() ? () => addToWishlist(state.checkedB ? intelPrebuild?._id : amdPrebuild?._id) : () => {alert.error('Please sign in to wishlist', {timeout:3000})}}
                    className={isLogin() ? 'el-btn me-3 el-btn-warning' : 'el-btn el-btn-warning-a10 me-3 disabled'}>
                    WISHLIST
                  </button>
                  { 
                    state.checkedB ? 
                    cart && cartProducts.some(id => intelPrebuild?._id.includes(id._id)) ?
                        <NavLink to={'/YourCart'}>
                         <Button className='addtocart-btn'>
                            Continue to cart ({cart})
                          <ShoppingCart style={{ width: "18px", marginLeft: "5px" }}/>
                        </Button>  
                       </NavLink>  :
                      <button onClick={!clicked ? ()=>{handleCart(intelPrebuild?._id)} : null} className='el-btn el-btn-danger'>
                       {!clicked ? "Add to Cart" : <div >
                          <ReactLoading type="spokes" className="loading" height={25} width={25} color="#fff" /> Adding to Cart
                         </div>}
                      </button> :
                      cart && cartProducts.some(id => amdPrebuild?._id.includes(id._id)) ?
                      <NavLink to={'/YourCart'}>
                       <button className='el-btn el-btn-danger'>
                          Continue to cart ({cart})
                        <ShoppingCart style={{ width: "18px", marginLeft: "5px" }}/>
                      </button>  
                     </NavLink>  :
                    <button onClick={!clicked2 ? ()=>{handleCart2(amdPrebuild?._id)} : null} className='el-btn el-btn-danger'>
                     {!clicked2 ? "Add to Cart" : <div >
                      <ReactLoading type="spokes" className="loading" height={25} width={25} color="#fff" /> Adding to Cart
                       </div>}
                    </button>
                   }
                </span>
              </Col>
              <Col style={{margin:'10px 0'}} lg={4} md={6} sm={12}>
                <Table striped bordered hover variant='dark'>
                  <tbody>
                    {state.checkedB ? intelPrebuild?.specifications.map((spec, idx) => {
                    return <tr key={idx}>
                      <td>
                        <span style={{ display: "flex" }}>
                          {/* <ReactSVG
                            src={require("./assets/smallicons/casesmallicon.svg")}
                          /> */}
                          <Typography
                            variant='subtitle2'
                            style={{
                              color: "#CDCDCD",
                              fontWeight: 700,
                              marginLeft: "20px",
                            }}>
                            {spec.key}:
                            <br></br>
                            <p style={{ marginBottom: 0 }}>{spec.value}</p>
                          </Typography>
                        </span>
                      </td>
                          </tr>}) : amdPrebuild?.specifications.map((spec, idx) => {
                    return <tr key={idx}>
                      <td>
                        <span style={{ display: "flex" }}>
                          {/* <ReactSVG
                            src={require("./assets/smallicons/casesmallicon.svg")}
                          /> */}
                          <Typography
                            variant='subtitle2'
                            style={{
                              color: "#CDCDCD",
                              fontWeight: 700,
                              marginLeft: "20px",
                            }}>
                            {spec.key}:
                            <br></br>
                            <p style={{ marginBottom: 0 }}>{spec.value}</p>
                          </Typography>
                        </span>
                      </td>
                    </tr>})}
                  </tbody>
                </Table>
              </Col>
              <Col lg={4} md={12} sm={12}>
                <Typography variant='subtitle2'>
                  Your Build is powered by
                </Typography>
                <h5 style={{ color: "#fff", fontWeight: 600 }}>
                  {state.checkedB ? intelPrebuild?.specifications[5].value : amdPrebuild?.specifications[5].value }
                </h5>
                <p>
                  With a
                  <span
                    style={{
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      fontWeight: 800,
                      color: "#DBDBDB",
                    }}>
                    1920 FULL HD Display
                  </span>
                  you can expect:
                </p>
                {state.checkedB ? resultGamesIntel?.map((game, idx) => {
                return <div key={idx} style={{marginBottom:20}}>
                  <span style={{ display: "flex" }}>
                    <Image
                      src={game.gameImage.s3URL}
                      style={{ width: "15%" }}
                    />
                    <Typography
                      variant='subtitle2'
                      style={{
                        fontWeight: 700,
                            marginLeft: "20px",
                            color: "#E50926",
                          }}>
                          {game.fps === 'undefined' ? 0 : game.fps} Fps
                          <br></br>
                          <span
                            style={{
                              marginBottom: 0,
                              fontSize: "1.25rem",
                              color: "white",
                            }}>
                            {game.game}
                          </span>
                          <BorderLinearProgress
                            variant='determinate'
                            value={game.fps === 'undefined' ? 0 : Math.floor((game.fps/240)*100)}
                            style={{ width: "250px", marginTop: "20px" }}
                          />
                        </Typography>
                      </span>
                      </div> }) : resultGamesAmd.map((game, idx) => {
                    return <div key={idx} style={{marginBottom:20}}>
                      <span style={{ display: "flex" }}>
                        <Image
                          src={game.gameImage.s3URL}
                          style={{ width: "15%" }}
                        />
                        <Typography
                          variant='subtitle2'
                          style={{
                            fontWeight: 700,
                            marginLeft: "20px",
                            color: "#E50926",
                          }}>
                          {game.fps === 'undefined' ? 0 : game.fps} Fps
                          <br></br>
                          <span
                            style={{
                              marginBottom: 0,
                              fontSize: "1.25rem",
                              color: "white",
                            }}>
                            {game.game}
                          </span>
                          <BorderLinearProgress
                            variant='determinate'
                            value={game.fps === 'undefined' ? 0 : Math.floor((game.fps/240)*100)}
                            style={{ width: "250px", marginTop: "20px" }}
                          />
                        </Typography>
                      </span>
                    </div>})}
              </Col>
            </Row>
          </motion.div>
        </Container>
        </section>
      </React.Fragment>
    );
  } 
  // else {
  //   return (
  //     <React.Fragment>
  //     <Toolbar id='toolbar-desktop-space'></Toolbar>
  //     <Toolbar id='toolbar-mobile-space'></Toolbar>
  //     <Toolbar id='toolbar-mobile-space'></Toolbar>
  //     <Container style={{ textAlign:'center',maxWidth: 1410, marginTop: "130px" }}>
  //       <div>
  //         <p>NO PC AVAILABLE</p>
  //       </div>
  //     </Container>
  //     </React.Fragment>
  //   )
  // }


export default PCPredicted;

const pageData = {
  title: "Your Cart",
  excerpt: ''
}