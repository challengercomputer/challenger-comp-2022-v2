import React, {useEffect, useState} from "react";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
// import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { initFilterProducts, initProducts } from '../../store/actions/storeFront';
import { BsX } from "react-icons/bs";
import axios from 'axios';
import "./filter.css";
import { ScaleLoader } from "react-spinners";


export default function PrebuildFilter(){
  const [allSubcategory, setAllSubcategory] = useState([]);
  const searchKeyword = useSelector(state => state.searchKeyword)
  const [loading, setLoading] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [checkedSubRadio, setCheckedSubRadio] = useState('');
  const [data, setData] = useState({
    min:0,
    max:1000000,
    subcategory:[]
  });
  useEffect(() => {
    setLoading(true)
    axios.get('/productSpecification/category')
    .then(res => {
      const subcategoryData = res.data.allCategory.filter(category => {
        return category.category.match(/prebuild/gi)
      })
      setAllSubcategory(subcategoryData[0].subcategory)
      setLoading(false)
    })
    .catch(error => {
    })
  },[])

  const dispatch = useDispatch();

  const handleFilter = (event, category) => {
    if(searchKeyword !== null){    
      if(category === 'pricing'){
        setCheckedRadio(true);
        dispatch({type:'PAGE', value:1})
        data.min = event.target.value;
        data.max = event.target.name;
        setData(data)    
        dispatch(initFilterProducts(data,'prebuildSearch', 1, searchKeyword))
        setCheckedRadio(event.target.value)
      } else {
        dispatch({type:'PAGE', value:1})
        data.subcategory = event.target.value;
        setData(data)
        dispatch(initFilterProducts(data,'prebuildSearch', 1, searchKeyword))
        setCheckedSubRadio(event.target.value)
      }
    } else {
      if(category === 'pricing'){
        setCheckedRadio(true);
        dispatch({type:'PAGE', value:1})
        data.min = event.target.value;
        data.max = event.target.name;
        setData(data)    
        dispatch(initFilterProducts(data,'prebuild', 1))
        setCheckedRadio(event.target.value)
      } else {
        dispatch({type:'PAGE', value:1})
        data.subcategory = event.target.value;
        setData(data)
        dispatch(initFilterProducts(data,'prebuild', 1))
        setCheckedSubRadio(event.target.value)
      }
    }
  }
  const handleClear = () => {
    dispatch({type:'PAGE', value:1})
    dispatch(initProducts(1,'prebuild'))
    setCheckedRadio('')
    setCheckedSubRadio('')
    setData({
      min:0,
      max:1000000,
      subcategory:[]
    })
  }
  if(loading){
    return <div style={{textAlign:'center', marginTop:'50%'}}>
    <ScaleLoader/>
    </div>
  }
  
    return (
      <React.Fragment>
        <Helmet>
          <title>Pre-Build | {Config.challengers__sub}</title>
          <link rel="canonical" href={window.location.href} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="Pc Build website" />

          <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
          <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
          <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

          <meta property="og:description" content={Config.challengers__desc} />
          <meta itemprop="description" content={Config.challengers__desc} />
          <meta name="twitter:description" content={Config.challengers__desc} />

        </Helmet>

        {checkedRadio || checkedSubRadio ?
        <span onClick={handleClear} style={{marginBottom:5,color:'var(--base-danger, red)', border:'1px solid var(--base-danger, red)', cursor:'pointer', padding:'2px 10px', fontSize:11}}><BsX size={20}/>CLEAR</span> 
        : null}
        <Accordion className="filter" defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle style={{backgroubd: 'var(--base-dark)'}} id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Pricing
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel checked={checkedRadio === "20000"} onChange={(e)=>handleFilter(e, 'pricing')} value="20000" name="50000" control={<Radio />} label="Rs.20000 - Rs.50000"/>
                      <FormControlLabel checked={checkedRadio === "50000"} onChange={(e)=>handleFilter(e, 'pricing')} value="50000" name="100000" control={<Radio />} label="Rs.50000 - Rs.100000" />
                      <FormControlLabel checked={checkedRadio === "100000"} onChange={(e)=>handleFilter(e, 'pricing')} value="100000" name="200000" control={<Radio />} label="Rs.1 Lakh - Rs.2 Lakh"/>
                      <FormControlLabel checked={checkedRadio === "200000"} onChange={(e)=>handleFilter(e, 'pricing')} value="200000"name="10000000" control={<Radio />} label="Above 2 Lakh" />
                    </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className="filter" defaultActiveKey='0' style={{ paddingBottom: 16 }}>
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
        </Accordion>
      </React.Fragment>
    );
  }
