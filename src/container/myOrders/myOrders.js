import React, { useState, useEffect } from "react";
import { FcApproval, FcShipped, FcHome } from 'react-icons/fc';
import {FiHome, FiNavigation, FiCheckCircle} from 'react-icons/fi';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Row, Col,  Container, Card, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import {Toolbar} from "@material-ui/core";
import "react-step-progress-bar/styles.css";
import sad from "../../assets/sad.png";
import { ProgressBar, Step } from "react-step-progress-bar";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import stockImage from '../../assets/noimage.png';
import { motion } from "framer-motion";
import './myOrders.css';
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 }
};


export default function MyOrders(){
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [detailedOrder, setDetailedOrder] = useState('');
    const [id, setId] = useState(null);
    const alert = useAlert();

    useEffect(() => {
      window.scrollTo(0,0);
        let auth_token = JSON.parse(localStorage.getItem("currentUser"));
        let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`,
        };
        axios.get('/orders', {headers})
        .then(res => {
            setOrders(res.data.orders)
            setLoading(false)
        })
        .catch(error => {
            setOrders(false)
        })
    }, [])

   
    const handleMoreDetails = (order) => {
      setDetailedOrder(order)
      setId(id);
      setModalShow(true);
    }
  
    const MyVerticallyCenteredModal = (props) => {
      return (
      <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>Delivery Details</Modal.Header>
        <Modal.Body>
        {props.data ? <Container>
          <Row>
            <div>
              <div style={{fontSize:15}}>
                <p style={{marginBottom:0, marginTop:-10}}>{props.data.deliveryInformation.fullname}</p>
                <div>{props.data.deliveryInformation.address}</div>
                <p>Phone Number: {props.data.deliveryInformation.phone}</p>
              </div>
            </div>
          </Row>
          <ProgressBar percent={props.data.deliveryStatus === 'delivered' ? 100 : props.data.deliveryStatus === 'dispatched' ? 55 : 5 } filledBackground={"linear-gradient(to right, #22f4ee,  #20a8a4)"}>
            <Step transition="scale">
              {({ accomplished }) => (
                <div style={{marginRight:23}}>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Ordered</Tooltip>}>
                  <FiCheckCircle className="pointer" size={25}/>
                  </OverlayTrigger>
                </div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <div>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Dispatched</Tooltip>}>
                  <FiNavigation className="pointer" size={25}/>
                  </OverlayTrigger>
                </div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <div style={{marginLeft:20}}>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delivered</Tooltip>}>
                  <FiHome className="pointer" size={25}/>
                  </OverlayTrigger>
                </div>
              )}
            </Step>
      </ProgressBar> 
      </Container>: null}
        </Modal.Body>
      </Modal>
    );
  }

  if(loading){
    return (
      <div className="py-150 d-flex justify-content-center">
        <ScaleLoader
          size={75}
          color={'var(--base-danger, red)'}/>
      </div>)
    }

  if(orders.length === 0){
    return <section className="myorder-area pt-150 pb-70 text-center">
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
          <img height={150} src={sad} alt="noresults"/>
          <h5 style={{marginTop:30}}>You haven't made any orders yet!</h5>
    </section>
  }
    return (
      <React.Fragment>
        <section className="myorder-area pt-150 pb-70">
          
          <Helmet>
            <title>{ pageData.title } | {Config.challengers__title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="Pc Build website" />

            <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

            <meta property="og:description" content={pageData.excerpt} />
            <meta itemprop="description" content={pageData.excerpt} />
            <meta name="twitter:description" content={pageData.excerpt} />
          </Helmet>

          <motion.div initial='out' animate='in' exit='out' variants={pageTransition}>
            <Container style={{ marginTop: 16 }}> 
            {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
            <Toolbar id='toolbar-mobile-space'></Toolbar>
            <Toolbar id='toolbar-mobile-space'></Toolbar> */}
              <h4>My Orders</h4>
              {orders !== 0 ? 
                  orders.map(order => {
                    let date;
                    let month;
                    let year;
                    let orderedDate;
                    let orderedMonth;
                    let orderedYear;
                    if(order.deliveryDate){
                      const createdDate = new Date(order.deliveryDate);
                      date = createdDate.getDate();
                      month = createdDate.toLocaleString('default',{month:'short'});
                      year = createdDate.getFullYear();
                    }
                    const createdDate = new Date(order.createdAt);
                    orderedDate = createdDate.getDate();
                    orderedMonth = createdDate.toLocaleString('default',{month:'long'});
                    orderedYear = createdDate.getFullYear();
                  return(
                  <Card style={{marginBottom:'10px', width: '100%', background:'#121921'}}>
                      <div className="order-headings">
                          <p style={{marginLeft:30}}>Ordered Date: {orderedDate} {orderedMonth}, {orderedYear}</p>
                          <p onClick={() => handleMoreDetails(order)} className="more-details">More Details</p>
                      </div>
                    <Link>
                    {order.items.map(item => {
                    return( 
                    <Row lg={12} md={12} sm={12} xs={12}>
                      <Col lg={2} md={2} sm={2} xs={4}>
                        {/* <Link to={`/Prebuilds/${item._id}`}> */}
                          <img src={item.image ? item.image : stockImage} className="order-image" alt="laptop"/>
                        {/* </Link> */}
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <div className="order-description">
                            <p style={{marginTop: '20px'}}>{item.itemName}</p>
                            <p style={{fontSize: '13px', color: 'darkgray'}}>Seller: Challenger Computers</p>
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={2} xs={3}>
                          <div className="order-price">
                            <p style={{marginTop: '20px'}}>Rs. {item.price}</p>
                          </div>
                      </Col>
                      <Col lg={3} md={3} sm={3} xs={12}>
                          <div className="order-delivery">
                              <p style={{marginTop: '20px'}}>{order.deliveryDate ? `Delivered on ${month} ${date}, ${year}` : 'In Progress'}</p>
                              <p style={{fontSize: '13px', color: 'darkgray'}}>{order.deliveryStatus === 'order' ? 'Your Order has been received' : order.deliveryStatus === 'dispatched' ? 'Your item has been dispatched' : 'Your item has been Delivered'}</p>
                          </div>
                      </Col>
                    </Row>)})}
                    {order.customPc.map((item, index) => {
                    return( 
                    <Row key={index} lg={12} md={12} sm={12} xs={12}>
                      <Col lg={2} md={2} sm={2} xs={4}>
                        {/* <Link to={`/Prebuilds/${item._id}`}> */}
                          <img src={item.customPcImage} className="order-image" alt="laptop"/>
                        {/* </Link> */}
                      </Col>
                      <Col lg={5} md={5} sm={5} xs={5}>
                        <div className="order-description">
                            <p style={{marginTop: '20px'}}>Your Customized Pc</p>
                            <p style={{fontSize: '13px', color: 'darkgray'}}>Seller: Challenger Computers</p>
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={2} xs={3}>
                          <div className="order-price">
                            <p style={{marginTop: '20px'}}>Rs. {item.customPcPrice}</p>
                            <p style={{width:'50%', textAlign:'center',marginTop: '-20px', marginBottom: '5px'}}> + </p>
                            <p style={{marginTop: '-10px',fontSize: '13px', color: 'gray'}}>Rs. {item.customPcCharge} charge</p>
                          </div>
                      </Col>
                      <Col lg={3} md={3} sm={3} xs={12}>
                          <div className="order-delivery">
                              <p style={{marginTop: '20px'}}>{order.deliveryDate ? `Delivered on ${month} ${date}, ${year}` : 'In Progress'}</p>
                              <p style={{fontSize: '13px', color: 'darkgray'}}>{order.deliveryStatus === 'order' ? 'Your Order has been received' : order.deliveryStatus === 'dispatched' ? 'Your item has been dispatched' : 'Your item has been Delivered'}</p>
                          </div>
                      </Col>
                    </Row>)})}
                    </Link>
                  
                  </Card>)})  :
                  <Card style={{color: "white",background: "none",borderRadius: 0}}>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Title style={{fontWeight: "700",textAlign:'center'}}>
                              No Orders
                          </Card.Title>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>}
            </Container>
            <MyVerticallyCenteredModal 
              data={detailedOrder}
              show={modalShow}
              onHide={() => setModalShow(false)}/>
          </motion.div>
        </section>
      </React.Fragment>
    );
  }

const pageData = {
  title: "My Orders",
  excerpt: 'Best Pc Builder Challenger Computer Orders.'
}