import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, Image } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { initProducts, searchProduct } from "../../store/actions/storeFront";
// import { GiProcessor } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import stockImage from "../../assets/noimage.png";
import sad from "../../assets/sad.png";
import "./product.css";

class PrebuildCard extends Component {
  componentDidMount() {
    this.props.onInitPrebuilds();
  }

  render() {
    if (this.props.loading) {
      return (
        <div
          className='d-flex justify-content-center'
          style={{ marginTop: 150 }}>
          <ScaleLoader size={75} color={"red"} />
        </div>
      );
    }
    if (this.props.prebuilds.products.length < 1) {
      return (
        <div style={{ marginTop: 50, textAlign: "center" }}>
          <img height={150} src={sad} alt='noresults' />
          <h5 style={{ marginTop: 30 }}>
            Products aren't available right now!
          </h5>
        </div>
      );
    }
    return (
      <Row>
        {this.props.prebuilds.products.map((product) => {
          return (
            <Col
              key={product._id}
              lg={4}
              md={4}
              sm={6}
              xs={12}
              style={{ paddingBottom: 24, marginTop: "20px" }}>
              <Link
                to={{
                  pathname: `${this.props.match.url}/${product._id}`,
                  state: {
                    from: this.props.location.pathname,
                  },
                }}>
                <Card id='stackBottom' />
                <Card id='displayCard'>
                  <Col style={{ textAlign: "center" }}>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.9 }}>
                      <Image
                        src={
                          product.productImages[0]
                            ? product.productImages[0].s3URL
                            : stockImage
                        }
                        style={{ marginTop: "-21px" }}
                        id='productImage'
                      />
                    </motion.div>
                  </Col>
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      id='productTitle-product'
                      // className='product-title module line-clamp'
                    >
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
                            <span key={index}>{spec.value}</span>
                          </div>
                        );
                      }
                    })}
                    <Card.Text
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "0px",
                      }}>
                      <span className='final-price-column'>
                        <FaRupeeSign /> {product.finalPrice}{" "}
                        {/* <span id='originalPrice'>{product.totalPrice}</span> */}
                      </span>
                    </Card.Text>
                    {/* <Card.Text id='savePercent'>
                      Save{" "}
                      {product.discountPercentage
                        ? product.discountPercentage
                        : "0"}
                      %
                    </Card.Text> */}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    prebuilds: state.products,
    loading: state.loading,
    search: state.searchKeyword,
    filters: state.filters,
    notfound: state.notFound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPrebuilds: () => dispatch(initProducts(1, "prebuild")),
    onEmptySearch: () => dispatch(searchProduct(null)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrebuildCard));
