import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";

//Import Components
import SearchFilter from "../../Components/Filters/searchFilter";
import BreadcrumbComponent from "../../Components/BreadCrumb/appBreadCrumbs";
import SearchResult from "../../Components/ProductCard/searchCard";
import SearchMobileFilter from "../../Components/Filters/searchMobileFilter";
import SearchPagination from "../../Components/Pagination/searchPagination";



//Assets
import Banner from "../prebuild/assets/geforce.jpg";
import searchResults from "../../assets/searching.svg";
import axios from 'axios';
import { X } from "react-feather";
//CSS Files

import "../prebuild/prebuild.css";

//Media Query CSS
// import "./storeFrontMediaQuery.css";

import { motion } from "framer-motion";

const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

function SearchResults(props) {
  
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState([])
  const notFound = useSelector(state => state.notFound)
  const searchKeyword = useSelector(state => state.searchKeyword)

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/promotion')
    .then(res => {
      setBanner(res.data.promotions)
    })
    .catch(res => {
    })
  },[props.match.params.id])

  const handleApply = () => {
    setShow(false);
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true);

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
        <Container id='ContainerWidth'>
          {/* BreadCrumb */}
          <Row style={{ marginTop: 16 }}>
            <Col sm={12}>
            {banner.length !==0 && 
              <a href={`http://${banner[0].url}`} target="_blank">
                <img alt="banner" src={banner[0].s3URL} style={{ width: "100%" }}/> 
              </a>}
            </Col>
          </Row>
          { notFound === null ?
           <>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <BreadcrumbComponent/>
          </div>

          <Row>
            {/* Filter Desktop */}
            <Col sm={3} id='filters-desktop'>
              <SearchFilter/>
            </Col>

            <Col lg={9}>
              <SearchResult/>
            </Col>
          </Row>

          <Row>
            <Col>
              <SearchPagination/>
            </Col>
          </Row>
          </> : 
          <div className="search-result-container">
            <div className="search-title">
              You Searched for <p style={{color:'red', display:'inline'}}>{searchKeyword}</p>
            </div>
            <div>
              <img style={{width:'15%'}} src={searchResults} alt="no results"/>
            </div>
            <div>
              <h2 style={{marginTop:35}}>We couldn't find any matches!</h2>
              <p style={{fontSize: 14, color: 'grey'}}>Please check the spelling or try searching something else</p>
              <p>Popular searches: Ryzen,	prebuild</p>
            </div>
          </div> }
        </Container>

        {/* Mobile View Filer Button & Modal Popup */}
        {notFound === null && <Button
          className='fixed-bottom'
          id='filterButtonMobile'
          size='lg'
          block
          onClick={handleShow}
          style={{ borderRadius: 0, position: "fixed" }}>
          SORT
        </Button>}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Filters</Modal.Title>
            <X style={{ marginTop: "5px" }} onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <SearchMobileFilter/>
          </Modal.Body>

          <Modal.Footer style={{ padding: 0 }}>
            <Button
              variant='primary'
              onClick={handleApply}
              style={{
                width: "100%",
                margin: 0,
                borderRadius: 0,
                background: "#E50926",
                border: "none",
              }}>
              APPLY FILTER
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </React.Fragment>
  );
}

export default SearchResults;
