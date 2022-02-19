import React from 'react';
import {Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import error from '../../assets/error-404.png'

export default function Error404 (){
    return(
        <Container>
        <div style={{marginTop:200,textAlign:'center'}}>
            <div style={{marginTop:'10%'}}>
                <img height={150} src={error} alt="error"/>
            </div>
            <div style={{marginTop:'2%'}}>
                <h3>Page not found!</h3>
            </div>    
            <span style={{color:'white',marginTop:'2%',cursor:'pointer', borderBottom:'1px solid red'}}>
                <Link to='/'>go back to main page</Link>
            </span>
        </div>
        </Container>
    )
}