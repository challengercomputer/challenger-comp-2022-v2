import React, {Component} from "react";
import {withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Row, Col, Card, Image} from "react-bootstrap";
import {ScaleLoader} from "react-spinners";
import { motion } from "framer-motion";
import {initProducts, searchProduct}  from '../../store/actions/storeFront';
import stockImage from '../../assets/noimage.png';
import "./product.css";


class SearchCard extends Component {

  componentDidMount(){
    this.props.onPage()
    this.props.onInitSearch(this.props.search)
  }
  
  render(){
    if(this.props.loading){
      return (
        <div className="d-flex justify-content-center" style={{marginTop:150}}>
          <ScaleLoader
            size={75}
            color={'red'}/>
        </div>)
      }
    return (
        <Row>
          {
            this.props.products.products.map(product => {
              return (
                <Col
                  key={product._id}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={6}
                  style={{ paddingBottom: 24, marginTop: "20px" }}>
                  <Link to={{
                    pathname:`search/${product._id}`,
                    state: {
                      from: this.props.location.pathname
                    }
                  }}>
                    <Card id='stackBottom'/>
                    <Card id='displayCard'>
                      <Col style={{ textAlign: "center" }}>
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.9 }}>
                          <Image
                            src={product.productImages[0] ? product.productImages[0].s3URL : stockImage}
                            style={{ width:'70%', marginTop: "-21px" }}
                            // id='productImage'
                          />
                        </motion.div>
                      </Col>
                      <Card.Body>
                        <Card.Text id='productTitle' className='product-title module line-clamp'>
                          {product.productName}
                        </Card.Text>
                        {/* <Card.Subtitle className='mb-2 text-muted' id='warranty'>
                          2 Years Company Warranty
                        </Card.Subtitle> */}
                        <Card.Text style={{ marginBottom: "0px" }}>
                          <span style={{ display: "flex" }}>
                            Rs. {product.finalPrice} <span id='originalPrice'>{product.totalPrice}</span>
                          </span>
                        </Card.Text>
                        <Card.Text id='savePercent'>Save {product.discountPercentage ? product.discountPercentage : '0'}%</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>)
              }
            )
          }
      </Row>
    )
  }
}  
const mapStateToProps = state => {
  return {
    products: state.products,
    loading: state.loading,
    search: state.searchKeyword,
    filters: state.filters,
    notfound: state.notFound
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSearch: (search) => dispatch(initProducts(1, 'search', search)),
    onPage: () => dispatch({type:'PAGE', value:1}),
    onEmptySearch: () => dispatch(searchProduct(null))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchCard));