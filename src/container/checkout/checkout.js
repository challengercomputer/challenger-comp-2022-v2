import React, { Component } from "react";
import {connect} from "react-redux";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import { Row, Col, Container, Card, Table, Modal,Accordion } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import {BeatLoader} from "react-spinners";
//material UI
import Button from "react-bootstrap/Button";
// import { InputAdornment } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Typography from "@material-ui/core/Typography";
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import stockImage from '../../assets/search-results.png';
import {withAlert} from 'react-alert';
import meditation from '../../assets/meditation.png';
import "./checkout.css";
import { isLogin } from "../authentication/authUtilities";
import { 
  // CountryDropdown,  CountryRegionData,
   RegionDropdown, } from 'react-country-region-selector';

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
    }
  },
  cssLabel: {
    color: "#DBDBDB",
  },
  cssOutlinedInput: {
    background: " rgba(31, 48, 65, 0.4) !important",
    borderRadius: 0,
  },
  cssFocused: {},
  error: {},
  disabled: {},
});
   

class Checkout extends Component {
  state = {
    loading:false,
    showModal:false,
    loadingModal:false,
    specModal:false,
    customSpecModal:false,
    cashOnDelivery:null,
    buildSpecs:[],
    cartSpecsData:[],
    deliveryMode:'',
    modeOfPayment:'',
    fullname: "",
    email: "",
    address: "",
    phone:"",
    items:[],
    shippingCharge:0,
    DiscountCode:"",
    city: "",
    state: "",
    zipcode: "",
    region:''
  };

  selectRegion (val) {
    this.setState({ region: val });
  }

  handleMail = (event) => {
    const email = event.target.value;
    this.setState({email:email });
  };

  handleName = (event) => {
    const fullname = event.target.value;
    this.setState({fullname:fullname });
  };

  handleAddress = (event) => {
    const address = event.target.value;
    this.setState({address:address });
  };

  handleCity = (event) => {
    const city = event.target.value;
    this.setState({city:city });
  };

  handlePhone = (event) => {
    const phone = event.target.value;
    this.setState({phone:phone });
  };

  handleState = (event) => {
    const state = event.target.value;
    this.setState({state:state });
  };

  handleZipCode = (event) => {
    const zipcode = event.target.value;
    this.setState({zipcode:zipcode });
  };
  handleBuildSpecModal = (ids) => {
    axios.post('/myBuild/customPc/specs', {
      "ids":ids
    })
    .then(res => {
      this.setState({buildSpecs:res.data.customPcSpecs})
      this.setState({customSpecModal:true})
    })    
  }
  handleCartSpecModal = (data) => {
    this.setState({cartSpecsData:data})
    this.setState({specModal:true})
  }
  handlePayment = () => {
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    const updatedArray = this.props.cartProducts.filter((cart) => {
      return cart._id
    })
   this.setState({items: updatedArray})
  }

