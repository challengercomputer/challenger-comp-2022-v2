import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";

//Import Components
import LaptopFilter from "../../Components/Filters/laptopFilter";
import BreadcrumbComponent from "../../Components/BreadCrumb/appBreadCrumbs";
import LaptopCard from "../../Components/ProductCard/laptopCard";
import MobileFilter from "../../Components/Filters/mobileLaptopFilter";
import { BsX } from "react-icons/bs";
import LaptopPagination from "../../Components/Pagination/laptopPagination";

import { initFilterProducts, initProducts, setAddWishlist } from '../../store/actions/storeFront';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {ScaleLoader} from "react-spinners";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

//Assets
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

function Laptops(props) {
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState([])
  const notFound = useSelector(state => state.notFound)
  const searchKeyword = useSelector(state => state.searchKeyword)
  const [loading, setLoading] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [checkedSubRadio, setCheckedSubRadio] = useState('');
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [extraParam, setExtraParam] = useState({min:0,max:1000000,subcategory:''});
  let data = {
    min:0,
    max:1000000,
    subcategory:[]
  }

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/promotion')
    .then(res => {
      setBanner(res.data.promotions)
    })
    .catch(res => {
    })
  },[])

  const handleApply = async () => {
    setShow(false);
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true)
    axios.get('/productSpecification/category')
    .then(res => {
      const subcategoryData = res.data.allCategory.filter(category => {
        return category.category.match(/laptop/gi)
      })
      setAllSubcategory(subcategoryData[0].subcategory)
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
    })
  },[])

  const handleFilter = (event, category) => {
    if(searchKeyword !== null){ 
      if(category === 'pricing'){
        dispatch({type:'PAGE', value:1})
        data.min = event.target.value;
        data.max = event.target.name;  
        data.subcategory.push(extraParam.subcategory);
        setExtraParam({min:event.target.value, max:event.target.name, subcategory:extraParam.subcategory});
        dispatch(initFilterProducts(data,'laptopSearch', 1, searchKeyword))
        setCheckedRadio(event.target.value)
      } else {
        dispatch({type:'PAGE', value:1})
        data.subcategory.push(event.target.value);
        data.min = extraParam.min;
        data.max = extraParam.max;
        setExtraParam({min:extraParam.min, max:extraParam.max, subcategory:event.target.value});
        dispatch(initFilterProducts(data,'laptopSearch', 1, searchKeyword))
        setCheckedSubRadio(event.target.value)
      }
    } else {
      if(category === 'pricing'){
        dispatch({type:'PAGE', value:1})
        data.min = event.target.value;
        data.max = event.target.name;  
        data.subcategory.push(extraParam.subcategory);
        setExtraParam({min:event.target.value, max:event.target.name, subcategory:extraParam.subcategory});
        dispatch(initFilterProducts(data,'laptop', 1))
        setCheckedRadio(event.target.value)
      } else {
        dispatch({type:'PAGE', value:1})
        data.subcategory.push(event.target.value);
        data.min = extraParam.min;
        data.max = extraParam.max;
        setExtraParam({min:extraParam.min, max:extraParam.max, subcategory:event.target.value});
        dispatch(initFilterProducts(data,'laptop', 1))
        setCheckedSubRadio(event.target.value)
      }
    }
  }
  const handleClear = () => {
    dispatch({type:'PAGE', value:1})
    dispatch(initProducts(1,'laptop'))
    setCheckedRadio('')
    setCheckedSubRadio('')
    setExtraParam({min:0, max:1000000, subcategory:''})
    data = {
      min:0,
      max:1000000,
      subcategory:[]
    }
  }
  
  const pageData = {
    title: "Laptops",
    excerpt: `${allSubcategory.map(item => item.game)}`
  }

  return (
    <React.Fragment>
      <section className="laptop-area pt-150 pb-70">
      <Helmet>
        <title>{pageData.title} | {Config.challengers__title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="Pc Build website" />

        <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
        <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
        <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

        <meta property="og:description" content={pageData.excerpt} />
        <meta itemprop="description" content={pageData.excerpt} />
        <meta name="twitter:description" content={pageData.excerpt} />
      </Helmet>

      <motion.div
        initial='out'
        animate='in'
        exit='out'
        variants={pageTransition}>
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        <Container id='ContainerWidth'>
          {/* BreadCrumb */}
          <Row style={{ marginTop: 16 }}>
            <Col sm={12}>
            {banner.length !==0 && 
              <a href={`http://${banner[0].url}`} rel="noopener noreferrer" target="_blank">
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
              <LaptopFilter/>
            </Col>

            <Col lg={9}>
              <LaptopCard/>
            </Col>
          </Row>

          <Row>
            <Col>
              <LaptopPagination/>
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
              <p>Popular searches: Intel,	laptop</p>
            </div>
          </div> }
        </Container>

        {/* Mobile View Filer Button & Modal Popup */}
        {notFound === null &&
        <Button
          className='fixed-bottom'
          id='filterButtonMobile'
          size='lg'
          block
          onClick={handleShow}
          style={{ borderRadius: 0, position: "fixed" }}>
          Filter Laptops
        </Button>}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
          <Modal.Title>Filters
              {checkedRadio || checkedSubRadio ?
              <span onClick={handleClear} style={{marginBottom:5, color:'red', border:'1px solid red', cursor:'pointer', padding:'7px 10px', marginLeft:20,fontSize:11}}><BsX size={20}/>CLEAR</span> 
              : null}
            </Modal.Title>
            <X style={{ marginTop: "5px" }} onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
          <Accordion defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Pricing
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel checked={checkedRadio === "20000"}  onChange={(e)=>handleFilter(e, 'pricing')} value="20000" name="50000" control={<Radio />} label="Rs.20000 - Rs.50000"/>
                      <FormControlLabel checked={checkedRadio === "50000"}  onChange={(e)=>handleFilter(e, 'pricing')} value="50000" name="100000" control={<Radio />} label="Rs.50000 - Rs.100000" />
                      <FormControlLabel checked={checkedRadio === "100000"} onChange={(e)=>handleFilter(e, 'pricing')} value="100000" name="200000" control={<Radio />} label="Rs.1 Lakh - Rs.2 Lakh"/>
                      <FormControlLabel checked={checkedRadio === "200000"} onChange={(e)=>handleFilter(e, 'pricing')} value="200000"name="10000000" control={<Radio />} label="Above 2 Lakh" />
                    </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              SUB CATEGORY
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                  <RadioGroup aria-label="subcategory" name="subcategory">
                    {
                      allSubcategory.map((sub, idx)=> {
                        return  <FormControlLabel checked={checkedSubRadio === sub} key={idx} style={{textTransform:'uppercase'}} onChange={(e)=>handleFilter(e, 'subcategory')} value={sub} control={<Radio />} label={sub} />
                      })
                    }
                  </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
      </section>
    </React.Fragment>
  );
}

export default Laptops;
