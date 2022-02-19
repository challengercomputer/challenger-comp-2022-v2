import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";
import {BiRupee} from 'react-icons/bi';
import {FiAlertCircle} from 'react-icons/fi';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import Typography from "@material-ui/core/Typography";
import {Row, Col, Button, Container, Card, Table, Modal, Spinner} from "react-bootstrap";
import stockImage from '../../assets/noimage.png';
// import {Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";
import {ScaleLoader} from "react-spinners";
import cartImage from "../../assets/empty.png"; 
import axios from 'axios';
import './cart.css';
import {motion} from "framer-motion";

//Components
import {setReduxCoupon, cartRemoved, setQuantity, setCustomQuantity, reduxRemoveCoupon, removeCustomPc} from "../../store/actions/storeFront";

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 }
};


export default function YourCart(){
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cartProducts);
  const customPcProducts = useSelector(state => state.customPcProducts);
  const retrieveCoupon = useSelector(state => state.coupon);
  const alert = useAlert();
  let price = 0;
  let oldPrice = 0;
  let discountOnPrice = 0;
  let customPrice = 0;
  if(cartProducts.length !== 0){
    price = cartProducts.reduce((total, p) => total + (p.finalPrice * p.qty) , 0)
    oldPrice = cartProducts.reduce((total, cartProduct) => total + (cartProduct.totalPrice * cartProduct.qty) , 0);
    discountOnPrice = cartProducts.reduce((total, cartProduct) => total + ((cartProduct.totalPrice - cartProduct.finalPrice) * cartProduct.qty), 0 );
  }
  if(customPcProducts.length !== 0){
    customPrice = customPcProducts.reduce((total, p) => total + (p.totalPrice * p.qty) , 0)
  }
  
  const cartCount = useSelector(state => state.cart)
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [moreInfoModal, setMoreInfoModal] = useState(false);
  const [cartSpecs, setCartSpecs] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [id, setId] = useState(null);
  const [id2, setId2] = useState(null);
  const [buildSpecs, setBuildSpecs] = useState([]);
  
  const [dummyState, setDummyState] = useState('');

  const [cartSpecsData, setCartSpecsData] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  let modalLoading = false;;
  const removeCouponData = {
    discount: 0,
    status: false,
    _id: null,
    code: null,
    __v: 0
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  const removeCart = (id) => {
    dispatch(cartRemoved(id))
    setModalShow(false)
  }
  const removeCart2 = (id) => {
    dispatch(removeCustomPc(id))
    setModalShow2(false)
  } 
  const handleOnChange = (value, id) => { 
    dispatch(setQuantity(value, id))
    setDummyState(value);
  }
  const handleOnChangeCustom = (value, index) => { 
    dispatch(setCustomQuantity(value, index))
    setDummyState(value);
  }

  const openModal = (id) => {
    setId(id);
    setModalShow(true);
  }
  
  const openModal2 = (id) => {
    setId2(id);
    setModalShow2(true);
  }

  const handleCoupon = () => {
    setCouponLoading(true);
    const data = {
      code: coupon
    }
    axios.post('/payment/coupon', data)
    .then(res => {
      setCouponLoading(false);
      dispatch(setReduxCoupon(res.data.coupon));
      setCoupon('');
    })
    .catch(error => {
      setCouponLoading(false);
      alert.error('not a valid coupon', {timeout:3000})
      setCoupon('');
    })
  }

  const handleViewSpecs = (ids) => {
    axios.post('/myBuild/customPc/specs', {
      "ids":ids
    })
    .then(res => {
      setBuildSpecs(res.data.customPcSpecs)
      setMoreInfoModal(true)
    })
  }

  const removeCoupon = () => {
    dispatch(reduxRemoveCoupon(removeCouponData))
  }

  const handleCartSpecs = (specs) => {
    setCartSpecsData(specs)
    setCartSpecs(true);
  }
  const MyVerticallyCenteredModal = (props) => {
    return (
    <Modal  className="cart-remove" {...props}  centered>
      <Modal.Header closeButton>Remove Item</Modal.Header>
      <Modal.Body>
        Are you sure you want to remove this item?
      </Modal.Body>
      <Modal.Footer>
        <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setModalShow(false)}>Cancel</p>
        <Button variant="danger" onClick={()=>removeCart(props.id)}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}
const MyVerticallyCenteredModal2 = (props) => {
  return (
  <Modal  className="cart-remove" {...props}  centered>
    <Modal.Header closeButton>Remove Item</Modal.Header>
    <Modal.Body>
      Are you sure you want to remove this item?
    </Modal.Body>
    <Modal.Footer>
      <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setModalShow2(false)}>Cancel</p>
      <Button variant="danger" onClick={()=>removeCart2(props.id)}>Remove</Button>
    </Modal.Footer>
  </Modal>
);
}

