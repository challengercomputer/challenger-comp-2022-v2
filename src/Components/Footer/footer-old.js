import React, { useState } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Logo from "../../assets/footerlogo-challenger.png";
import FloatingIcon from "../FloatingIcon";
import ccmap from "../../assets/ccmap.png";
import axios from "axios";
import "./footer.css";

function Footer() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const alert = useAlert();
  window.navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });
  const [showModal, setShowModal] = useState(false);
  let name;
  let email;
  let phone;
  let subject;
  let message;

  const handleSubmit = () => {
    if (name && email && phone && subject && message) {
      axios
        .post("/contact/contactUs", {
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message,
        })
        .then((res) => {
          setShowModal(false);
          alert.success("Request submitted! will get back to you!", {
            timeout: 3000,
          });
        })
        .catch((err) => {
          alert.error(err.response.data.error, { timeout: 3000 });
        });
    } else {
      // alert.failure("All fields are mandatory!", { timeout: 3000 });
    }
  };
  const ContactUsModal = (props) => {
    return (
      <Modal
        backdrop='static'
        className='cart-remove'
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <div style={{ display: "flex" }}>
          <h3 style={{ paddingLeft: 15, paddingTop: 15 }}>CONTACT US</h3>
          <div onClick={props.onHide} className='close-icon'>
            <BsX />
          </div>
        </div>
        <Modal.Body>
          <ValidatorForm onError={(errors) => console.log(errors)}>
            <Row style={{ marginTop: "15px", marginBottom: "24px" }}>
              <Col style={{ marginBottom: 10 }} lg={6} md={6} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{
                    autoComplete: "off",
                    style: { color: "white" },
                  }}
                  label='Your Name'
                  variant='filled'
                  onChange={(e) => (name = e.target.value)}
                  name='Your Name'
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Col>
              <Col style={{ marginBottom: 10 }} lg={6} md={6} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{
                    autoComplete: "off",
                    style: { color: "white" },
                  }}
                  label='Email Address'
                  variant='filled'
                  onChange={(e) => (email = e.target.value)}
                  name='email'
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
              <Col style={{ marginBottom: 10 }} lg={6} md={6} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{
                    autoComplete: "off",
                    style: { color: "white" },
                  }}
                  label='Phone Number'
                  variant='filled'
                  onChange={(e) => (phone = e.target.value)}
                  name='Phone Number'
                  value={phone}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Col>
              <Col style={{ marginBottom: 10 }} lg={6} md={6} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{
                    autoComplete: "off",
                    style: { color: "white" },
                  }}
                  label='Subject'
                  variant='filled'
                  onChange={(e) => (subject = e.target.value)}
                  name='Subject'
                  value={subject}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
              <Col style={{ marginBottom: 10 }} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{
                    autoComplete: "off",
                    style: { color: "white" },
                  }}
                  label='Enter Your Message'
                  variant='filled'
                  onChange={(e) => (message = e.target.value)}
                  name='Enter Your Message'
                  value={message}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Button
                  onClick={handleSubmit}
                  style={{ borderRadius: 0, padding: 10, width: "25%" }}
                  variant='outline-dark'>
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </ValidatorForm>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <React.Fragment>
      <Container>
        <div
          style={{
            background: "#22F4EE",
            paddingTop: "13px",
            paddingBottom: "13px",
            marginTop: "100px",
            textAlign: "center",
          }}
          id='footer-top'>
          <h5 style={{ color: "black", margin: 0 }}>
            <Row>
              <Col>
                <Button
                  onClick={() => setShowModal(true)}
                  style={{
                    marginLeft: "20px",
                    background: "none",
                    border: " 1px solid black",
                    color: "black",
                    borderRadius: "0px",
                  }}>
                  CONTACT US
                  {/* <a href="tel:+91 9087011234">CALL US</a> */}
                </Button>
              </Col>
            </Row>
          </h5>
        </div>
      </Container>
      <footer
        className='footer-container'
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "black",
        }}>
        <Container id='ContainerWidth'>
          <Row>
            <Col style={{ textAlign: "center" }} lg={3} md={6} sm={6}>
              <div style={{ marginBottom: 10 }}>
                <img height='100' src={Logo} alt='logo' />
              </div>
            </Col>

            <Col style={{ textAlign: "center" }} lg={3} md={6} sm={6}>
              <div className='font-weight-bold text-uppercase text-light mb-3'>
                QUICK Details
              </div>
              <ul className='list-unstyled'>
              <li>
                  <Link className='text-muted' to='/about'>
                    About
                  </Link>
                </li>
                <li>
                  <Link className='text-muted' to='/shippingpolicy'>
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link className='text-muted' to='/privacypolicy'>
                    Privacy Policy
                  </Link>
                </li>
                <li className='text-muted'>
                  <a href="https://www.termsfeed.com/live/07076ded-7b1c-4a56-9754-950725e24ddb" target="_blank">Terms and Conditions</a>
                </li>
              </ul>
            </Col>

            <Col style={{ textAlign: "center" }} lg={3} md={6} sm={6}>
              <div
                style={{ color: "white" }}
                className='font-weight-bold text-uppercase text-light mb-3'>
                BUILD YOUR PC
              </div>
              <ul className='list-unstyled'>
                <li>
                  <Link className='text-muted' to='/suggestme'>
                    Suggest Me
                  </Link>
                </li>
                <li>
                  <Link className='text-muted' to='/customizeyourself'>
                    Customize Yourself
                  </Link>
                </li>
              </ul>
            </Col>

            <Col style={{ textAlign: "center" }} lg={3} md={6} sm={6}>
              <div className='font-weight-bold text-uppercase text-light mb-3'>
                Our Store
              </div>
              <ul className='list-unstyled'>
                <li>
                  <Link className='text-muted' to='/Prebuilds'>
                    Prebuilds
                  </Link>
                </li>
                <li>
                  <Link className='text-muted' to='/laptops'>
                    Laptops
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5 style={{ fontWeight: "bold", color: "white" }}>
              OUR LOCATIONS
            </h5>
          </div>
          <Row>
            <Col lg={4} md={6} sm={6}>
              <div
                style={{ marginTop: 20 }}
                className='font-weight-bold text-light'>
                Ambattur
              </div>
              <ul className='list-unstyled'>
                <li>
                  <a
                    className='text-muted'
                    target='_blank'>
                    Address: 455/7, M.T.H Road, Near by Ambattur O.T, Ambattur,
                    Chennai, Tamil Nadu 600053.<br/> Ph.No:044 4283 6978
                  </a>
                </li>
                <p style={{color:"#22f4ee", cursor:'pointer'}}>
                  <a target='_blank' href={`https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computers/@13.0615232,80.1451109,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a5263aa128dd8a5:0xbeebaecd7a33374c!2m2!1d80.1484565!2d13.1212199`}>
                    <FaMapMarkerAlt color="#22f4ee" size={21}/> <span style={{borderBottom:'1px solid'}}>See in map</span></a> 
                </p> 
              </ul>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div
                style={{ marginTop: 20 }}
                className='font-weight-bold text-light'>
                Mount Road
              </div>
              <ul className='list-unstyled'>
                <li>
                  <a
                    className='text-muted'
                    target='_blank'>
                    Address: Karnataka Bank Ltd, 839 A, Heera Market, 1st Floor,
                    Anna Salai, Opposite to, Chennai, Tamil Nadu 600002.<br/> Ph.No:044 42119123
                  </a>
                </li>
                <p style={{color:"#22f4ee", cursor:'pointer'}}>
                  <a target='_blank' href={`https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computer+pvt+ltd/@13.0460306,80.2382422,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a5267c20f7f4217:0x4ca2445a914f87bf!2m2!1d80.2716022!2d13.0689656`}>
                    <FaMapMarkerAlt color="#22f4ee" size={21}/> <span style={{borderBottom:'1px solid'}}>See in map</span></a> 
                </p> 
              </ul>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div
                style={{ marginTop: 20 }}
                className='font-weight-bold  text-light'>
                Velacherry
              </div>
              <ul className='list-unstyled'>
                <li>
                  <a
                    className='text-muted'
                    >
                    No.1,LAKSHMI NAGAR, 100 FEET BYE PASS ROAD, VELACHERY,
                    Chennai, Tamil Nadu 600042.<br/> Ph.No: 044 4549 5096
                  </a>
                </li>
                <p style={{color:"#22f4ee", cursor:'pointer'}}>
                  <a target='_blank' href={`https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computers/@12.9947103,80.2012894,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a525d8edb6db96d:0x552f21405d22aa51!2m2!1d80.2177601!2d12.9822519`}>
                    <FaMapMarkerAlt color="#22f4ee" size={21}/> <span style={{borderBottom:'1px solid'}}>See in map</span></a> 
                </p>               
              </ul>
            </Col>
          </Row>
          <Row style={{marginBottom:0}}>
            <Col>
                <div style={{color:'white', marginTop:30, textAlign:'center'}}>
                    <a href="https://www.facebook.com/challengercomputers/" target="_blank">
                    <FaFacebookF className="facebook-hover" style={{marginRight:15}} size="25"/>
                    </a>
                    <a href="https://twitter.com/PvtComputer" target="_blank">
                    <FaTwitter className="twitter-hover" style={{marginRight:15}} size="25"/>
                    </a>
                    <a href="https://instagram.com/challenger_computer?igshid=1enhbnhnobevp" target="_blank">
                    <FaInstagram className="instagram-hover" size="25"/>
                    </a>
                </div>
            </Col>
          </Row>
          <ContactUsModal show={showModal} onHide={() => setShowModal(false)} />
        </Container>
        <span onClick={()=>setShowModal(true)}>
          <FloatingIcon/>
        </span>
      </footer>
    </React.Fragment>
  );
}

export default Footer;