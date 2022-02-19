import React, { Component } from "react";
import Slider from "react-slick";
import { Row, Col, Card } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import stockImage from '../../assets/noimage.png'
import "./productShow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className='next-button'
      onClick={onClick}
      style={{ marginLeft: "54%", marginTop: "20px" }}>
      <ChevronRight />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className='previous-button'
      onClick={onClick}
      style={{
        position: "absolute",
        bottom: 0,
        marginLeft: "32%",
        marginTop: "20px",
      }}>
      <ChevronLeft />
    </button>
  );
}

export default class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      nav1: null,
      nav2: null,
    };
  }
  
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settings = {
      fade: true,
    };
    return (
      <div>
        <Row>
          {/* <Col md={2} lg={2} xl={2} className='vertical-carousel'>
            <Slider
              vertical={true}
              verticalSwiping={true}
              asNavFor={this.state.nav1}
              ref={(slider) => (this.slider2 = slider)}
              slidesToShow={this.props.slides}
              slidesToScroll={1}
              arrows={false}
              swipeToSlide={true}
              focusOnSelect={true}>
                {
                  this.props.imageData.map(img => {
                    return <img src={img ? img.s3URL : stockImage} alt="carousel-laptop"/>
                  })
                }
            </Slider>
          </Col> */}
          <Col>
            <div>
              <Card id='stackBottomDisplay'/>
              <Slider
                {...settings}
                dots={true}
                nextArrow={<SampleNextArrow />}
                prevArrow={<SamplePrevArrow />}
                asNavFor={this.state.nav2}
                ref={(slider) => (this.slider1 = slider)}>
                {
                  this.props.imageData.map((img, idx )=> {
                    return (<div key={idx}>
                      <img
                        src={img ? img.s3URL : stockImage}
                        alt="carousel-laptop"
                        style={{
                          width: "65%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          paddingTop: "5%",
                          marginBottom: "auto",
                        }}
                      />
                    </div>                
                    )
                  })
                }
              </Slider>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
