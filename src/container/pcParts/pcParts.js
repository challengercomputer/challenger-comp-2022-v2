import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import { BsX } from "react-icons/bs";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

//Import Components
import FilterPcParts from "../../Components/Filters/pcpartsFilters";
import BreadcrumbComponent from "../../Components/BreadCrumb/appBreadCrumbs";
import PcPartsCard from "../../Components/ProductCard/pcpartsCard";
import { initFilterProducts, initProducts } from '../../store/actions/storeFront';
import PcPartPagination from "../../Components/Pagination/pcpartPagination";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";


//Assets
import axios from 'axios';
import searchResults from "../../assets/searching.svg";

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

function PcParts(props) {

  const [show, setShow] = useState(false);
  const notFound = useSelector(state => state.notFound)
  const [banner, setBanner] = useState([])
  const filterVal = useSelector(state => state.filterVal)
  const [loading, setLoading] = useState(false);
  const searchKeyword = useSelector(state => state.searchKeyword);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [checkedSubRadio, setCheckedSubRadio] = useState('');
  const [extraParam, setExtraParam] = useState({sort:'', subcategory:''})
  let data = {
    sort:'',
    subcategory:[]
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/promotion')
    .then(res => {
      setBanner(res.data.promotions)
    })
    .catch(res => {
    })
  },[props.match.params.id])

  useEffect(() => {
    // dispatch(initProducts(1, props.match.params.id))
    const regexp = new RegExp(props.match.params.id, 'g')
    setLoading(true)
    axios.get('/productSpecification/category')
    .then(res => {
      const subcategoryData = res.data.allCategory.filter(category => {
        return category.category.match(regexp)
      })
      setAllSubcategory(subcategoryData[0].subcategory)
      setLoading(false)
    })
    .catch(error => {
      console.log(error.response)
    })
  },[props.match.params.id])

  const dispatch = useDispatch();
  const handleFilter = (event, category) => {
    if(searchKeyword !== null){
      if(category === 'sort'){
        dispatch({type:'PAGE', value:1})
        data.subcategory.push(extraParam.subcategory);
        data.sort = event.target.value;
        setExtraParam({sort:event.target.value, subcategory:extraParam.subcategory})
        dispatch(initFilterProducts(data,'pcpartsSearch', 1, props.match.params.id, searchKeyword))
        setCheckedRadio(event.target.value)
      }
      else{
        dispatch({type:'PAGE', value:1})
        data.subcategory.push(event.target.value); 
        data.sort = extraParam.sort;
        setExtraParam({sort:extraParam.sort, subcategory:data.subcategory});
        dispatch(initFilterProducts(data,'pcpartsSearch', 1, props.match.params.id, searchKeyword))
        setCheckedSubRadio(event.target.value)
      }
    } else {
        if(category === 'sort'){  
          dispatch({type:'PAGE', value:1})
          data.subcategory.push(extraParam.subcategory);
          data.sort = event.target.value;
          setExtraParam({sort:event.target.value, subcategory:extraParam.subcategory})
          dispatch(initFilterProducts(data,props.match.params.id, 1))
          setCheckedRadio(event.target.value)
        }
        else{
          dispatch({type:'PAGE', value:1})
          data.subcategory.push(event.target.value); 
          data.sort = extraParam.sort;
          setExtraParam({sort:extraParam.sort, subcategory:data.subcategory});
          dispatch(initFilterProducts(data,props.match.params.id, 1))
          setCheckedSubRadio(event.target.value)
        }
      }
  }
  const handleClear = () => {
    dispatch({type:'PAGE', value:1})
    dispatch(initProducts(1,props.match.params.id))
    setCheckedRadio('')
    setCheckedSubRadio('')
    setExtraParam({sort:'', subcategory:''});
    data = {
      sort:'',
      subcategory:[]
    }
  }
  const handleApply = () => {
    setShow(true);
    // await dispatch(initFilterProducts(filterVal));
    // setShow(false);
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const pageData = {
    title: `${props.match.params.id}`,
    image: banner.length !==0 ? `http://${banner[0].url}` : '',
    excerpt: `${allSubcategory}`,
  }

  return (
    <React.Fragment>
      <section className="pc-parts-area pt-150 pb-70">
        <Helmet>
        <title>{pageData.title} | {Config.challengers__title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content={Config.challengers__websiteType} />

        <meta property="og:image" content={pageData.image} />
        <meta itemprop="image" content={pageData.image} />
        <meta name="twitter:image" content={pageData.image} />

        <meta property="og:title" content={pageData.title} />
        <meta itemprop="name" content={pageData.title} />
        <meta name="twitter:title" content={pageData.title}/>
        
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
            {/* <BreadcrumbComponent keyword={props.match.params.id}/> */}
          </div>

          <Row>
            {/* Filter Desktop */}
            <Col sm={3} id='filters-desktop'>
              <FilterPcParts/>
            </Col>

            <Col lg={9}>
              <PcPartsCard/>
            </Col>
          </Row>

          <Row>
            <Col>
              <PcPartPagination/>
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
              <p style={{fontSize: 14, color: 'var(--base-dark, grey)'}}>Please check the spelling or try searching something else</p>
              {/* <p>Popular searches: Ryzen processor,	X399 Aorus Pro</p> */}
            </div>
          </div> }
        </Container>

        {/* Mobile View Filer Button & Modal Popup */}
        { notFound === null ? <Button
          className='fixed-bottom'
          id='filterButtonMobile'
          size='lg'
          block
          onClick={handleShow}
          style={{ borderRadius: 0, position: "fixed" }}>
          Filter
        </Button> : null }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
          <Modal.Title>Filters
              {checkedRadio || checkedSubRadio ?
              <span onClick={handleClear} style={{marginBottom:5,color:'var(--base-danger, red)', border:'1px solid var(--base-danger, red)', cursor:'pointer', padding:'7px 10px', marginLeft:20,fontSize:11}}><BsX size={20}/>CLEAR</span> 
              : null}
            </Modal.Title>
            <X style={{ marginTop: "5px" }} onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
          <Accordion defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Sort by price
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel checked={checkedRadio === "-1"} onChange={(e)=>handleFilter(e, 'sort')} value="-1"  control={<Radio />} label="Highest to Lowest"/>
                      <FormControlLabel checked={checkedRadio === "1"} onChange={(e)=>handleFilter(e, 'sort')} value="1"  control={<Radio />} label="Lowest to Highest" />
                    </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {allSubcategory.length > 0 ?
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
                      allSubcategory.map(sub => {
                        return  <FormControlLabel key={sub} checked={checkedSubRadio === sub} style={{textTransform:'uppercase'}} onChange={(e)=>handleFilter(e, 'subcategory')} value={sub} control={<Radio />} label={sub} />
                      })
                    }
                  </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> : null}
          </Modal.Body>

          <Modal.Footer style={{ padding: 0 }}>
            <Button
              variant='primary'
              onClick={handleClose}
              style={{
                width: "100%",
                margin: 0,
                borderRadius: 0,
                background: "var(--base-danger, #E50926)",
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

export default PcParts;
