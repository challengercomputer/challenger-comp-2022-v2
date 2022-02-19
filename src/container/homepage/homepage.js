import React, {Component} from "react";
import {Helmet} from "react-helmet";
import HeroSlider from './HeroSlider';
import Features from './Features';
// import Explore from './Explore';
import Reviews from './Reviews';
import ThemeImage from '../../assets/case.png';

//material UI
//Components





import Statistics from "./Statistics";
import PricingCompetitive from "./PricingCompetitive.js";
import Config from "../../store/Config/index.jsx";

import {Container, 
  // Row, Col, Card, 
  Tab, Tabs, TabContent, 
  // Badge
} from "react-bootstrap";
import {motion} from "framer-motion";
// import {XAxis, Tooltip, ResponsiveContainer, LineChart, Line} from "recharts";
// import { Link as DivLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import pcmodel from '../../assets/pc_3d.gif';
//lazyload
// import LazyLoad from 'react-lazyload';

//material UI
// import HomepageCarousel from './homepageCarousel';
//Components
import PromotionalCard from "../../Components/PromotionalProducts/promotionalProductCards";




//Media Query CSS
import "./homepage.css";
import "./index.scss";

// import PC from "./pc2.mp4";

const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        
        <Helmet>
            <title>{Config.challengers__title} | {Config.challengers__sub}</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content={Config.challengers__websiteType} />

            {/* <meta name="twitter:card" content={singlePost.publicImg.asset.url} /> */}

            <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

            <meta property="og:description" content={Config.challengers__desc} />
            <meta itemprop="description" content={Config.challengers__desc} />
            <meta name="twitter:description" content={Config.challengers__desc} />

            <meta property="og:image" content={ThemeImage} />
            <meta itemprop="image" content={ThemeImage} />
            <meta name="twitter:image" content={ThemeImage} />
          </Helmet>

            
          <HeroSlider />
          <Statistics/>
          <PricingCompetitive/>
          <Features />
          
        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}
          transition={{ duration: 1 }}>

            <section id="explore" name="explore" className="explore-area pb-100">
              <div className="container">
                <Tabs
                defaultActiveKey='home'
                id='uncontrolled-tab-example'
                style={{
                  marginBottom: "56px",
                  border: "1px solid #CDCDCD",
                  borderRadius: "0px",
                  marginTop: "56px",
                }}>
                <Tab eventKey='home' title='PREBUILDS' >
                  <TabContent style={{ marginTop: "24px", color: "white" }}>
                    <Container>
                      <PromotionalCard payload={'prebuild'}/>
                    </Container>
                  </TabContent>
                </Tab>
                <Tab eventKey='profile' title='LAPTOPS'>
                <TabContent>
                    <Container>
                      <PromotionalCard payload={'laptop'}/>
                    </Container>
                  </TabContent>
                </Tab>
              </Tabs>
              </div>
            </section>
        </motion.div>

        <Reviews />
      </React.Fragment>
    );
  }
}
