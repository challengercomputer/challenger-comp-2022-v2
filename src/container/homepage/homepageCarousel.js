import React, {useState, useRef} from "react";
import MultiCarousel from "react-multi-carousel";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import googleReview from "../../assets/revieww.png"
import "react-multi-carousel/lib/styles.css";
import './homepage.css'

export default function ControlledCarousel() {
  
  const reviews = [
    {
      name: 'bharath yogesh',
      review:`Really excellent service, very polite and answered all of my question, especially Mr.Afthaf is really doing well, must recommended for PC build, and thanks for next day delivery`,
      stars: 5
    },
    {
      name: 'dhilip prasath',
      review:`Better price and good service... delivered the product on time. Thanks to aftafhussain for your patiently respond and filled my expectations.`,
      stars: 5
    },
    {
      name: 'Roy Oli',
      review:`One of the best computer Shop in electronics market, because of good owner, friendly workers genuine products with reasonable price!`,
      stars: 4
    },
    {
      name: 'sivakumar b',
      review:`Good Experience Shopping with us my budget is average but I purchased a good product with my budget`,
      stars: 5
    },
    {
      name: 'Sai Abhi',
      review:`Delivery on time and all are available at cheapest price .
      Glad to be a customer in this shop😊
      Afthaf bro has a kind and polite attitude and gives many choices for customers 🙂`,
      stars: 4
    },
    {
      name: 'manu kashyap',
      review:`The first and foremost thing about these guys are they are extremely friendly. The way they treat us are good  i would really recommended this shop rather than checking the price some where else`,
      stars: 5
    }
  ]
  const responsiveCategory = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const categorySlide = useRef();
    return (
      <React.Fragment >
        <h1 style={{textAlign:'center',marginTop:100}}><b>What our customers</b> are saying?</h1>
        <MultiCarousel 
          infinite
          autoPlay
          autoPlaySpeed={4000}
          transitionDuration={1000}
          slidesToSlide={1} 
          ref={categorySlide} 
          responsive={responsiveCategory}>  
            {reviews.map((data, index) => {
            return <div key={index} className="carousel-outer-container">
              <div className="carousel-quotes">   
                <p>
                  <ImQuotesLeft className="quote-left"/>{data.review}<ImQuotesRight className="quote-right"/>
                </p>               
              </div>
              <div className="carousel-author">
                <h3>{data.name}</h3>
              </div>
              <div style={{textAlign:'center'}}>
                {new Array(data.stars).fill(0)
                .map(num => {
                  return <FaStar key={num} style={{marginRight:3}} color="gold"/>
                })}
              </div>
            </div>})}
        </MultiCarousel>
            <div style={{textAlign:'center'}}>
              <a href="https://www.google.com/search?q=Challenger+Computer+-+Chennai%27s+Best+Gaming+Computers+and+accessories&rlz=1C1CHBD_enIN918IN918&oq=Challenger+Computer+-+Chennai%27s+Best+Gaming+Computers+and+accessories&aqs=chrome..69i57j69i60l3.833j0j1&sourceid=chrome&ie=UTF-8#lrd=0x3a5267c20f7f4217:0x4ca2445a914f87bf,1,,," target="_blank">
                <img style={{width:'12%', marginTop:20}} src={googleReview} alt="google-review"/>
              </a>
            </div>
      </React.Fragment>
    );
  }