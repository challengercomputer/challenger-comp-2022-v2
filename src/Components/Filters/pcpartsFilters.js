import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Accordion, Card } from "react-bootstrap";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { BsX } from "react-icons/bs";
import { initProducts, initFilterProducts } from '../../store/actions/storeFront';
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import "./filter.css";


function PcPartsFilter(props){

  const [loading, setLoading] = useState(false);
  const searchKeyword = useSelector(state => state.searchKeyword);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [checkedSubRadio, setCheckedSubRadio] = useState('');
  const [data, setData] = useState({
    sort:'',
    subcategory:[]
  });

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
        data.sort = event.target.value;
        setData(data) 
        dispatch(initFilterProducts(data,'pcpartsSearch', 1, props.match.params.id, searchKeyword))
        setCheckedRadio(event.target.value)
      }
      else{
        dispatch({type:'PAGE', value:1})
        data.subcategory = event.target.value;
        setData(data) 
        dispatch(initFilterProducts(data,'pcpartsSearch', 1, props.match.params.id, searchKeyword))
        setCheckedSubRadio(event.target.value)
      }
    } else {
        if(category === 'sort'){
          dispatch({type:'PAGE', value:1})
          data.sort = event.target.value;
          setData(data) 
          dispatch(initFilterProducts(data,props.match.params.id, 1))
          setCheckedRadio(event.target.value)
        }
        else{
          dispatch({type:'PAGE', value:1})
          data.subcategory = event.target.value;
          setData(data) 
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
    setData({
      sort:'',
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
        {checkedRadio || checkedSubRadio ?
        <span onClick={handleClear} style={{marginBottom: 15,color:'var(--base-danger, red)', border:'1px solid var(--base-danger, red)', cursor:'pointer', padding:'2px 10px', fontSize:11}}><BsX size={20}/>CLEAR</span> 
        : null}
        <Accordion className="filter" defaultActiveKey='0' style={{ paddingBottom: 16 }}>
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
        </Accordion> : null}
      </React.Fragment>
    );
  }


  export default withRouter(PcPartsFilter);