import React,{useEffect} from "react";
import {withRouter, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Card, Image} from "react-bootstrap";
import {ScaleLoader} from "react-spinners";
import { motion } from "framer-motion";
import {initProducts}  from '../../store/actions/storeFront';
import stockImage from '../../assets/noimage.png';
import sad from "../../assets/sad.png";
import "./product.css";


function PcPartsCard(props){

  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading)
  const pcparts = useSelector(state => state.products)
  const filters = useSelector(state => state.filters)
  useEffect(() => {
    dispatch({type:'PAGE', value:1})
    dispatch(initProducts(1, props.match.params.id))
  },[])
  
    if(loading){
      return (
        <div className="d-flex justify-content-center" style={{marginTop:150}}>
          <ScaleLoader
            size={75}
            color={'red'}/>
        </div>)
      }
    if(pcparts.products.length < 1){
      return (
        <div style={{marginTop:50, textAlign:'center'}}>
        <img height={150} src={sad} alt="noresults"/>
        <h5 style={{marginTop:30}}>Products aren't available right now!</h5>
      </div> )
    }
    return (
        <Row>
          {
            pcparts.products.map(product => {
              return (
                <Col
                  key={product._id}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={6}
                  style={{ paddingBottom: 24, marginTop: "20px" }}>
                  <Link to={{
                    pathname:`${props.match.url}/${product._id}`,
                    state: {
                      from:props.location.pathname
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
                        
                        <h1 id='productTitle' className='product-title module line-clamp'>
                        {product.productName}
                        </h1>

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

export default withRouter(PcPartsCard);