import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {BiRupee} from 'react-icons/bi';
import { useAlert } from 'react-alert';
import {Row, Col, Button, Container, Card, Modal, Table} from "react-bootstrap";
import {ScaleLoader} from "react-spinners";
import axios from "axios";
import {addCustomPc} from "../../store/actions/storeFront";
import {motion} from "framer-motion";
import './myList.css';

//Framer
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 }
};


export default function Builds(props){

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedProducts, setDeletedProducts] = useState('');
  const [specData, setSpecData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [specModal, setSpecModal] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const customPcData = {
    customPcImage:'',
    customPcItemsID:[],
    totalPrice: 0,
    qty:1
  };
  useEffect(() => {
  window.scrollTo(0,0);
  let auth_token = JSON.parse(localStorage.getItem("currentUser"));
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth_token}`,
  };
    axios.get('/myBuild/get', {headers})
    .then(res => {
        setProducts(res.data.mybuilds);
        setLoading(false);
    })
    .catch(err => {
      console.log(err.response)
    })
  }, [deletedProducts])

  const removeWishlist = (id) => {
  let auth_token = JSON.parse(localStorage.getItem("currentUser"));
  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${auth_token}`
  };
    axios.delete(`/myBuild/delete/${id}`,{headers} )
      .then(res => {
      setDeletedProducts(res.data);
      setModalShow(false)
      alert.success('Build removed', {
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

  const handleCart = (id, productIds, image, price) => {
    setClicked(true);
    setLoading(true)
    // this.customPcData.totalPrice = this.price.cpuPrice + this.price.ramPrice + this.price.motherboardPrice + this.price.gpuPrice + this.price.smpsPrice + this.price.casePrice + this.price.coolerPrice + this.price.storage1Price + this.price.storage2Price + this.price.wificardPrice
    productIds.map(post => {
        customPcData.customPcItemsID.push(post.productID)
    })
    customPcData.customPcImage = image;
    customPcData.totalPrice = price;
    let auth_token = JSON.parse(localStorage.getItem("currentUser"));
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${auth_token}`
    };
    dispatch(addCustomPc(customPcData))
    axios.delete(`/myBuild/delete/${id}`,{headers})
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
  const handleViewSpecs = (products) => {
    setSpecModal(true);
    setSpecData(products)
  }
  const MyVerticallyCenteredModal = (props) => {
    return (
    <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>Delete Build</Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this build?
      </Modal.Body>
      <Modal.Footer>
        <p style={{cursor:'pointer', marginRight: 15}} variant="outline-primary" onClick={()=>setModalShow(false)}>Cancel</p>
        <Button variant="danger" onClick={()=>removeWishlist(props.id)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ViewSpecsModal = (props) => {
  return (
  <Modal className="cart-remove" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>Specifications</Modal.Header>
    <Modal.Body>
      <Table striped bordered hover variant='dark'>
        <tbody>
          {specData.map((spec, index) => {
            return <tr key={index}>
            <td>
              {spec.productID.productName}
            </td>
            <td>
              {spec.productID.finalPrice}
            </td>
          </tr>})} 
        </tbody>
      </Table>
    </Modal.Body>
  </Modal>
);
}

  if(loading){
    return (
      <div className="py-150 d-flex justify-content-center" style={{marginTop:150}}>
        <ScaleLoader
          size={75}
          color={'var(--base-danger, red)'}/>
      </div>)
    }
    return (
      <React.Fragment>
        <motion.div initial='out' animate='in' exit='out' variants={pageTransition}>
          <Container style={{ marginTop: 16 }}> 
          <Row>
            <Col>
              {products.length > 0 ? 
                products.map((product, index) => {
                return(
                  <Card key={product._id} className="bg-base-dark mb-4">
                  <Card.Body>
                    <Row>
                        <Col sm={12} md={3} >
                        <div className="product-image">
                      <Link to={`/Prebuilds/${product._id}`}>
                        <img  height={150} src={product.customImage} alt={index+1}/>
                      </Link>
                    </div> 
                      </Col>
                      <Col  sm={12} md={5} >
                        <div>
                          <h1 className="fs-2xl description">CUSTOM PC #{index+1}</h1>
                          {/* <p style={{color:'gray'}}>2 Years Company Warranty</p> */}
                          <h3 style={{color:'var(--base-warning, gray)' }}><BiRupee/>{product.customPrice}</h3>    
                          <span style={{fontSize:12, margin:'0 auto', color:'white',borderBottom:'1px solid', width:'38%',cursor:'pointer'}} onClick={clicked ? null : () => handleViewSpecs(product.products)}>View Specs</span> 
                        </div> 
                      </Col> 
                      <Col  sm={12} md={2}>
                        <div className="d-flex justify-content-between mt-2">
                          <div onClick={() => openModal(product._id)} style={{cursor:'pointer',color:'var(--base-danger, red)'}}>
                            Delete
                          </div>
                        </div>
                      </Col>
                      <Col  sm={12} md={2}>
                        <div className="d-flex justify-content-between mt-2">
                        <div onClick={clicked ? null : () => handleCart(product._id, product.products, product.customImage,product.customPrice)} style={{cursor:'pointer', color:'var(--base-success, cyan)'}}>
                            Move to cart
                          </div> 
                        </div>
                      </Col>
                    </Row>   
                  </Card.Body>                     
                </Card>)})  :
                <Card style={{color: "white",background: "none",borderRadius: 0}}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title style={{fontWeight: "700",textAlign:'center'}}>
                            No Builds
                        </Card.Title>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>}
              </Col>
            </Row>
            <MyVerticallyCenteredModal 
              id={id}
              show={modalShow}
              onHide={() => setModalShow(false)}/>
            <ViewSpecsModal
              show={specModal}
              onHide={() => setSpecModal(false)}/>
          </Container>
        </motion.div>
      </React.Fragment>
    );
  }
