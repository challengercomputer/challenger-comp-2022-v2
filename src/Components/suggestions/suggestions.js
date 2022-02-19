import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Row, Col, Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import CheckIcon from '@material-ui/icons/Check';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import  {suggestionProducts, cartAdded}  from '../../store/actions/storeFront';
import "./suggestions.css";

class Suggestions extends Component {

  componentDidMount(){
    this.props.onSetSuggestionProducts()
  }

  render(){
    if(this.props.loading){
      return (
        <div className="d-flex justify-content-center" style={{marginTop:300}}>
          {/* <Spinner animation="border" variant="danger" /> */}
          <p>loading...</p>
        </div>
      )
    }
    return (
      <React.Fragment>
        <Row>
          {
            this.props.suggestionProduct.prebuilds.map(product => {
              return (
                <Col key={product._id} lg={4} md={4} sm={6} xs={6} style={{ paddingBottom: 24, marginTop: "20px" }}>
                  <NavLink  to={'/productdetails/' + product._id}>
                    <Card id='stackBottom'/>
                    <Card id='displayCard'>
                      <Col style={{ textAlign: "center" }}>
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.9 }}>
                          <Image
                            src={product.prebuildImages[0].s3URL}
                            style={{ marginTop: "-21px" }}
                            id='productImage'
                          />
                        </motion.div>
                      </Col>
                      <Card.Body>
                        <Card.Text id='productTitle' className='module line-clamp'>
                          {product.title}
                        </Card.Text>
                        {/* <Card.Subtitle className='mb-2 text-muted' id='warranty'>
                          2 Years Company Warranty
                        </Card.Subtitle> */}
                        <Card.Text style={{ marginBottom: "0px" }}>
                          <span style={{ display: "flex" }}>
                            Rs. {product.totalPrice} <span id='originalPrice'>{product.finalPrice}</span>
                          </span>
                        </Card.Text>
                        <Card.Text id='savePercent'>Save {product.discountPercentage ? product.discountPercentage : '0'}%</Card.Text>
                      </Card.Body>
                    </Card>
                  </NavLink>
                    {this.props.cartProducts.some(products => {
                      return products._id === product._id
                    }) ?
                    <Button className="added"> <CheckIcon/> ADDED </Button> :
                    <Button onClick={()=>this.props.onHandleCart(product._id)} className="add">
                      ADD
                    </Button>}
                </Col>
              )
            })
          }
      </Row>
    </React.Fragment>
  );
}
}

const mapStateToProps = state => {
  return {
    cartProducts: state.cartProducts,
    suggestionProduct: state.suggestionProducts,
    loading: state.suggestionLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetSuggestionProducts: () => dispatch(suggestionProducts()),
    onHandleCart: (id) => dispatch(cartAdded(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);