const CartSpecModal = (props) => {
return (
    <Modal {...props}>
    <Modal.Header closeButton>Specifications</Modal.Header>
    <Modal.Body style={{height:'100%'}}>
    <Row>
      <Col>
      <Row>
          <Col>
          <Table striped bordered hover variant='dark'>           
              <tbody>
                  {cartSpecsData.length > 0 ? cartSpecsData.map((spec, index) => { 
                    if(spec.value){
                      return <tr key={index}>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.key}
                              </Typography>
                          </span>
                      </td>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.value}
                              </Typography>
                          </span>
                      </td>
                  </tr>}                     
                  }) : null}
                  {/* {cartSpecsData.length > 0 ? cartSpecsData.map((spec, index) => { 
                    if(spec.value){
                      return <tr key={index}>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.key}
                              </Typography>
                          </span>
                      </td>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.value}
                              </Typography>
                          </span>
                      </td>
                  </tr>}                     
                  }) : null} */}
              </tbody> 
          </Table>
          </Col>
      </Row>
  </Col>
</Row>
    </Modal.Body>
  </Modal>
);
}


const ModalInfo = (props) => {
return (
    <Modal {...props}>
    <Modal.Header closeButton>Specifications</Modal.Header>
    <Modal.Body style={{height:'100%'}}>
    <Row>
      <Col>
      <Row>
          <Col>
          <Table striped bordered hover variant='dark'>           
              <tbody>
                  {buildSpecs ? buildSpecs.map((spec, index) => {                      
                  return <tr key={index}>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.productName}
                              </Typography>
                          </span>
                      </td>
                      <td>
                          <span style={{ display: "flex" }}>
                              <Typography variant='subtitle2' style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                  {spec.finalPrice}
                              </Typography>
                          </span>
                      </td>
                  </tr>}) : null}
              </tbody> 
          </Table>
          </Col>
      </Row>
  </Col>
</Row>
    </Modal.Body>
  </Modal>
);
}
if(modalLoading){
return (
  <div className="py-150 d-flex justify-content-center">
    <ScaleLoader
    color={'var(--base-danger, red)'}
    size={75}/>
  </div>);
}
  return(
    <React.Fragment>
      <section className="cart-page bg-base-dark pt-100 pb-70">
      <Helmet>
        <title>{pageData.title} | {Config.challengers__title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="Pc Build website" />

        <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
        <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
        <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

        <meta property="og:description" content={Config.challengers__desc} />
        <meta itemprop="description" content={Config.challengers__desc} />
        <meta name="twitter:description" content={Config.challengers__desc} />

      </Helmet>

        
      <motion.div initial='out' animate='in' exit='out' variants={pageTransition}>
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        {cartCount === 0 ?
        <Container style={{ marginTop: 16 }}>
          <div>             
            <div style={{textAlign:'center', margin: '50px 0px'}}>
              <img src={cartImage} height={200} alt="cart"/>
            </div>
            <div style={{textAlign:'center'}}>
              <h3>Your cart is empty!</h3>
            </div>
          </div>          
        </Container> :
        <Container style={{ marginTop: 35 }}>
          <div className="mycart">
            <h3 className="mb-5 fs-2xl">My cart ({cartCount} {cartCount > 1 ? 'items' : 'item'})</h3>
          </div>   
          <Row>
          <Col lg={8} md={12} sm={12}>
            {cartProducts.length !== 0 ? 
              cartProducts.map((cartProduct, index) => {
              return(
              <Card key={cartProduct._id} style={{marginBottom:20,background:'var(--base-white-a5, #121921)'}}>    
              <Card.Body>        
                <Row>      
                  <Col sm={12} md={3}>
                    <div className="cart-image">
                      <Link to={`/Prebuild/${cartProduct._id}`}>
                      <img height={100} src={cartProduct.productImages[0] ? cartProduct.productImages[0].s3URL : stockImage} alt="laptop"/>
                      </Link>
                    </div>
                  </Col>   
                  <Col sm={12} md={7} >
                    <div className="description-section">
                        <p style={{fontSize:20, fontWeight:'bold'}} className="description">{cartProduct.productName}</p>
                        {/* <p style={{color:'gray'}}>2 years warranty on all parts & labor</p> */}
                        <div className="save-old d-flex mt-2">
                          {cartProduct.discountPercentage !== 0 ? <p style={{color:'#22f4ee'}}>Save {cartProduct.discountPercentage}%</p> : null}
                          <p  className="old-price" style={{marginLeft:10}}><BiRupee/>{cartProduct.totalPrice * cartProduct.qty}</p> 
                        </div>
                        <div className="cart-quantity d-flex">
                          <p style={{cursor:'pointer', color:'var(--base-inverted, #fff)', marginRight:10}} onClick={cartProduct.qty > 1 ? ()=>handleOnChange( cartProduct.qty - 1, cartProduct._id) : null}><AiOutlineMinusCircle size={25}/></p>
                          <p style={{marginRight:10}}>{cartProduct.qty}</p>
                          <p style={{cursor:'pointer', color:'var(--base-inverted, #fff)'}} onClick={cartProduct.qty < cartProduct.inventory ? ()=>handleOnChange(cartProduct.qty + 1, cartProduct._id) : null}><AiOutlinePlusCircle size={25}/></p>
                        </div>
                        <div >
                          <p className="spec-center" onClick={()=>handleCartSpecs(cartProduct.specifications)} style={{cursor:'pointer', borderBottom:'1px solid white', width:92}} >view specs</p>
                        </div>
                      </div> 
                    </Col> 
                    <Col  sm={12} md={2}>
                      <h3 className="final-price" style={{fontWeight:'bold', fontSize:16}}><BiRupee/>{cartProduct.finalPrice * cartProduct.qty}</h3>    
                    </Col>   
                </Row>
                <Row>
                  <Col lg={12}>
                    <div onClick={() => openModal(index)} 
                      className='removecart-btn'> Remove Item </div>
                  </Col>
                </Row>
                </Card.Body>      
              </Card>)})  : null}
              {customPcProducts?.length !== 0 ? 
              customPcProducts.map((customPcProduct, index) => {
              return(
              <Card key={index} style={{marginBottom:20,background:'var(--base-white-a5, #121921)'}}>
                <Card.Body>        
                  <Row>      
                    <Col sm={12} md={3}>
                      <div className="cart-image">
                        <img  height={100} src={customPcProduct.customPcImage} alt="laptop"/>
                      </div>
                    </Col>   
                    <Col  sm={12} md={7} >
                      <div className="description-section">
                          <h1 className="fs-2xl text-base-inverted product-title">CUSTOM PC #{index+1}</h1>
                          {/* <p style={{color:'gray'}}>2 years warranty on all parts & labor</p> */}
                          <div className="cart-quantity d-flex">
                            <p style={{cursor:'pointer', color:'var(--base-inverted, gray)', marginRight:10}} onClick={customPcProduct.qty > 1 ? ()=>handleOnChangeCustom(customPcProduct.qty - 1, index) : null}><AiOutlineMinusCircle size={25}/></p>
                            <p style={{marginRight:10}}>{customPcProduct.qty}</p>
                            <p style={{cursor:'pointer', color:'var(--base-inverted, gray)'}} onClick={customPcProduct.qty < 25 ? ()=>handleOnChangeCustom(customPcProduct.qty + 1, index) : null}><AiOutlinePlusCircle size={25}/></p>
                          </div>
                          <div className="save-old d-flex mt-2">
                            <p onClick={()=>handleViewSpecs(customPcProduct.customPcItemsID)} style={{borderBottom:'1px solid', cursor:'pointer'}} className="capitalize">view specs</p>
                          </div>
                        </div> 
                      </Col> 
                      <Col sm={12} md={2}>
                        <h3 className="final-price" style={{fontWeight:'bold', fontSize:16}}><BiRupee/>{customPcProduct.totalPrice * customPcProduct.qty}</h3>    
                      </Col>   
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div onClick={() => openModal2(index)} 
                        className='removecart-btn'> Remove Item </div>
                    </Col>
                  </Row>
                  </Card.Body>  
              </Card>)}) : null}
              <div className="d-flex align-items-center mb-5">
                <FiAlertCircle style={{color:'var(--base-danger, red)', marginRight:10}}/>
                <p style={{fontSize:15, margin:0}}>The above images might vary from the actual product.</p>
              </div>
            </Col>  
            <Col lg={4} md={12} sm={12}>
            <Card id='stackBottom2'/>
            <Card id='displayCard-cart'>
              <div
                className='card bg-transparent'
                  style={{
                  margin: "44px 30px 67px 33px" 
                }}>
                <h5 className="text-center my-3">Price Summary</h5>
                <hr
                  style={{
                    margin: 0,
                    marginBottom: "16px",
                    backgroundColor: "var(--base-white-a5, #30333D)",
                  }}
                />
                <Card.Body>                  
                <Row>
                  <Col>
                    <p style={{ fontSize: "13px", color: "#dbdbdb" }}>
                      Total MRP
                    </p>
                  </Col>
                  <Col>
                    <p style={{ textAlign: "right" }}>
                      Rs. {oldPrice + customPrice}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p style={{ fontSize: "13px", color: "#dbdbdb" }}>
                      Discount on MRP
                    </p>
                  </Col>
                  <Col>
                    <p style={{textAlign: "right" }}>
                      Rs. -{discountOnPrice}
                    </p>
                  </Col>
                </Row>
                {retrieveCoupon.status  ?
                <Row>
                  <Col>
                    <p style={{ fontSize: "13px", color: "#dbdbdb" }}>
                      Coupon discount
                    </p>
                  </Col>
                  <Col>
                    <p style={{textAlign: "right" }}>
                      <p onClick={()=>removeCoupon()} className="cancel">x</p>Rs. - {retrieveCoupon.discount}
                    </p>
                  </Col>
                </Row> : null}
                {/* <Row>
                  <Col>
                    <p style={{ fontSize: "13px", color: "#dbdbdb" }}>
                      Shipping
                    </p>
                  </Col>
                  <Col>
                    <p style={{ textAlign: "right" }}>
                      Free
                    </p>
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                    <div className='input-group mb-3'>
                      <input
                        type='text'
                        onChange={(e) => setCoupon(e.target.value)}
                        value={coupon}
                        className='form-control text-white'
                        placeholder='Discount Code'
                        aria-label="Recipient's username"
                        aria-describedby='basic-addon2'
                        style={{
                          background: "var(--base-white-a10, #141C27)",
                          border: "none",
                          borderRadius: "0px",
                          height: "auto",
                        }}
                      />
                      <div className='input-group-append'>
                        <button onClick={coupon ? handleCoupon : null} className='btn btn-outline-secondary' type='button' style={{background: "var(--base-warning, rgb(34, 244, 238))",color: "var(--base-inverted, black)",borderRadius: "0px"}}>
                          {couponLoading ? <Spinner animation="border" size="sm"/> : 'Apply'}   
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                </Card.Body>
                <hr
                  style={{
                    margin: 0,
                    marginBottom: "16px",
                    backgroundColor: "var(--base-white-a10, #30333D)",
                  }}
                />
                <Card.Body>
                <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Col>
                    <p style={{ fontSize: "13px", color: "var(--base-40, #dbdbdb)" }}>
                      Total Amount
                    </p>
                  </Col>
                  <Col>
                    <h6 style={{ float: "right", textAlign: "right" }}>
                        Rs. {retrieveCoupon.status ? (price + customPrice) - retrieveCoupon.discount : price + customPrice }
                    </h6>
                  </Col>
                </Row>
                {cartProducts.length !== 0 || customPcProducts.length !== 0  ?
                <Col>
                  <Link to={'/Checkout'}>
                    <Button  style={{width:'101%'}} type='submit' id='placeorder-btn' size='lg' block>
                      Place Order
                    </Button>
                  </Link> 
                  </Col>: null }
                </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
          <MyVerticallyCenteredModal 
            id={id}
            show={modalShow}
            onHide={() => setModalShow(false)} />
          <MyVerticallyCenteredModal2 
            id={id2}
            show={modalShow2}
            onHide={() => setModalShow2(false)} />
          <ModalInfo show={moreInfoModal} onHide={()=>setMoreInfoModal(false)}/>
          <CartSpecModal show={cartSpecs} onHide={()=>setCartSpecs(false)}/>
        </Container>}
      </motion.div>
      </section>
    </React.Fragment>
  );
}
const pageData = {
  title: "Your Cart",
  excerpt: 'We Challenger Computer started in the day of valentine in feb 14 1997. we have been serving you with pleasure for past 24 years we treat every customer the same. All our valuable customers are schools colleges leading corporates small and medium enterprisers. Customers satisfaction serves as our foremost priority. <strong> In past 5 years we have been praised for our build such as gaming pc youtubers rendering pc solutions for graphical work editors architect 3d toys designers studio designers.</strong> </p> <p>We strive hard for putting up a happy face in each and every customer who visit our store we are experts in all kind of pc building and software problem we achieved this milestone with our experienced technicians who traveled with us throughout our journey our technicians are with an experience of minimum 20 years in this field we have been working hard from the day one in serving our customers at the doorstep with 3 branches in every corner of the city.</p><strong>Now we begin our new journey for bringing as many as we could fit in our backpack and heading home ready to turn your dream into reality!'
}