  handleDeliveryMode = (e) => {
    if(e.target.value === 'postal'){
      this.setState({shippingCharge:0})
    }
    const categoryArray = [];
    if(this.props.cartProducts){
      this.props.cartProducts.map(categoryArr => {
        if(categoryArr.qty > 1){
          for(let i=0; i<categoryArr.qty; i++){
            categoryArray.push(categoryArr.productCategory)
          } 
        } else {
          return categoryArray.push(categoryArr.productCategory)
        }
      })
    }
    if(this.props.customPcProducts){
      this.props.customPcProducts.map(categoryArr => {
        categoryArray.push('Prebuild')
      })
    }

    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    };
    const deliveryData = {
      categoryArray: categoryArray
    };
    if(e.target.value === 'home'){
      axios.post('/payment/calculateDeliveryCharge', deliveryData)
      .then(res => {
        this.setState({shippingCharge:res.data.totalDeliveryCharge})
      })
      .catch(err => {
        alert('something went wrong!')
      })
    }
    this.setState({deliveryMode:e.target.value})
  }
  render() {
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
                        {this.state.cartSpecsData ? this.state.cartSpecsData.map((spec, index) => {          
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
                            </tr>
                          }           
                        }) : null}
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
                        {this.state.buildSpecs ? this.state.buildSpecs.map((spec, index) => {                      
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

  // const route = this.props;

  const {email,fullname,address,city,region,zipcode,phone} = this.state;
  const { classes } = this.props;
  let totalPrice = 0;
  let customPrice = 0;
  if(this.props.cartProducts.length !== 0){
    totalPrice = this.props.cartProducts.reduce((total, cartProduct) => total + (cartProduct.finalPrice * cartProduct.qty) , 0)
  }
  if(this.props.customPcProducts.length !== 0){
    customPrice =  this.props.customPcProducts.reduce((total, customPcProduct) => total + (customPcProduct.totalPrice * customPcProduct.qty), 0)
  } 
    this.loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src ;
        script.onload = () => {
          resolve(true);
        }
        script.onerror = () => {
          resolve(false);
        }
        document.body.appendChild(script);
      });
    }

    let quantities = {};
    this.props.cartProducts.map(cart => {
      return quantities[cart._id] = cart.qty
    })
    let orderDetails;
    
    this.paynow = async() => {
        if(this.props.customPcProducts.length !== 0 && this.props.cartProducts.length !== 0 ){
        orderDetails = {
          fullname:fullname,
          email:email,
          phone :phone,
          address:address,
          city:city,
          state:region,
          zipcode:zipcode,
          items:quantities,
          deliveryCharge:this.state.shippingCharge,
          deliveryMode:this.state.deliveryMode,
          code: this.props.retrieveCoupon.code,
          customPcProducts : this.props.customPcProducts,
          cashOnDelivery:this.state.cashOnDelivery
        }
      } else if(this.props.customPcProducts.length !== 0 && this.props.cartProducts.length === 0) {
        orderDetails = {
          fullname:fullname,
          email:email,
          phone :phone,
          address:address,
          city:city,
          state:region,
          zipcode:zipcode,
          deliveryCharge:this.state.shippingCharge,
          deliveryMode:this.state.deliveryMode,
          code: this.props.retrieveCoupon.code,
          customPcProducts : this.props.customPcProducts,
          cashOnDelivery:this.state.cashOnDelivery
        } 
      } else if(this.props.customPcProducts.length === 0 && this.props.cartProducts.length !== 0) {
        orderDetails = {
            fullname:fullname,
            email:email,
            phone :phone,
            address:address,
            city:city,
            state:region,
            zipcode:zipcode,
            deliveryCharge:this.state.shippingCharge,
            deliveryMode:this.state.deliveryMode,
            code: this.props.retrieveCoupon.code,
            items:quantities,
            cashOnDelivery:this.state.cashOnDelivery
          }
      }

      if(this.state.cashOnDelivery){
        let auth_token = JSON.parse(localStorage.getItem("currentUser"));
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        };
        this.setState({showModal:false})
        this.setState({loadingModal:true})
        if(isLogin()){
          axios.post('/payment/checkout', orderDetails, {headers} )
          .then(res => {
            // localStorage.removeItem('state');
            this.props.emptyData()
            this.props.history.replace({pathname:'/paymentComplete', params:'bank transfer'})
            this.setState({loadingModal:false})
          }) 
          .catch(err => {
            this.setState({loadingModal:false})
            this.props.alert.error(err.response.data.error, {timeout:8000})
          })     
        } else {
          axios.post('/payment/checkout', orderDetails)
          .then(res => {
            // localStorage.removeItem('state');
            this.props.emptyData()
            this.props.history.replace({pathname:'/paymentComplete', params:'bank transfer'})
            this.setState({loadingModal:false})
          }) 
          .catch(err => {
            this.setState({loadingModal:false})
            this.props.alert.error(err.response.data.error, {timeout:8000})
          })     
        }
      } 
      else {
        const res = await this.loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
          return alert('razor pay failed to load')
        }
        let auth_token = JSON.parse(localStorage.getItem("currentUser"));
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        };
        let data;
        if(isLogin()){
          data = await axios.post('/payment/checkout', orderDetails, {headers})
          .then(res => {
            return res.data
          })
          .catch(err => {
             this.props.alert.error(err.response.data.error, {timeout:8000})
          })
        } 
        if(isLogin() === false){
          data = await axios.post('/payment/checkout', orderDetails)
          .then(res => {
            return res.data
          })
          .catch(err => {
            this.props.alert.error(err.response.data.error, {timeout:8000})
          })
        }
        let options;
        if(data){
          options = {
            key: 'rzp_live_31Geq1ye0zUEww' ,
            currency: data.order.currency,
            amount: data.order.amount,
            order_id: data.order.id,
            name: "Challenger Computers",
            description: "Checkout",
            image: require('../YourCart/assets/logo.jpeg'),
            handler: (response) => {
                this.props.emptyData()
                this.props.history.replace('/paymentComplete')
              },
              "prefill": {
                "name": fullname,
                "email": email,
                "contact": phone
            }
          }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        this.setState({loading:false})
      }    
    }

    this.handleSubmit = async () => {
      // if(!this.state.region){
      //   return this.props.alert.error('Please select the State!', {timeout:3000})
      // }
      if(this.state.cashOnDelivery === true){
        return this.setState({showModal:true})
      } else if(this.state.cashOnDelivery === false){
        return this.paynow();
      } else if(this.state.deliveryMode === ''){
        this.props.alert.error('Please select the mode of delivery!', {timeout:8000})
      } else {
        this.props.alert.error('Please select the payment method!', {timeout:8000})
      }       
    };
    const ChooseModal = (props) => {
      return (
      <Modal backdrop="static" {...props}  keyboard={false}>
        <div style={{position:'absolute',cursor:'pointer',right:10,top:-5,fontSize:35}} onClick={()=>this.setState({showModal:false})}><BsX/></div>
        <Modal.Header style={{marginLeft:'auto', marginRight:'auto', fontSize:20}}>Is the shipping address correct?</Modal.Header>
        <Modal.Body>
          <div style={{textAlign:'center'}}>
            <p style={{margin:0, color:'gray'}}>{this.state.fullname},</p>
            <p style={{margin:0, color:'gray'}}>{this.state.address}, {this.state.city}, {this.state.region}.</p>
            <p style={{margin:0, color:'gray'}}>{this.state.zipcode}.</p>
            <p style={{margin:0, color:'gray'}}>{this.state.phone}, {this.state.email}</p>
          </div>
          <Row style={{marginTop:25}}>
            <Col style={{marginBottom:10}} lg={6} md={6} sm={12}>
              <Button onClick={()=>this.setState({showModal:false})} id='update-address-btn' size='lg' block>
                Update address
              </Button>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Button onClick={this.paynow} id='placeorder-btn' size='lg' block>
                Yes! proceed..
              </Button>
            </Col>
        </Row>
        </Modal.Body>
      </Modal>
    );
  }
  const LoadingModal = (props) => {
    return (
    <Modal backdrop="static" {...props}  centered>
      <Modal.Body>
        <Row>
          <Col className="loading-img" lg={3}>
            <img  height={100} src={meditation} alt="placing order"/>
          </Col>
          <Col style={{margin:'auto'}} lg={9}>
            <div className="placing-order">
            <p>PLACING YOUR ORDER</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
    return (
      <React.Fragment>
        <Helmet>
          <title>Check Out | {Config.challengers__sub}</title>
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
          <Toolbar id='toolbar-desktop-space'></Toolbar>
          <Toolbar id='toolbar-mobile-space'></Toolbar>

          <Container style={{ marginTop: 32 }}>
            <Row>
              <Col lg={8} md={12}>
                <h4>Shipping Information</h4>
                <ValidatorForm  onSubmit={this.handleSubmit} onError={(errors) => console.log(errors)}>
                  <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
                    <Col style={{marginBottom:10}} sm={6}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}
                        label='Full Name'
                        variant='filled'
                        onChange={this.handleName}
                        name='fullname'
                        value={fullname}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Col>
                    <Col style={{marginBottom:10}} sm={6}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}
                        label='Email'
                        variant='filled'
                        onChange={this.handleMail}
                        name='email'
                        value={email}
                        validators={["required", "isEmail"]}
                        errorMessages={["this field is required","email is not valid"]}
                      />
                    </Col>

                    <Col style={{marginBottom:10}} sm={12}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}className={classes.textField}
                        label='Street Address, Company Name, Area Name, etc.'
                        variant='filled'
                        onChange={this.handleAddress}
                        name='address'
                        value={address}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Col>

                    <Col style={{marginBottom:10}} sm={6}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}
                        className={classes.textField}
                        label='City'
                        variant='filled'
                        onChange={this.handleCity}
                        name='city'
                        value={city}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Col>
                    <Col style={{marginBottom:10}} sm={6}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}
                        className={classes.textField}
                        // type="number"
                        label='Phone'
                        variant='filled'
                        onChange={this.handlePhone}
                        name='phone'
                        value={phone}
                        validators={["required",'matchRegexp:^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$']}
                        errorMessages={["this field is required"]}
                      />
                    </Col>
                    <Col style={{marginBottom:10}} sm={4}>                      
                        <RegionDropdown
                          defaultOptionLabel="Select State"
                          id="region"
                          country={'India'}
                          value={this.state.region}
                          onChange={(val) => this.selectRegion(val)} />
                    </Col>
                    <Col style={{marginBottom:10}} sm={4}>
                      <TextValidator
                        fullWidth
                        inputProps={{autoComplete: "off",style:{ color: "white" }}}
                        className={classes.textField}
                        label='Zip Code'
                        variant='filled'
                        onChange={this.handleZipCode}
                        name='zipcode'
                        value={zipcode}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Col>
                    <Col style={{marginBottom:10}} sm={4}>
                      <TextValidator
                        fullWidth
                        id='filled-read-only-input'
                        label='Country'
                        defaultValue='India'
                        InputProps={{autoComplete: "off", style:{ color: "white" },readOnly: true}}
                        variant='filled'
                      />
                    </Col>
                  </Row>
                  <RadioGroup aria-label="postal" name="postal">
                    <Row>
                      <Col lg={6} style={{marginBottom:10}}>
                      <p style={{fontSize:20}}>Delivery Mode</p>
                      <label htmlFor="postal" id='payment-option-btn'>
                        <Radio onClick={this.handleDeliveryMode} id="postal" value="postal" name="postal"/><span>Postal Delivery</span>  
                      </label>
                      <p style={{margin:0, fontSize:11}}>(Your parcel will be delivered to your nearest post office with free of cost)</p>
                      </Col>   
                      <Col lg={6} style={{marginBottom:10}}>
                      <p className="hideNbsp" style={{fontSize:20}}>&nbsp;</p>
                      <label htmlFor="home" id='payment-option-btn'>
                        <Radio onClick={this.handleDeliveryMode} id="home" value="home" name="home"/><span>Home Delivery</span>  
                      </label>
                      <p style={{margin:0, fontSize:11}}>(As home delivery is fulfilled by third party vendor we charge you a minimal amount as shipping charge)</p>
                      </Col>                                
                    </Row>
                  </RadioGroup>
                  <RadioGroup aria-label="gender" name="gender1">
                  <Row>
                    <Col style={{marginBottom:10}}>
                      <p style={{fontSize:20}}>Payment Method</p>
                      <label htmlFor="online" id='payment-option-btn'>
                        <Radio onClick={(e)=>this.setState({cashOnDelivery:false})} style={{color:'var(--base-success, green) !important'}} id="online" value="online" name="online"/><span>Pay Online</span>  
                      </label>
                      </Col>                                 
                    </Row>
                      <Accordion  defaultActiveKey='0'>
                          <Card id='CCFilterCard'>
                            <label id='payment-option-btn' htmlFor="cash">
                              <Radio onClick={(e)=>this.setState({cashOnDelivery:true})} style={{color:'var(--base-danger, red)'}} id="cash" value="cash" name="cash"/>Direct Bank Transfer
                            </label>
                            <Accordion.Collapse style={{padding:10}} eventKey='0'>
                              <Card.Body style={{ background:'var(--base-dark, #5a5a5a42)'}}>  
                              <div style={{textAlign:'left'}}>
                                <p style={{fontSize:12}}>
                                  Make your payment directly into our bank account. Please use your Order ID as the payment reference. 
                                  Your order will not be shipped until the funds have cleared in our account.
                                  please do contact 90870 11234 and confirm your order. 
                                  You will receive a confirmation on your mail.
                                </p>
                                <p style={{fontSize:14, marginBottom:5}}>Bank Details: </p>
                                <p style={{fontSize:14, marginBottom:5}}>A/C NAME: Challenger computer pvt Ltd</p>
                                <p style={{fontSize:14, marginBottom:5}}>BANK NAME: Kotak mahindra bank</p>
                                <p style={{fontSize:14, marginBottom:5}}>A/C NO: 3711559669</p>
                                <p style={{fontSize:14, marginBottom:5}}>IFSC CODE: KKBK0000462</p>
                              </div>
                              <div style={{textAlign:'center', marginBottom:10}}>--------------[ OR ]--------------</div>
                              <div style={{fontSize:14}}>Google Pay: 90870 11234</div>     
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                  </RadioGroup>    
                  <Row style={{marginTop:15}}>
                    <Col sm={12}>
                      <Button type='submit' id='placeorder-checkout-btn' size='lg' block>
                        {this.state.loading ? <BeatLoader/> : 'Make Payment'}
                      </Button>
                      <Col sm={12}>
                        <p onClick={()=>this.props.history.goBack()} id='rtntocart-btntxt'>Return to Cart</p>
                      </Col>
                    </Col>
                  </Row>
                </ValidatorForm>
              </Col>

              <Col>
                <Card id='stackBottom-checkout'/>
                <Card id='displayCard-checkout'>
                  <div
                    className='checkout-card card bg-transparent'
                    style={{
                      margin: "18px",
                      marginBottom: "80px",
                      marginTop: "50px",
                    }}>
                    {this.props.cartProducts.map(cartProduct => {
                      return <Table key={cartProduct._id} className='table-borderless text-white'>
                      <tbody>
                        <tr>
                          <td style={{ width: "26%" }}>
                            <Badge badgeContent={cartProduct.qty} color='primary'>
                              {" "}
                              <img
                                src={cartProduct.productImages[0] ? cartProduct.productImages[0].s3URL : stockImage}
                                style={{
                                  width: "100%",
                                  background: "white",
                                  padding: "7px 2px 7px 2px",
                                  borderRadius: "7px",
                                }} alt="laptop"/>
                            </Badge>
                          </td>
                          <td colSpan='2' style={{textTransform:'capitalize', fontSize: "14px" }}>
                            {cartProduct.productName}
                            <p onClick={()=>this.handleCartSpecModal(cartProduct.specifications)} className="fs-sm" style={{cursor:'pointer',marginTop:7, borderBottom:'1px solid white', width:81}}>View Specs</p>
                          </td>
                          <td style={{ fontSize: "14px" }}>Rs. {cartProduct.finalPrice * cartProduct.qty}</td>
                        </tr>
                       </tbody>
                    </Table>})}
                    {this.props.customPcProducts.length !== 0 &&
                    this.props.customPcProducts.map((customPcProduct, index) => {
                      return <Table key={index} className='table-borderless text-white'>
                      <tbody>
                        <tr>
                          <td style={{ width: "26%" }}>
                            <Badge color='primary'>
                              {" "}
                              <img
                                src={customPcProduct.customPcImage}
                                style={{
                                  width: "100%",
                                  background: "white",
                                  padding: "7px 2px 7px 2px",
                                  borderRadius: "7px",
                                }} alt="laptop"/>
                            </Badge>
                          </td>
                          <td colSpan='2' style={{ fontSize: "14px" }}>
                              CUSTOM_PC #{index + 1}
                              <p onClick={()=>this.handleBuildSpecModal(customPcProduct.customPcItemsID)} className="fs-sm" style={{cursor:'pointer',marginTop:7, borderBottom:'1px solid white', width:81}}>View Specs</p>
                          </td>
                          <td style={{ fontSize: "14px" }}>Rs. {customPcProduct.totalPrice}</td>
                        </tr>
                       </tbody>
                    </Table>})}
                    <hr
                      style={{
                        margin: 0,
                        marginBottom: "16px",
                        backgroundColor: "var(--base-white-a10, #30333D)",
                      }}
                    />
                    <Card.Body>

                    <Row>
                      <Col>
                        <p style={{ fontSize: "14px", color: "#dbdbdb" }}>
                          Subtotal
                        </p>
                      </Col>
                      <Col>
                        <p style={{ float: "right", textAlign: "right" }}>
                          Rs. {this.props.customPcProducts.length !== 0 ? totalPrice + customPrice : totalPrice}
                        </p>
                      </Col>
                    </Row>
                    {this.props.retrieveCoupon.status  ?
                  <Row>
                    <Col>
                      <p style={{ fontSize: "13px", color: "#dbdbdb" }}>
                        Coupon discount
                      </p>
                    </Col>
                    <Col>
                      <p style={{textAlign: "right" }}>
                        Rs. - {this.props.retrieveCoupon.discount}
                      </p>
                    </Col>
                  </Row> : null}
                    <Row>
                      <Col>
                        <p style={{ fontSize: "14px", color: "#dbdbdb" }}>
                          Shipping
                        </p>
                      </Col>
                      <Col>
                        <p style={{ float: "right", textAlign: "right" }}>
                          {this.state.deliveryMode === 'postal' || this.state.deliveryMode === '' ? 'FREE' : this.state.shippingCharge}
                        </p>
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
                    <Row>
                      <Col>
                        <p style={{ fontSize: "14px", color: "#dbdbdb" }}>
                          Total
                        </p>
                      </Col>
                      <Col>
                        <h5 style={{ float: "right", textAlign: "right" }}>
                          Rs. {this.props.retrieveCoupon.status ?  (totalPrice + customPrice + this.state.shippingCharge) - this.props.retrieveCoupon.discount  : totalPrice + customPrice + this.state.shippingCharge}
                        </h5>
                      </Col>
                    </Row>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            </Row>
            <ChooseModal 
            show={this.state.showModal}
            onHide={()=>this.setState({showModal:false})}/>
            <LoadingModal 
            show={this.state.loadingModal}
            onHide={()=>this.setState({loadingModal:false})}/>
            <ModalInfo show={this.state.customSpecModal} onHide={()=>this.setState({customSpecModal:false})}/>
            <CartSpecModal show={this.state.specModal} onHide={()=>this.setState({specModal:false})}/>
          </Container>
        </motion.div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    emptyData: () => dispatch({type:'EMPTY_DATA'})
  }
}

const mapStateToProps = state => {
  return {
    retrieveCoupon: state.coupon,
    cartProducts: state.cartProducts,
    customPcProducts: state.customPcProducts
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withAlert()(Checkout)));
