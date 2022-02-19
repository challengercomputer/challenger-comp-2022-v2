import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { initFilterProducts } from '../../store/actions/storeFront';
import "./filter.css";


export default function SearchFilter(){

  const data = {
    keyword:'',
    sort:''
  }
  const searchKeyword = useSelector(state => state.searchKeyword)

  const dispatch = useDispatch();
  const handleFilter = (event) => {
    dispatch({type:'PAGE', value:1})
    data.sort = event.target.value;
    data.keyword = searchKeyword;
    dispatch(initFilterProducts(data,'search', 1))
  }
  
    return (
      <React.Fragment>
        <Accordion className="filter" defaultActiveKey='0' style={{ paddingBottom: 16 }}>
          <Card id='CCFilterCard'>
            <Accordion.Toggle id='CCFilterHeader' as={Card.Header} eventKey='0'>
              Sort by price
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
               <Card.Body>       
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel onChange={(e)=>handleFilter(e)} value="-1" control={<Radio />} label="Highest to Lowest"/>
                      <FormControlLabel onChange={(e)=>handleFilter(e)} value="1" control={<Radio />} label="Lowest to Highest" />
                    </RadioGroup>
                  </FormControl>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </React.Fragment>
    );
  }
