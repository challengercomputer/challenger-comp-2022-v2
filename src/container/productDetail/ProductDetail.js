import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import ReactLoading from "react-loading";
import axios from 'axios';
import {Container, Row, Col, Card, Tab, Tabs, Table, TabContent, Accordion, Spinner, InputGroup ,OverlayTrigger, Modal} from "react-bootstrap";
import {Divider, Toolbar, Button, Snackbar} from "@material-ui/core";
import { ReactSVG } from "react-svg";
import { ShoppingCart } from "react-feather";
import { Heart } from "react-feather";
import {motion} from "framer-motion";
import { FiInfo } from "react-icons/fi";
import {ScaleLoader} from "react-spinners";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

//Import Components
import BreadcrumbComponent from "../../Components/BreadCrumb/appBreadCrumbs";
import ProductCarousel from "../../Components/ProductCarousel/ProductCarousel";
import {cartAdded, addWishlist, removeWishlist} from "../../store/actions/storeFront";
import stockImage from '../../assets/noimage.png';
import { useAlert } from 'react-alert'
import "./ProductDetails.css";
import {isLogin} from '../authentication/authUtilities';


const pageTransition = {
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "-100%" },
};


function ProductDetail(props) {

  const [clicked, setClicked] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [handlePopupWarranty, setHandlePopupWarranty] = useState(false)
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const cart = useSelector(state => state.cart);
  const cartProducts = useSelector(state => state.cartProducts);
  const [notifyValue, setNotifyValue] = useState('');
  const [notifyLoading, setNotifyLoading] = useState(false);
  const alert = useAlert();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/product/' + props.match.params.id)
    .then(response => {
      setDetail(response.data.product);
      setIsLoading(false);
    })
  },[props.match.params.id, isLogin()])

  // if(isLogin() === true){
  //   setLoginState(true);
  // }
  const addToWishlist = (id) => {
    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth_token}`,
    };
    if(isLogin()){
      setLoginState(true)
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
    } else {
      alert.error("Login to wishlisht", {
        timeout:3000
      })
    }
  }

  const handleCart = (id) => {
    setClicked(true)
    dispatch(cartAdded(id))
  }

  const handleNotify = () => {
    setNotifyLoading(true);
    axios.post(`/contact/notifyMe/${props.match.params.id}`,{
      "email": notifyValue
    })
    .then(res => {
      setNotifyLoading(false);
      setNotifyValue('')
      alert.success('You will be notified...', {
        timeout:3000
      })
    })
    .catch(err => {
      setNotifyLoading(false);
      alert.error(err.response.data.error, {
        timeout:3000
      })
    })
  }
  if(isLoading){
    return (
      <div className="d-flex justify-content-center" style={{marginTop:250}}>
        <ScaleLoader
        color={'red'}
        size={75}/>
      </div>);
    }

    const WarrantyModal = (props) => {
      return (
        <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>Warranty Details</Modal.Header>
          <Modal.Body>
          {detail.warranty}
          </Modal.Body>
        </Modal>
      );
    }
  const pageData = {
    title: "Product Details",
    image: `${detail.productImages[0].s3URL}`,
    excerpt: `${detail.specifications.map((tag) => tag.value)}`,
  }
  return (
    <React.Fragment>
      <section className="product-detail pt-150 pb-70">
      <Helmet>
        <title>{detail.productName} | {Config.challengers__title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content={Config.challengers__websiteType} />

        <meta property="og:image" content={pageData.image} />
        <meta itemprop="image" content={pageData.image} />
        <meta name="twitter:image" content={pageData.image} />

        <meta property="og:title" content={detail.productName} />
        <meta itemprop="name" content={detail.productName} />
        <meta name="twitter:title" content={detail.productName}/>

        <meta property="og:description" content={pageData.excerpt} />
        <meta itemprop="description" content={pageData.excerpt} />
        <meta name="twitter:description" content={pageData.excerpt} />

      </Helmet>

      <motion.div
        initial='out'
        animate='in'
        exit='out'
        variants={pageTransition}>
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        <Container id='ContainerWidth'>
          <Row>
            <BreadcrumbComponent payload={props.match.params.id}/>
          </Row>
          <Row>
            <Col xs='12' md='12' lg='5' xl='5' id='productCarouselCol'>
              <ProductCarousel slides={detail.productImages.length} imageData={detail.productImages}/>
            </Col>
            <Col xs='12' md='12' lg='7' xl='7'>
              <div>
                <h1 className="product-title fs-3xl">
                  {detail.productName}
                </h1>
                <Divider
                  style={{
                    background: "var(--base-white-a10, #24262B)",
                    marginTop: "32px",
                    marginBottom: "32px"
                  }}>
                </Divider>
                
                <span style={{ display: "flex" }}>
                  <h3 style={{ color: "white" }}>Rs. {detail.finalPrice}</h3>
                  <h5 id='originalPrice2'> {detail.totalPrice}</h5>
                </span>
                {Math.floor([(detail.totalPrice - detail.finalPrice) / detail.totalPrice] * 100) !== 0 
                ? <h5 id='savePercent'>
                  Save {Math.floor([(detail.totalPrice - detail.finalPrice) / detail.totalPrice] * 100)}%
                </h5> : null}
                <span style={{ display: "flex", marginTop: "32px" }}>
                  <button
                    onClick={() => addToWishlist(props.match.params.id)}
                    className={'el-btn el-btn-warning-a10 me-3'}>
                      Wishlist
                    <Heart style={{ width: "18px", marginLeft: "10px" }} />
                  </button>
                 {cart && cartProducts.some(id => props.match.params.id.includes(id._id)) ?
                  <NavLink to={'/YourCart'}>
                    <Button className='addtocart-btn'>
                      Continue to cart ({cart})
                    <ShoppingCart style={{ width: "18px", marginLeft: "5px" }}/>
                    </Button>  
                  </NavLink> :
                  detail.inventory <= 0 ?
                  <Button className='outofstock'>
                    OUT OF STOCK!
                  </Button> :
                  <Button onClick={!clicked ? ()=>{handleCart(props.match.params.id)} : null} className='addtocart-btn'>
                    {!clicked ? "Add to Cart" : <div >
                    <ReactLoading type="spokes" className="loading" height={25} width={25} color="#fff" /> Adding to Cart
                      </div>}
                  </Button>}
                </span>
                {detail.inventory <= 0 ?
                <div className='input-group mt-2'>
                  <input
                    type='text'
                    onChange={(e) => setNotifyValue(e.target.value)}
                    value={notifyValue}
                    className='form-control text-white'
                    placeholder='Email Address'
                    aria-describedby='basic-addon2'
                    style={{
                      background: "#141C27",
                      border: "none",
                      borderRadius: "0px",
                    }}
                  />
                  <div className='input-group-append'>
                    <button onClick={handleNotify} className='btn btn-outline-secondary' type='button' style={{background: "var(--base-warning, rgb(34, 244, 238))",color: "var(--base-inverted, black)", borderRadius: "0px"}}>
                      {notifyLoading ? <Spinner animation="border" size="sm"/> : 'Notify'}
                    </button>
                  </div>
                </div> : null}
                {detail.warranty.includes('http') ? 
                <Card style={{marginTop: 32, background: "#191c27", color: "#DBDBDB"}}>
                  <Card.Body>
                    <Card.Subtitle
                      // onClick={()=>setHandlePopupWarranty(true)}
                      className='mb-2'
                      style={{ fontWeight: "600", cursor:'pointer' }}>
                      <div>WARRANTY:</div>
                      <div style={{marginTop:10}}>
                        <a style={{borderBottom:'1px solid'}} href={detail.warranty} rel="noopener noreferrer" target="_blank">Click to view</a> 
                      </div>
                    </Card.Subtitle>
                    <Card.Text> 
                    </Card.Text>
                  </Card.Body>
                </Card> : null}
              </div>
            </Col>
          </Row>
          <Container style={{ maxWidth: 1410 }}>
            <Row style={{ marginTop: "100px", marginBottom: "33px" }}>
              <span style={{display: "flex", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
                <ReactSVG
                  src={require("./assets/storeicon.svg")}
                  style={{ paddingRight: "18px" }}
                />
                <h3 style={{ fontWeight: 800, color: "white" }}>Features</h3>
              </span>
            </Row>

            <Tabs
              defaultActiveKey='home'
              id='uncontrolled-tab-example'
              style={{
                marginBottom: "56px",
                border: "1px solid #CDCDCD",
                borderRadius: "0px",
              }}>
              <Tab eventKey='home' title='SPECS'>
                <TabContent style={{ marginTop: "24px", color: "white" }}>
                  <Container>
                    <Table striped bordered hover variant='dark'>
                      <tbody>
                      {detail.specifications.map(spec => {
                      if(spec.value){
                        return <tr key={spec._id}>
                        <th className="capitalize">{spec.key}</th>
                        <td>{spec.value}</td>
                      </tr>}})}
                      </tbody>
                    </Table>
                  </Container>
                </TabContent>
              </Tab>
              <Tab eventKey='profile' title='FAQ'>
                <TabContent>
                  <Container style={{ color: "white" }}>
                    {/* {detail.faq.map(faq => {
                    return <Accordion key={faq._id} defaultActiveKey='0'>
                      <Card style={{marginBottom: "10px", borderRadius: 0, border: "none"}}>
                        <Accordion.Toggle as={Card.Header} eventKey='0' style={{ background: "#090E1A" }}>
                          {faq.question}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                          <Card.Body style={{ background: "#161A26" }}>
                           {faq.answer}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>})} */}
                    <Accordion defaultActiveKey='0'>
                      <Card className="bg-transparent bg-base-dark">
                        <Accordion.Toggle as={Card.Header} eventKey='0' style={{ background: "var(--base-white-a5, #090E1A)" }}>
                          Q. My system is out of warranty. Can I still get technical support?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                          <Card.Body style={{ background: "#161A26" }}>
                            A. Challenger Computers provides free lifetime support. So even if your warranty has expired you may call or email our support staff for assistance.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                    <Accordion defaultActiveKey='0'>
                      <Card className="bg-transparent bg-base-dark">
                        <Accordion.Toggle as={Card.Header} eventKey='0' style={{ background: "var(--base-white-a5, #090E1A)" }}>
                        Q. Do you only sell gaming PC’s?                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                          <Card.Body style={{ background: "#161A26" }}>
                          A. They’re built with high quality components and assembled and tested expertly by hand. Whether you’re shopping for a quad-Titan rendering rig, or a mid-range gaming desktop, our knowledgeable sales staff are familiar with all current games and most professional software suites and their requirements, so we can help you find the right machine for your needs                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                    <Accordion defaultActiveKey='0'>
                      <Card className="bg-transparent bg-base-dark">
                        <Accordion.Toggle as={Card.Header} eventKey='0' style={{ background: "var(--base-white-a5, #090E1A)" }}>
                          Q. I have already purchased a PC with Challenger Computers - would like to upgrade my system does Challenger Computers buy my old components?                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                          <Card.Body style={{ background: "#161A26" }}>
                          A. Challenger Computers does not buy or sell used components, however we can connect you with potential buyers                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Container>
                </TabContent>
              </Tab>
            </Tabs>
            <WarrantyModal 
            show={handlePopupWarranty}
            onHide={()=>setHandlePopupWarranty(false)}/>
          </Container>
        </Container>
      </motion.div>
      </section>
    </React.Fragment>
  );
}

export default ProductDetail;

