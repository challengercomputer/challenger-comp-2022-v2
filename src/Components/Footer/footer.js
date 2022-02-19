import React, { useState } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsX } from "react-icons/bs";
// import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Logo from "../../assets/footerlogo-challenger.png";
import FloatingIcon from "../FloatingIcon";
import Config from "../../store/Config";
// import ccmap from "../../assets/ccmap.png";
import axios from "axios";
// import "./footer.css";
import "./footer.scss";

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
          <ValidatorForm onSubmit={handleSubmit} onError={(errors) => console.log(errors)}>
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
  
const locationList = [
  {
    id: 1,
    title: 'Ambattur',
    link_title: 'See in map',
    link_url: `https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computers/@13.0615232,80.1451109,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a5263aa128dd8a5:0xbeebaecd7a33374c!2m2!1d80.1484565!2d13.1212199`, 
    list: [
      {
        id: 1,
        content: 'Address: 455/7, M.T.H Road, Near by Ambattur O.T,',
      },
      {
        id: 2,
        content: 'Ambattur, Chennai, Tamil Nadu 600053.',
      },
      {
        id: 3,
        content: 'Ph.No:044 4283 6978',
      },
    ]
  },
  {
    id: 2,
    title: 'Mount Road',
    link_title: 'See in map',
    link_url:`https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computer+pvt+ltd/@13.0460306,80.2382422,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a5267c20f7f4217:0x4ca2445a914f87bf!2m2!1d80.2716022!2d13.0689656`,
    list: [
      {
        id: 1,
        content: 'Address: Karnataka Bank Ltd, 839 A, Heera Market,',
      },
      {
        id: 2,
        content: '1st Floor, Anna Salai, Opposite to, Chennai, Tamil Nadu 600002.',
      },
      {
        id: 3,
        content: 'Ph.No:044 42119123',
      },
    ]
  },
  {
    id: 3,
    title: 'Velachery',
    link_title: 'See in map',
    link_url:`https://www.google.com/maps/dir/${latitude},${longitude}/challenger+computers/@12.9947103,80.2012894,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3a525d8edb6db96d:0x552f21405d22aa51!2m2!1d80.2177601!2d12.9822519`,
    list: [
      {
        id: 1,
        content: 'No.1,LAKSHMI NAGAR, 100 FEET BYE PASS ROAD, VELACHERY, Chennai, Tamil Nadu 600042.',
      },
      {
        id: 2,
        content: 'Ph.No: 044 4549 5096',
      },
    ]
  },
]

  return (
    <React.Fragment>
      <footer className='footer-container footer-area'>          

      <section className="contact-us-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-area-top text-center">
                <button 
                  onClick={() => setShowModal(true)} 
                  className="btn btn-outline-light" >
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='footer-area__middle pt-50'>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 mb-5">
              <div className="footer-widget">
                <img height='100' src={Logo} alt='logo' />
              </div>
            </div>
            {LinksList.map(widget => (
              <div key={widget.id} className="col-xl-3 col-lg-3 col-md-6 mb-3">
                <div className="footer-widget">
                  <h3 className="footer-widget__title fs-xl txt-uppercase">{widget.title}</h3>
                  { widget.list ? (
                  <ul className="list-unstyled">
                    {widget.list.map(link => <li key={link.id} className="lh-9"><a href={link.url}>{link.name}</a></li>)}
                  </ul>
                  ): null}
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h3 className="txt-uppercase my-5 text-center fs-2xl">Our Locations</h3>
            </div>
          </div>

          <div className="row">
            {locationList.map(item => (
              <div key={item.id} className="col-xl-4 col-lg-3 col-md-6 mb-5">
                <div className="footer-widget h-100 d-flex flex-column">
                  <h3 className="footer-widget__title fs-xl">{item.title}</h3>
                  <div className="footer-widget__content">
                    <ul className="list-unstyled mb-3">
                      {item.list.map(link => <li key={link.id} className="lh-9">{link.content}</li>)}
                    </ul>
                  </div>
                  <div className="footer-widget__link mt-auto">
                    <a target='_blank' rel="noopener noreferrer" href={item.link_url}>
                      <FaMapMarkerAlt color="var(--base-warning)" size={21}/> <span style={{borderBottom:'1px solid var(--base-40)'}}>See in map</span>
                      </a> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="footer-area__copyright text-center">
        <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="footer-copyright-text text-lg-start my-3">
                  <p className="fs-sm mb-0">{Config.challengers__copyright}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-social my-3">
                  <ul className="list-unstyled footer-area__social">
                    {SocialList.map(link => <li key={link.id}><a title={link.name} href={link.url}>{link.icon}</a></li>)}
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-powerd__link text-lg-end my-3">
                  <p className="fs-sm mb-0">Powerd By: <a href="/">{Config.challengers__title}</a></p>
                </div>
              </div>
          </div>
        </div>
      </section>



        <ContactUsModal show={showModal} onHide={() => setShowModal(false)} />

        <span onClick={()=>setShowModal(true)}>
          <FloatingIcon/>
        </span>
      </footer>
    </React.Fragment>
  );
}

export default Footer;

const LinksList = [
  {
    id: 1,
    title: 'Quick Details',
    list: [
      {
        id: 1,
        name: 'About',
        url: '/about'
      },
      {
        id: 2,
        name: 'Shipping Policy',
        url: '/shippingpolicy'
      },
      {
        id: 3,
        name: 'Privacy Policy',
        url: '/privacypolicy'
      },
      {
        id: 4,
        name: 'Terms and Conditions',
        url: 'https://www.termsfeed.com/live/07076ded-7b1c-4a56-9754-950725e24ddb'
      },
    ]
  },
  {
    id: 2,
    title: 'Build Your Pc',
    list: [
      {
        id: 1,
        name: 'Suggest Me',
        url: '/suggestme'
      },
      {
        id: 2,
        name: 'Customize Yourself',
        url: '/customizeyourself'
      },
    ]
  },
  {
    id: 3,
    title: 'Our Store',
    list: [
      {
        id: 1,
        name: 'Prebuilds',
        url: '/Prebuilds'
      },
      {
        id: 2,
        name: 'Laptops',
        url: '/laptops'
      },
    ]
  },
]

const SocialList = [
  {
    id: 1,
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/challengercomputers/",
  },
  {
    id: 2,
    name: 'Twitter',
    icon: <FaTwitter />,
    url: "https://twitter.com/PvtComputer",
  },
  {
    id: 3,
    name: 'Instagram',
    icon: <FaInstagram />,
    url: "https://instagram.com/challenger_computer?igshid=1enhbnhnobevp",
  },
]