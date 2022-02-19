import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Row, Col, Container, Button} from "react-bootstrap";
import {Slider, Input, Tooltip, Toolbar} from "@material-ui/core";
import {ScaleLoader} from "react-spinners";
import axios from "axios";
import {motion} from "framer-motion";
import "./buildForm.css";
//Import ICONS
import { ChevronLeft } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const pageTransition = {
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100%" },
};

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const SelectBudget = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(''); // 20000

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/recommended/minimumPrice`)
    .then(res => {
      setValue(res.data.minimumPrice);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
    })
  }, [])

  const handleSliderChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 25000) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  if(loading) {
    return (
      <div className="d-flex justify-content-center" style={{marginTop:250}}>
        <ScaleLoader
        color={'red'}
        size={75}/>
      </div>);
  }

  return (
    <React.Fragment>
      <Toolbar id='toolbar-desktop-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar>
      <Container
        className='form'
        style={{ marginTop: "22px", overflow: "hidden" }}>
        <Row>
          <Col
            lg={9}
            md={9}
            xs={12}
            sm={12}
            style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <span style={{ display: "flex" }}>
              <ChevronLeft
              onClick={()=>props.history.goBack()}
                size={38}
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
              <h3>Choose your maximum budget</h3>
            </span>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12} id='budgetDesktopCol'>
            <div 
            onClick={() => props.history.push({pathname:`/predictedpc/${value}`})} 
            style={{ padding: "25px" }}>
              <a id='budgetDesktop'>
                <span></span>
                <span></span>
                <span></span>
                Suggest Me
              </a>
            </div>
          </Col>
        </Row>

        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}>
          <div style={{ padding: "34px" }}>
            <span style={{ display: "flex" }}>
              <Input
                className={classes.input}
                value={1}
                style={{
                  fontSize: "50px",
                  color: "white",
                  marginRight: "-380px",
                }}
                onChange={handleInputChange}
                // onBlur={handleBlur}
                disabled={true}></Input>
              <p>INR</p>
            </span>
          </div>
          <br></br>
          <PrettoSlider
            aria-label='pretto slider'
            onChange={handleSliderChange}
            min={1}
            max={500000}
          />
        </motion.div>
        <Button
          className='fixed-bottom'
          id='filterButtonMobile'
          size='lg'
          block
          onClick={() => props.history.push({pathname:`/predictedpc/${value}`})}
          style={{ borderRadius: 0, position: "fixed" }}>
          Suggest Me
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default SelectBudget;
