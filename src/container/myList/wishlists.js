import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {BiRupee} from 'react-icons/bi';
import { useAlert } from 'react-alert';
import {Row, Col, Button, Container, Card, Modal} from "react-bootstrap";
import stockImage from '../../assets/noimage.png';
import {ScaleLoader} from "react-spinners";
import axios from "axios";
import {cartAdded} from "../../store/actions/storeFront";
import {motion} from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import './myList.css';

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 }
};


export default function Wishlist(props){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletedProducts, setDeletedProducts] = useState('');
    const [clicked, setClicked] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    
    useEffect(() => {
    window.scrollTo(0,0);
    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth_token}`,
		};
        axios.get('/wishlist', {headers})
        .then(res => {
            setProducts(res.data.wishlist);
            setLoading(false);
        })
    }, [deletedProducts])

    const removeWishlist = (id) => {
    let data = {
        "productID": id
      }
    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
		let headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${auth_token}`
    };
      axios.delete('/wishlist',{headers, data} )
        .then(res => {
        setDeletedProducts(res.data);
        setModalShow(false)
        alert.success('Product removed from wishlist', {
            timeout:3000
        })
      })
      .catch(error => {
        setModalShow(false)
        setLoading(false);
          alert.error(error.response.data.error, {
              timeout:3000
          })
      })
    }

    const openModal = (id) => {
      setId(id);
      setModalShow(true);
    }
  
    const handleCart = (productId) => {
      setClicked(true);
      setLoading(true)
      let data = {
        "productID": productId
      }
      let auth_token = JSON.parse(localStorage.getItem("currentUser"));
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth_token}`
      };
      dispatch(cartAdded(productId))
      axios.delete('/wishlist',{headers, data})
        .then(res => {
        setDeletedProducts(res.data);
        setLoading(false)
        setClicked(false);
        alert.success('YAY! your product moved to cart', {
            timeout:3000
        })
      })
      .catch(error => {
        setLoading(false);
          alert.error(error.response.data.error, {
              timeout:3000
          })
          setClicked(false);
        })
      }
    const MyVerticallyCenteredModal = (props) => {
      return (
      <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>Remove Item</Modal.Header>
        <Modal.Body>
          Are you sure you want to remove from wishlist?
        </Modal.Body>
        <Modal.Footer>
          <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setModalShow(false)}>Cancel</p>
          <Button variant="danger" onClick={()=>removeWishlist(props.id)}>Remove</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  if(loading){
    return (
      <div className="py-150 d-flex justify-content-center">
        <ScaleLoader
          size={75}
          color={'var(--base-danger, red)'}/>
      </div>)
    }
    return (
      <React.Fragment>
        <motion.div initial='out' animate='in' exit='out' variants={pageTransition}>
          <Container style={{marginTop: 16}}> 
              {products.length > 0 ? 
                products.map(product => {
                return( 
                <Card  key={product.productID._id} className="bg-base-dark card-body mb-4">
                  <Card.Body>
                    <Row>
                        <Col sm={12} md={3} >
                        <div className="product-image">
                      <Link to={`/Prebuilds/${product.productID._id}`}>
                        <img  height={150} src={product.productID.productImages[0] ? product.productID.productImages[0].s3URL : stockImage} alt={product.productID.productName}/>
                      </Link>
                    </div> 
                        </Col>
                      <Col  sm={12} md={5} >
                      <div>
                          <h1 className="fs-2xl description">{product.productID.productName}</h1>
                          {/* <p style={{color:'gray'}}>2 Years Company Warranty</p> */}
                          <h3 style={{color:'var(--base-warning, gray)', fontWeight:'bold'}}><BiRupee/>{product.productID.finalPrice}</h3>     
                        </div> 
                      </Col> 
                      <Col  sm={12} md={2}>
                      <div className="d-flex justify-content-between mt-2">
                        <div onClick={() => openModal(product.productID._id)} style={{cursor:'pointer', color:'var(--base-danger, red)'}}>
                          Delete
                        </div> 
                      </div>
                      </Col>
                      {product.productID.inventory > 0 ? 
                      <Col sm={12} md={2}>
                      <div className="d-flex justify-content-between mt-2">
                        <div onClick={clicked ? null : () => handleCart(product.productID._id)} style={{cursor:'pointer',color:'var(--base--success, cyan)'}}>
                          Move to cart
                        </div> 
                      </div>
                      </Col> : 
                      <Col sm={12} md={2}>
                      <div className="d-flex justify-content-between mt-2">
                        <div style={{cursor:'pointer',color:'white'}}>
                          OUT OF STOCK!
                        </div> 
                      </div>
                      </Col>}
                    </Row>   
                  </Card.Body>                     
                </Card>)})  :
                <Card style={{color: "white",background: "none",borderRadius: 0}}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title style={{fontWeight: "700",textAlign:'center'}}>
                            No Wishlists
                        </Card.Title>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>}
            <MyVerticallyCenteredModal 
                id={id}
                show={modalShow}
                onHide={() => setModalShow(false)}/>
          </Container>
        </motion.div>
      </React.Fragment>
    );
  }
