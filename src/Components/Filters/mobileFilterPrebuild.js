import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {ScaleLoader} from "react-spinners";
import axios from 'axios';
import { initFilterProducts, initProducts } from '../../store/actions/storeFront';
import "./filter.css";


export default function FilterPrebuild(props){

  const searchKeyword = useSelector(state => state.searchKeyword)
  const [checkedRadio, setCheckedRadio] = useState('');
  const [checkedSubRadio, setCheckedSubRadio] = useState('');
  const [subcategory, setAllSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  let data = {
    min:0,
    max:1000000,
    subcategory:[]
  }

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
      console.log(error.response)
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
        dispatch(initFilterProducts(data,'prebuildSearch', 1, searchKeyword))
        setCheckedRadio(event.target.value)
      } else {
        dispatch({type:'PAGE', value:1})
          data.subcategory = event.target.value;
          dispatch(initFilterProducts(data,'prebuildSearch', 1, searchKeyword))
          setCheckedSubRadio(event.target.value)
      }
    } else {
        if(category === 'pricing'){
          setCheckedRadio(true);
          dispatch({type:'PAGE', value:1})
          data.min = event.target.value;
          data.max = event.target.name;
          dispatch(initFilterProducts(data,'prebuild', 1))
          setCheckedRadio(event.target.value)
        } else {
          dispatch({type:'PAGE', value:1})
            data.subcategory = event.target.value;
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
    data = {
      min:0,
      max:1000000,
      subcategory:[]
    }
  }
  if(loading){
    return <div style={{textAlign:'center', marginTop:'50%'}}>
    <ScaleLoader/>
    </div>
  }
    return (
      <div>
        <Accordion  defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Pricing
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel checked={checkedRadio == "20000"}  onChange={(e)=>handleFilter(e, 'pricing')} value="20000" name="50000" control={<Radio />} label="Rs.20000 - Rs.50000"/>
                      <FormControlLabel checked={checkedRadio == "50000"}  onChange={(e)=>handleFilter(e, 'pricing')} value="50000" name="100000" control={<Radio />} label="Rs.50000 - Rs.100000" />
                      <FormControlLabel checked={checkedRadio == "100000"} onChange={(e)=>handleFilter(e, 'pricing')} value="100000" name="200000" control={<Radio />} label="Rs.1 Lakh - Rs.2 Lakh"/>
                      <FormControlLabel checked={checkedRadio == "200000"} onChange={(e)=>handleFilter(e, 'pricing')} value="200000"name="10000000" control={<Radio />} label="Above 2 Lakh" />
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
                      props.subcategories.map(sub => {
                        return  <FormControlLabel style={{textTransform:'uppercase'}} checked={checkedSubRadio === sub} key={sub} onChange={(e)=>handleFilter(e, 'subcategory')} value={sub} control={<Radio />} label={sub} />
                      })
                    }
                  </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
