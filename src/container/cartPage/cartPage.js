import React, { Component, PureComponent, useState } from "react";
import axios from 'axios';
import { Row, Col, Button, Container, Card, Spinner } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
//Import ICONS
import { Check } from "react-feather";

//Import Images
import Image from "react-bootstrap/Image";

//Framer Animation
import { motion } from "framer-motion";

//Components
import ProductCard from "../../Components/ProductCard/productCard";

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export default class CartRecommend extends Component {
    
  state = {
    loading:true,
    product:null
  }

  componentDidMount(){
    axios.get('/store/' + this.props.match.params.id)
    .then(response => {
      this.setState({product:response.data});
      this.setState({loading:false})
    })
  }

  render() {
    if(this.state.loading){
      return (<div class="d-flex justify-content-center" style={{marginTop:250}}>
      <Spinner animation="border" variant="danger"/>
    </div>)
    }
    return (
      <React.Fragment>
        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}>
          <Toolbar id='toolbar-desktop-space'></Toolbar>
          <Toolbar id='toolbar-mobile-space'></Toolbar>
          <Toolbar id='toolbar-mobile-space'></Toolbar>

          <Container style={{ marginTop: 16 }}>
            <Card
              style={{
                color: "white",
                background: "rgb(0,0,0, 0.5)",
                // border: "1px solid rgb(34, 244, 238)",
                borderRadius: 0,
              }}>
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col xs={2}>
                        <Image
                          src={require("./assets/legion.png")}
                          id='productImage'
                          style={{ width: "100%" }}
                        />
                      </Col>
                      <Col xs={10}>
                        <Card.Title
                          style={{
                            color: "rgb(34, 244, 238)",
                            fontWeight: "700",
                          }}>
                          Added to Cart
                          <Check
                            style={{
                              color: "rgb(34, 244, 238)",
                              marginLeft: "5px",
                            }}
                          />
                        </Card.Title>
                        <Card.Text>
                          {this.state.product.productName}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={4}>
                    <Card.Title
                      style={{
                        fontWeight: "700",
                      }}>
                      Subtotal:
                      <span style={{ fontWeight: 400 }}>&nbsp;₹ {this.state.product.price}</span>
                    </Card.Title>
                    <Link to={{
                      pathname:'/container/YourCart/' + this.state.product.price,
                      search:this.state.product._id
                      }}>
                      <Button className='wishlist-btn'>
                        Continue to Cart (1 Item)
                        {/* <Heart style={{ width: "18px", marginLeft: "5px" }} /> */}
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div
              class=' text-center'
              style={{ marginTop: 32, marginBottom: 32 }}>
              <h3>More Suggestions</h3>
            </div>
            <ProductCard/>
          </Container>
        </motion.div>
      </React.Fragment>
    );
  }
}
