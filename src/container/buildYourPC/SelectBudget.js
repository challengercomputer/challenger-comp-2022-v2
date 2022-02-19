import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {Row, Col, Container, Button} from "react-bootstrap";
import {Slider, Input, Tooltip, Toolbar} from "@material-ui/core";
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
    color: "var(--base-danger, #52af77)",
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
  const [value, setValue] = React.useState('');
  const [sliderInitialValue, setSliderInitialValue] = React.useState('');
  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/recommended/minimumPrice`)
    .then(res => {
      setValue(res.data.minimumPrice);
      setSliderInitialValue(res.data.minimumPrice)
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
    if (value < 50000) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <React.Fragment>
      <section className="pt-150 pb-70 budget-area">

      {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar> */}
      <Container
        className='form'
        style={{ overflow: "hidden" }}>
        <Row>
          <Col
            lg={9}
            md={9}
            xs={12}
            sm={12}
            style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <span className="d-flex align-items-center">
              <ChevronLeft
              onClick={()=>props.history.goBack()}
                size={38}
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
              <h3 className="mb-0">Choose your maximum budget</h3>
            </span>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12} id='budgetDesktopCol'>
            <div 
            onClick={() => props.history.push({pathname:`/predictedpc/${value}`})} 
            style={{ padding: "25px" }}>
              <span id='budgetDesktop'>
                <span></span>
                <span></span>
                <span></span>
                Suggest Me
              </span>
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
                value={value}
                style={{
                  fontSize: "50px",
                  color: "white",
                  marginRight: "-380px",
                }}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={true}></Input>
              <p>INR</p>
            </span>
          </div>
          <br></br>
          <PrettoSlider
            aria-label='pretto slider'
            onChange={handleSliderChange}
            min={sliderInitialValue}
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
      </section>
    </React.Fragment>
  );
};

export default SelectBudget;
