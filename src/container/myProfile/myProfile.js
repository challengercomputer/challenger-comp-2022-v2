import React, {useEffect, useState} from 'react';
import { Container, Button, Row, Col, Modal, Form } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import avatar from '../../assets/man.png';
import { motion } from "framer-motion";
// import Toolbar from "@material-ui/core/Toolbar";
import { 
  // isLogin, 
  logout } from "../../container/authentication/authUtilities";
import {ScaleLoader} from "react-spinners";
import axios from 'axios';
import './myProfile.css';
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";


const pageTransition = {
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  
function MyProfile(props) {

  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [details, setDetails] = useState('');
  const auth_token = JSON.parse(localStorage.getItem("currentUser"));
  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${auth_token}`,
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/profile', {headers})
    .then(res => {
      setLoading(false)
      setDetails(res.data.client)
      const nameData = res.data.client.username.split(' ')
      setFirstName(nameData[0]);
      setLastName(nameData[1]);
    })
    .catch(res => {
      console.log(res)
    })
  },[headers])

  const handleLogout = () => {
    axios.post('/logout', {}, {headers})
    .then(res => {
      logout();
      setModalShow(false); 
      props.history.push('/')
      alert.success('Successfully logged out', {
        timeout:2000
      }) 
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const MyVerticallyCenteredModal = (props) => {
    return (
    <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>Logout</Modal.Header>
      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setModalShow(false)}>Cancel</p>
        <Button onClick={handleLogout} variant="danger">Logout</Button>
      </Modal.Footer> 
    </Modal>
  );
}

if(loading){
  return (<div className="py-150 d-flex justify-content-center">
  <ScaleLoader
    size={75}
    color={'var(--base-danger, red)'}/>
</div>)
}
    return (
    <React.Fragment>
      <section className="profile-page-area pt-150 pb-70">

      {details &&
        <Helmet>
          <title>{details.username} | { pageData.title } | {Config.challengers__title}</title>
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
      }

      <motion.div
        initial='out'
        animate='in'
        exit='out'
        variants={pageTransition}>
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar> */}
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar> */}
        {/* <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        {/* <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        <Container id='ContainerWidth'>
          <Row>
            <Col lg={3} md={3} sm={12} className="mb-5 mb-md-0">
              <div className="card bg-transparent h-100">
                <Row>
                  <Col>
                    <div className="card-body mb-4 bg-base-dark welcome-container">
                      <div className="welcome d-flex align-items-center">
                        <img className="me-3" height="50" src={avatar} alt={details.username}/>
                        <div>
                        <p className="mb-0">Hello,</p>
                        <p className="mb-0 name">{details.username}</p>
                        </div>
                      </div> 
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="account card-body bg-base-dark">
                      <div className="sections">
                        <p style={{color:'var(--base-warning, cyan)'}}>ACCOUNT INFORMATION</p> 
                      </div>
                      <div className="sections">
                        <p onClick={()=>props.history.push('/myorders')}>MY ORDERS</p> 
                      </div>
                      <div className="sections">
                        <p onClick={()=>props.history.push('/mylist')}>SAVED LIST</p> 
                      </div>
                      <div className="sections">
                        <p onClick={()=>setModalShow(true)}>LOGOUT</p> 
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>            
            <Col lg={9} md={9} sm={12}> 
              <div className="card h-100 card-body bg-base-dark">
                    <h3 style={{paddingBottom:'20px'}}>Account Information</h3>
                    <Row style={{marginBottom:'35px'}}>
                      <Col>
                        <TextField disabled id="filled-basic" label={firstName} variant="filled" />
                      </Col>
                      <Col>
                      <TextField disabled id="filled-basic" label={lastName} variant="filled" />
                      </Col>
                    </Row>
                    <Row style={{marginBottom:'35px'}}>
                      <Col>
                      <TextField disabled id="filled-basic" label={details.email} variant="filled" />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <TextField style={{textTransform:'capitalize'}} disabled id="filled-basic" label={`logged in using ${details.loginMethod}`} variant="filled" />
                      </Col>
                    </Row>
                </div>
            </Col>
          </Row>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
        </Container>
      </motion.div>
      </section>
    </React.Fragment>
    )
}

export default MyProfile;

const pageData = {
  title: "Profile",
  excerpt: 'Best Pc Builder User Profile Information.'
}