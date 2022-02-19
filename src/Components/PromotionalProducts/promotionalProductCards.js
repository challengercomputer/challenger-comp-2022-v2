import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {Button, Row, Col, Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FaRupeeSign } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import stockImage from '../../assets/noimage.png';
import {ScaleLoader} from "react-spinners";
import { motion } from "framer-motion";
import "../ProductCard/product.css";

export default class ProductCard extends Component {
  state = {
    loading:true,
    products:null
  }

  componentDidMount(){
    axios.post(`/product?limit=6&page=1&category=${this.props.payload}`)
    .then(response => {
      this.setState({products:response.data.products})
      this.setState({loading:false});
    })
  }
  
  render(){
    if(this.state.loading){
        return (
          <div className="d-flex justify-content-center" style={{marginTop:250}}>
            <ScaleLoader
            color={'red'}
            size={75}/>
          </div>);
    }

    return (
      <React.Fragment>
        <Row>
          {
            this.state.products.map(product => {
              return (
                <Col
                  key={product._id}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  style={{ paddingBottom: 24, marginTop: "20px" }}>
                  <NavLink to={'/productdetails/' + product._id}>
                    <Card id='stackBottom'/>
                    <Card id='displayCard'>
                      <Col style={{ textAlign: "center" }}>
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.9 }}>
                          <Image
                            src={product.productImages[0] ? product.productImages[0].s3URL : stockImage}
                            style={{ marginTop: "-21px" }}
                            id='productImage'
                          />
                        </motion.div>
                      </Col>
                      <Card.Body>
                        <Card.Text id='productTitle' className='module line-clamp'>
                          {product.productName}
                        </Card.Text>
                        {/* <Card.Subtitle className='mb-2 text-muted' id='warranty'>
                          2 Years Company Warranty
                        </Card.Subtitle> */}
                        {product.specifications.slice(0, 6).map((spec, index) => {
                            if(spec.value){
                              return (
                                <div key={index} className='product-specifications'>
                                  <span style={{ paddingRight: 10 }}>
                                    <FiChevronRight />
                                  </span>
                                  <span>{spec.value}</span>
                                </div>
                              );}
                          })}
                        <Card.Text style={{ 
                          textAlign: "center",
                          marginTop: "10px",
                          marginBottom: "0px", }}>
                        <span className='final-price-column'>
                          <FaRupeeSign /> {product.finalPrice}{" "}
                          {/* <span id='originalPrice'>{product.totalPrice}</span> */}
                        </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </NavLink>
                </Col>
              )
            })
          }
        <Col sm={12} style={{ textAlign: "center" }}>
        <NavLink to={this.props.payload === 'prebuild' ? '/Prebuilds' : '/laptops'}>
          <Button
            style={{
              marginLeft: "20px",
              background: "#CDCDCD",
              border: " 1px solid #CDCDCD",
              color: "black",
              borderRadius: "0px",
            }}
            id='loadmore'>
            LOAD MORE
          </Button>
        </NavLink>
        </Col>
      </Row>
    </React.Fragment>
  );
}
}
  