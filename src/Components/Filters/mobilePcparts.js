import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { initProducts, initFilterProducts } from '../../store/actions/storeFront';
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import "./filter.css";


function MobilePcPartsFilter(props){

  const [loading, setLoading] = useState(false);
  const [allSubcategory, setAllSubcategory] = useState([]);

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

  const data = {
    subcategory:[],
    sort:''
  }
  const dispatch = useDispatch();
  const handleFilter = (event, category) => {
    dispatch({type:'PAGE', value:1})
    if(category === 'sort'){
      data.sort = event.target.value;
    }
    else{
      data.subcategory = event.target.value;
    }
    dispatch(initFilterProducts(data,props.match.params.id, 1))
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
              Sort by price
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'sort')} value="-1"  control={<Radio />} label="Highest to Lowest"/>
                      <FormControlLabel onChange={(e)=>handleFilter(e, 'sort')} value="1"  control={<Radio />} label="Lowest to Highest" />
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
                        return  <FormControlLabel key={sub} style={{textTransform:'uppercase'}} onChange={(e)=>handleFilter(e, 'subcategory')} value={sub} control={<Radio />} label={sub} />
                      })
                    }
                  </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> : null}
      </React.Fragment>
    );
  }


  export default withRouter(MobilePcPartsFilter);