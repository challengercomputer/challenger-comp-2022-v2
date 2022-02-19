import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { initFilterProducts } from '../../store/actions/storeFront';
import axios from 'axios';
import "./filter.css";
import { ScaleLoader } from "react-spinners";


export default function LaptopMobileFilter(){

  const [allSubcategory, setAllSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(error.response)
    })
  },[])

  const data = {
    min:0,
    max:1000000,
    subcategory:[]
  }
  const dispatch = useDispatch();
  const handleFilter = (event, category) => {
    if(category === 'pricing'){
      dispatch({type:'PAGE', value:1})
      data.min = event.target.value;
      data.max = event.target.name;
      dispatch(initFilterProducts(data,'laptop', 1))
    } else {
      dispatch({type:'PAGE', value:1})
      data.subcategory = event.target.value;
      dispatch(initFilterProducts(data,'laptop', 1))
    }
  }
  
  if(loading){
    return <div style={{textAlign:'center', marginTop:'50%'}}>
    <ScaleLoader/>
    </div>
  }
    return (
      <React.Fragment>
        <Accordion defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Pricing
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'pricing')} value="20000" name="50000" control={<Radio />} label="Rs.20000 - Rs.50000"/>
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'pricing')} value="50000" name="100000" control={<Radio />} label="Rs.50000 - Rs.100000" />
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'pricing')} value="100000" name="200000" control={<Radio />} label="Rs.1 Lakh - Rs.2 Lakh"/>
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'pricing')} value="200000"name="10000000" control={<Radio />} label="Above 2 Lakh" />
                    </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion  defaultActiveKey='0' style={{ paddingBottom: 16 }}>
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
                        return  <FormControlLabel key={sub} style={{textTransform:'uppercase'}} onChange={(e)=>handleFilter(e, 'subcategory')} value={sub} control={<Radio />} label={sub} />
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
