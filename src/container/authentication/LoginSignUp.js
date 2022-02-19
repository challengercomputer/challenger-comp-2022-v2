import React, { useState, useDispatch, useEffect } from "react";
import { useAlert } from 'react-alert'
import axios from 'axios';
import { BsX } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { InputAdornment } from "@material-ui/core";
import { withStyles, StylesProvider } from "@material-ui/core/styles";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './authentication.css';



const styles = (theme) => ({
  root1: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
    }
  },
  cssLabel1: {
    color: "#DBDBDB",
  },
  cssOutlinedInput1: {
    background: " rgba(31, 48, 65, 0.4) !important",
    borderRadius: 0,
  },
  cssFocused1: {},
  error1: {},
  disabled1: {},
});

function AuthenticationPopup(props) {

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [toggle, setToggle] = useState('signIn');

  const { classes } = props;
  const alert = useAlert()

  const responseGoogle = (response) => {
    if(response.error){
      return alert.error(response.error, {timeout:3000});
    } else {
      const  data = {
        "loginMethod": "google",
        "email": response.profileObj.email,
        "password": response.profileObj.googleId,
        "username": response.profileObj.name
      }

      axios.post('/signup', data)
      .then(res => {
        props.onHide();
        localStorage.setItem('currentUser', JSON.stringify(res.data.token))
        alert.show(`Signed in as ${response.profileObj.name}`, {
          timeout:2000,
          type:'success'
        })
      })
      .catch(error => {
        props.onHide();
        alert.show(error.response.data.error, {
          timeout:2000,
          type:'failure'
        })
      })
    }
  }
  
  const responseFacebook = (response) => {
    if(response.status === 'unknown'){
      return;
    } else {
      const  data = {
        "loginMethod": "facebook",
        "email": response.email,
        "password": response.userID,
        "username": response.name
      }
      axios.post('/signup', data)
      .then(res => {
        props.onHide();
        localStorage.setItem('currentUser', JSON.stringify(res.data.token))  
        alert.show(`Signed in as ${response.name}`, {
          timeout:2000,
          type:'success'
        })
      })
      .catch(error => {
        props.onHide();
        alert.error(error.response.data.error, {
          timeout:3000,
        })
      })
    }
  }

  const handleSignIn = () => {
    setLoading(true);
    const data = {
      "email": email,
      "password": loginPassword
    }
    axios.post('/login', data)
    .then(res => {
      props.onHide();
      localStorage.setItem("currentUser", JSON.stringify(res.data.token));
      setLoading(false);  
      alert.success('Logged in successfully', {
        timeout:3000
      });
    })
    .catch(error => {
      setLoading(false);
      alert.error(error.response.data.error, {
        timeout:3000,
      });
    })
  }

  const handleSignUp = () => {
    if(confirmPassword !== signupPassword){
      props.onHide();
      return alert.error('password mismatch', {timeout:3000})
    }
    setLoading(true);
    const data = {
      "loginMethod" : "email",
      "username": username,
      "email" : email,
      "password": confirmPassword
    }
    axios.post('/signup', data)
    .then(res => {
      props.onHide();
      localStorage.setItem("currentUser", JSON.stringify(res.data.token));
      setLoading(false);
      alert.success('Logged in successfully', {
        timeout:3000
      })
    })
    .catch(error => {
      props.onHide();
      setLoading(false);
      alert.error(error.response.data.error, {
        timeout:3000
      })
    })
  }

  const handleForgotPassword = () => {
    setLoading(true)
    axios.post('/forgotPassword', {
      'email': email
    })
    .then(res => {
      setToggle('resetpassword')
      setLoading(false)
      alert.success(`otp sent to ${email}`, {
        timeout:3000
      })  
    })
    .catch(error => {
      setLoading(false)
      alert.error(error.response.data.error, {
        timeout:3000
      })
    })
  }

  const handleSetResetPassword = () => {
    setLoading(true);
    const data = {
      "resetToken": otp,
      "password": forgotConfirmPassword
    }

    axios.put('/resetPassword', data)
    .then(res => {
      setLoading(false);
      alert.success('password changed successfully!', {
        timeout:3000
      })
      setToggle('signIn')
    })
    .catch(error => {
      setLoading(false);
      alert.error(error.response.data.error, {
        timeout:3000
      })
    })
  }
  
  const onChangePassword = (event) => {

    if(event.target.name === 'signupPassword'){
      setSignupPassword(event.target.value)
    } else {
      setConfirmPassword(event.target.value)
    }  
  }

  const renderForm = () => {
    if(toggle === 'signIn'){
      return (
        <React.Fragment>
        <div style={{display:'flex'}}>
          <h3>SIGN IN</h3>
          <div onClick={props.onHide} className="close-icon"><BsX/></div>
        </div>
      <ValidatorForm onSubmit={handleSignIn} onError={(errors) => console.log(errors)}>
            <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
              <Col style={{marginBottom:10}} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete: "off",style:{ color: "white" }}}
                  label='Email Address'
                  variant='filled'
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required","email is not valid"]}
                />
              </Col>
              <Col style={{marginBottom:10}} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete: "off",style:{ color: "white" }}}
                  InputProps={{endAdornment: (
                    <InputAdornment style={{background:'rgba(31, 48, 65, 0.4)'}} onClick={() => setShow(!show)} position="end">
                      {show ? <AiOutlineEye/> : <AiOutlineEyeInvisible />}
                    </InputAdornment>
                  ),}}
                  label='Password'
                  variant='filled'
                  type={show ? 'text' : 'password'}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  name='password'
                  value={loginPassword}
                  validators={["required",'matchRegexp:^.{6,15}$']}
                  errorMessages={["this field is required", 'password should be between 6 - 15 characters']}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom:10, textAlign: 'right'}}>
                <span style={{cursor:'pointer'}} onClick={() => setToggle('forgot')}>Forgot password?</span>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col lg={6}>
                <Button type="submit" variant="outline-dark">{loading ? 'SIGNING IN... ' : 'SIGN IN'}</Button>
              </Col>
              <Col lg={6}>
                <Button onClick={() => setToggle('signUp')} variant="outline-dark">SIGN UP</Button>
              </Col>
            </Row>
            </ValidatorForm>
          </React.Fragment>
      );
    } else if(toggle === 'signUp') {
      return (
        <React.Fragment>
        <div style={{display:'flex'}}>
          <h3>SIGN UP</h3>
          <div onClick={props.onHide} className="close-icon"><BsX/></div>
        </div>
      <ValidatorForm className={classes.root} onSubmit={handleSignUp} onError={(errors) => console.log(errors)}>
            <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
            <Col style={{marginBottom:10}} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete:"off",style:{ color: "white" }}}
                  label='Username'
                  variant='filled'
                  onChange={(e) => setUsername(e.target.value)}
                  name='Username'
                  value={username}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Col>
              <Col style={{marginBottom:10}} sm={12}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete: "off",style:{ color: "white" }}}
                  label='Email Address'
                  variant='filled'
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required","email is not valid"]}
                />
              </Col>
              <Col style={{marginBottom:10}} sm={6}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete: "off",style:{ color: "white" }}}
                  label='Password'
                  variant='filled'
                  type='password'
                  onChange={onChangePassword}
                  name='signupPassword'
                  value={signupPassword}
                  validators={["required",'matchRegexp:^.{6,15}$']}
                  errorMessages={["this field is required", 'password should be between 6 - 15 characters']}
                />
              </Col>
              <Col style={{marginBottom:10}} sm={6}>
                <TextValidator
                  fullWidth
                  inputProps={{autoComplete: "off",style:{ color: "white" }}}
                  label='Confirm Password'
                  variant='filled'
                  onChange={onChangePassword}
                  name='Confirm password'
                  type='password'
                  value={confirmPassword}
                  validators={["required",'matchRegexp:^.{6,15}$']}
                  errorMessages={["this field is required", 'password should be between 6 - 15 characters']}
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col style={{marginBottom:10}} lg={12}>
                <Button type="submit" variant="outline-dark">{loading ? 'SIGNING UP...' : 'SIGN UP'}</Button>
              </Col>
            </Row>
            </ValidatorForm>
          </React.Fragment>
      )
    }
  }


  const renderForgotForm = () => {
    if(toggle === 'forgot'){
      return <Modal.Body>
        <div style={{display:'flex'}}>
          <h3 className="forgort-password">FORGOT PASSWORD</h3>
          <div onClick={props.onHide} className="close-icon"><BsX/></div>
        </div>
      <ValidatorForm className={classes.root} onSubmit={handleForgotPassword} onError={(errors) => console.log(errors)}>
          <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
            <Col sm={12}>
              <TextValidator
                fullWidth
                inputProps={{autoComplete: "off",style:{ color: "white" }}}
                label='Email Address'
                variant='filled'
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required","email is not valid"]}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={6}>
              <Button type="submit" variant="outline-dark">{loading ? 'Sending otp...' : 'Submit'}</Button>
            </Col>
            <Col lg={6}>
              <Button onClick={() => setToggle('signIn')} variant="outline-dark">Go back to Sign In</Button>
            </Col>
          </Row>
          </ValidatorForm>
    </Modal.Body>
    } else if(toggle === 'resetpassword'){
      return <Modal.Body>
      <div style={{display:'flex'}}>
      <h3>SET NEW PASSWORD</h3>
      <div onClick={props.onHide} className="close-icon"><BsX/></div>
    </div>
  <ValidatorForm className={classes.root} onSubmit={handleSetResetPassword} onError={(errors) => console.log(errors)}>
      <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
        <Col sm={12}>
          <TextValidator
            fullWidth
            inputProps={{autoComplete: "off",style:{ color: "white" }}}
            label='Enter Otp'
            variant='filled'
            onChange={(e) => setOtp(e.target.value)}
            name='Enter Otp'
            value={otp}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Col>
        <Col sm={6}>
          <TextValidator
            fullWidth
            inputProps={{autoComplete: "off",style:{ color: "white" }}}
            label='Password'
            variant='filled'
            onChange={(e) => setForgotPassword(e.target.value)}
            name='password'
            value={forgotPassword}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Col>
        <Col sm={6}>
          <TextValidator
            fullWidth
            inputProps={{autoComplete: "off",style:{ color: "white" }}}
            label='Confirm Password'
            variant='filled'
            onChange={(e) => setForgotConfirmPassword(e.target.value)}
            name='Confirm Password'
            value={forgotConfirmPassword}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col lg={12}>
          <Button type="submit" variant="outline-dark">{loading ? 'Please wait...' : 'Submit'}</Button>
        </Col>
      </Row>
      </ValidatorForm>
</Modal.Body>
    }
  }

  return (
    <StylesProvider>
    <Modal backdrop="static" {...props}  size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      {toggle === 'forgot' || toggle === 'resetpassword' ? 
      renderForgotForm() :
      <Modal.Body  style={{ padding:'30px' }}>
        {renderForm()}
        <br/>
        <Row>
          <Col lg={6}>
              <GoogleLogin
                className="google-button"
                clientId="259231562561-3c59sna9l1ehgdrvhd4v2g8d01jhlujf.apps.googleusercontent.com"
                buttonText={"Sign in with Google"}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
          </Col>
          <Col lg={6}>
              <FacebookLogin
                cssClass="facebook-button"
                appId="2722882751307293"
                textButton={<p className="logo-adjust">Sign in with facebook</p>}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                icon={<FaFacebookSquare size={25}/>}/>
          </Col>
        </Row>
        {toggle === 'signUp' &&
        <Row>
        <Col style={{marginTop:10,textAlign:'center'}} lg={12}>
          <Button style={{background:'none', border:'none'}} onClick={() => setToggle('signIn')}>Back to Sign In</Button>
        </Col>
      </Row>}
      </Modal.Body>}
    </Modal>
    </StylesProvider>
  );
}

export default withStyles(styles)(AuthenticationPopup);