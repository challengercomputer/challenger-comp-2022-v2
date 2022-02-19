import React, {Component} from "react";
import {Container, Row, Col, Card, Tab, Tabs, TabContent, Badge} from "react-bootstrap";
import {motion} from "framer-motion";
import {XAxis, Tooltip, ResponsiveContainer, LineChart, Line} from "recharts";
import { Link as DivLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import pcmodel from '../../assets/pc_3d.gif';
//lazyload
import LazyLoad from 'react-lazyload';

//material UI
import HomepageCarousel from './homepageCarousel';
//Components
import PromotionalCard from "../../Components/PromotionalProducts/promotionalProductCards";




//Media Query CSS
import "./homepage.css";

// import PC from "./pc2.mp4";

const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
};

const pathVariants2 = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 6,
      ease: "easeInOut",
    },
  },
};
const data = [
  {
    name: "PC Cases Upto 32% less",
    uv: 4000,
    pv: 2400
  },
  {
    name: "CPUs Upto 15% less",
    uv: 3000,
    pv: 1398
  },
  {
    name: "GPUs Upto 22% less",
    uv: 9800,
    pv: 3300
  },
  {
    name: "RAM Upto 15% less",
    uv: 3908,
    pv: 2780
  },
  {
    name: "SMPS Upto 15% less",
    uv: 4800,
    pv: 1890
  },
  {
    name: "Gaming Rigs Upto 25% less",
    uv: 3800,
    pv: 2390
  }
];

const renderCustomAxisTick = ({ x, y, payload }) => {
  let path = "";

  switch (payload.value) {
    case "PC Cases Upto 32% less":
      path =
        "M35.5897 2H23.359C22.0513 2 21 3.07712 21 4.41695V28.639C21 29.9788 22.0513 31.0559 23.359 31.0559H24.1795V32.0805C24.1795 32.5797 24.5641 33 25.0769 33C25.5897 33 25.9744 32.6059 25.9744 32.0805V31.0559H33.0256V32.0805C33.0256 32.5797 33.4103 33 33.9231 33C34.4359 33 34.8205 32.6059 34.8205 32.0805V31.0559H35.641C36.9487 31.0559 38 29.9788 38 28.639V4.41695C37.9744 3.07712 36.8974 2 35.5897 2ZM36.1795 28.639C36.1795 28.9805 35.9231 29.2432 35.5897 29.2432H23.359C23.0256 29.2432 22.7692 28.9805 22.7692 28.639V4.41695C22.7692 4.07542 23.0256 3.81271 23.359 3.81271H35.5897C35.9231 3.81271 36.1795 4.07542 36.1795 4.41695V28.639ZM26.0769 9.01441H32.8462C33.3333 9.01441 33.7436 8.62034 33.7436 8.09492C33.7436 7.56949 33.359 7.17542 32.8462 7.17542H26.0769C25.5897 7.17542 25.1795 7.56949 25.1795 8.09492C25.1795 8.62034 25.5897 9.01441 26.0769 9.01441ZM33.7179 11.7992C33.7179 11.3 33.3333 10.8797 32.8205 10.8797H26.0769C25.5897 10.8797 25.1795 11.2737 25.1795 11.7992C25.1795 12.3246 25.5641 12.7186 26.0769 12.7186H32.8462C33.3333 12.6924 33.7179 12.2983 33.7179 11.7992ZM29.4872 25.4076C29.2564 25.4076 29.0256 25.5127 28.8718 25.6703C28.7179 25.828 28.6154 26.0644 28.6154 26.3008C28.6154 26.5373 28.7179 26.7737 28.8718 26.9314C29.0256 27.089 29.2564 27.1941 29.4872 27.1941C29.7179 27.1941 29.9487 27.089 30.1026 26.9314C30.2564 26.7737 30.359 26.5373 30.359 26.3008C30.359 26.0644 30.2564 25.828 30.1026 25.6703C29.9487 25.4864 29.7179 25.4076 29.4872 25.4076Z";
      break;
    case "CPUs Upto 15% less":
      path =
        "M26.94,26.87H11a.9.9,0,0,1-.9-.9V10.06a.9.9,0,0,1,.9-.9H26.94a.9.9,0,0,1,.9.9V26A.9.9,0,0,1,26.94,26.87ZM26,11H11.93V25.08H26.05V11ZM17.29,32a.9.9,0,0,1-.9-.9V28.25a.9.9,0,1,1,1.8,0V31.1A.9.9,0,0,1,17.29,32Zm3.42,0a.9.9,0,0,1-.9-.9V28.25a.9.9,0,1,1,1.8,0V31.1A.9.9,0,0,1,20.71,32Zm-6.84,0a.9.9,0,0,1-.9-.9V28.25a.9.9,0,0,1,1.8,0V31.1A.9.9,0,0,1,13.87,32Zm10.26,0a.9.9,0,0,1-.9-.9V28.25a.9.9,0,1,1,1.8,0V31.1A.9.9,0,0,1,24.13,32ZM17.29,8.65a.9.9,0,0,1-.9-.9V4.9a.9.9,0,1,1,1.8,0V7.75A.9.9,0,0,1,17.29,8.65Zm3.42,0a.9.9,0,0,1-.9-.9V4.9a.9.9,0,0,1,1.8,0V7.75A.9.9,0,0,1,20.71,8.65Zm-6.84,0a.91.91,0,0,1-.9-.9V4.9a.9.9,0,0,1,1.8,0V7.75A.9.9,0,0,1,13.87,8.65Zm10.26,0a.9.9,0,0,1-.9-.9V4.9a.9.9,0,1,1,1.8,0V7.75A.91.91,0,0,1,24.13,8.65Zm8,12H29.25a.9.9,0,1,1,0-1.8H32.1a.9.9,0,1,1,0,1.8Zm0-3.42H29.25a.9.9,0,0,1,0-1.8H32.1a.9.9,0,0,1,0,1.8Zm0,6.84H29.25a.9.9,0,0,1,0-1.8H32.1a.9.9,0,0,1,0,1.8Zm0-10.26H29.25a.9.9,0,1,1,0-1.8H32.1a.9.9,0,1,1,0,1.8ZM8.75,20.61H5.9a.9.9,0,1,1,0-1.8H8.75a.9.9,0,1,1,0,1.8Zm0-3.42H5.9a.9.9,0,0,1,0-1.8H8.75a.9.9,0,0,1,0,1.8Zm0,6.84H5.9a.9.9,0,1,1,0-1.8H8.75a.9.9,0,0,1,0,1.8Zm0-10.26H5.9a.9.9,0,0,1,0-1.8H8.75a.9.9,0,0,1,0,1.8Zm13.1,8h-5.7a.91.91,0,0,1-.9-.9v-5.7a.91.91,0,0,1,.9-.9h5.7a.91.91,0,0,1,.9.9v5.7A.91.91,0,0,1,21.85,21.75Zm-.9-5.7h-3.9V20H21Z";
      break;
    case "GPUs Upto 22% less":
      path =
        "M35.29,8.46h-4V7.89a1.7,1.7,0,0,0-1.7-1.7H18.81a1.71,1.71,0,0,0-1.71,1.7v2.28h-.26l-1-1.46a.59.59,0,0,0-.47-.25H3.46a1.72,1.72,0,0,0-1.71,1.71V25a1.71,1.71,0,0,0,1.71,1.7h4V29.5a.57.57,0,0,0,.56.57H26.2a.58.58,0,0,0,.57-.57V26.65h8.52A1.71,1.71,0,0,0,37,25V10.17A1.72,1.72,0,0,0,35.29,8.46Zm-17-.57a.57.57,0,0,1,.57-.57h10.8a.58.58,0,0,1,.57.57v.57H23.35a.6.6,0,0,0-.47.25l-1,1.46H18.24Zm7.39,21H8.57V26.65H9.71v1.14h1.14V26.65H12v1.14h1.14V26.65h1.14v1.14H15.4V26.65h1.13v1.14h1.14V26.65h1.14v1.14h1.13V26.65h1.14v1.14h1.14V26.65h1.13v1.14h1.14V26.65h1.14Zm10.23-4a.57.57,0,0,1-.57.57H3.46A.57.57,0,0,1,2.89,25V10.17a.56.56,0,0,1,.57-.57H15.09l1,1.45a.56.56,0,0,0,.47.25h5.69a.56.56,0,0,0,.47-.25l1-1.45H35.29a.56.56,0,0,1,.57.57Zm-25-14.22a6.83,6.83,0,1,0,6.82,6.83A6.83,6.83,0,0,0,10.85,10.73Zm0,6.26a.57.57,0,0,1,.57.57.58.58,0,0,1-.57.57.57.57,0,0,1-.57-.57A.56.56,0,0,1,10.85,17Zm.29-1.11h0a2.86,2.86,0,0,1,0-4,5.66,5.66,0,0,1,2.79.87,4.08,4.08,0,0,0-1.62,1,4,4,0,0,0-1.11,2.14Zm-1.27.28,0,0A2.83,2.83,0,0,1,7,13.38,5.68,5.68,0,0,1,9.59,12a4,4,0,0,0,.28,4.14ZM7,16.15a4,4,0,0,0,2.14,1.11v0a2.84,2.84,0,0,1-4,0A5.7,5.7,0,0,1,6,14.53a4,4,0,0,0,1,1.62Zm3.52,3.08h0a2.82,2.82,0,0,1,0,4,5.59,5.59,0,0,1-2.79-.87,4,4,0,0,0,2.73-3.13ZM11.82,19l0,0a2.82,2.82,0,0,1,2,.84,2.78,2.78,0,0,1,.83,2A5.69,5.69,0,0,1,12.1,23.1a4,4,0,0,0,.45-1.85,4,4,0,0,0-.73-2.3Zm2.85,0a4,4,0,0,0-2.15-1.11,0,0,0,0,1,0,0,2.85,2.85,0,0,1,4,0,5.56,5.56,0,0,1-.87,2.79,4,4,0,0,0-1-1.62Zm-.13-3.11a4,4,0,0,0-2.3.73l0,0a2.82,2.82,0,0,1,.84-2,2.87,2.87,0,0,1,2-.83,5.7,5.7,0,0,1,1.37,2.59,4,4,0,0,0-1.85-.45Zm-9.23,3a4,4,0,0,0,4.14-.28l0,0a2.85,2.85,0,0,1-.83,2,2.82,2.82,0,0,1-2,.83,5.59,5.59,0,0,1-1.36-2.59ZM27.9,10.73a6.83,6.83,0,1,0,6.83,6.83A6.83,6.83,0,0,0,27.9,10.73Zm0,6.26a.56.56,0,0,1,.57.57.57.57,0,0,1-.57.57.58.58,0,0,1-.57-.57A.57.57,0,0,1,27.9,17Zm.3-1.11h0a2.84,2.84,0,0,1,0-4,5.7,5.7,0,0,1,2.79.87,4,4,0,0,0-1.62,1,4,4,0,0,0-1.11,2.14Zm-1.27.28,0,0a2.85,2.85,0,0,1-2-.83,2.82,2.82,0,0,1-.83-2A5.59,5.59,0,0,1,26.65,12a4,4,0,0,0,.28,4.14Zm-2.85,0a4,4,0,0,0,2.15,1.11,0,0,0,0,1,0,0,2.82,2.82,0,0,1-4,0,5.59,5.59,0,0,1,.87-2.79,4,4,0,0,0,1,1.62Zm3.53,3.08h0a2.85,2.85,0,0,1,0,4,5.56,5.56,0,0,1-2.79-.87,4,4,0,0,0,2.73-3.13ZM28.88,19l0,0a2.85,2.85,0,0,1,2.84,2.8,5.8,5.8,0,0,1-2.59,1.37,4,4,0,0,0,.45-1.85,4,4,0,0,0-.73-2.3Zm2.84,0a4,4,0,0,0-2.14-1.11v0a2.86,2.86,0,0,1,4,0,5.66,5.66,0,0,1-.87,2.79,4,4,0,0,0-1-1.62Zm-.12-3.11a4,4,0,0,0-2.3.73l0,0a2.85,2.85,0,0,1,.83-2,2.91,2.91,0,0,1,2-.83,5.68,5.68,0,0,1,1.36,2.59,4,4,0,0,0-1.84-.45Zm-9.24,3a4,4,0,0,0,4.15-.28l0,0a2.82,2.82,0,0,1-.84,2,2.78,2.78,0,0,1-2,.83,5.6,5.6,0,0,1-1.37-2.59ZM4,10.73H5.16v1.14H4ZM4,23.24H5.16v1.14H4ZM33.59,10.73h1.14v1.14H33.59Zm0,12.51h1.14v1.14H33.59Z";
      break;
    case "RAM Upto 15% less":
      path =
        "M35.43,14.32a.57.57,0,0,0,.57-.57V11.48a.56.56,0,0,0-.57-.56H2.57a.56.56,0,0,0-.57.56v2.27a.57.57,0,0,0,.57.57.57.57,0,0,1,0,1.13A.56.56,0,0,0,2,16v6.8a.56.56,0,0,0,.57.56h.56v1.14a.57.57,0,0,0,.57.56H13.9a.57.57,0,0,0,.57-.56V23.38H15.6v1.14a.56.56,0,0,0,.57.56H34.3a.57.57,0,0,0,.57-.56V23.38h.56a.56.56,0,0,0,.57-.56V16a.56.56,0,0,0-.57-.57.57.57,0,0,1,0-1.13ZM13.33,24H4.27v-.57h9.06Zm20.4,0h-17v-.57h17Zm1.14-10.67a1.7,1.7,0,0,0,0,3.21v5.76H3.13V16.49l.06,0,.09,0a.77.77,0,0,0,.18-.1l.09-.05.19-.16,0,0A2,2,0,0,0,4,15.85l0-.07a1.14,1.14,0,0,0,.1-.19.3.3,0,0,0,0-.1.66.66,0,0,0,.06-.2l0-.09a1.67,1.67,0,0,0,0-.63l0-.09a.66.66,0,0,0-.06-.2.3.3,0,0,0,0-.1A1.74,1.74,0,0,0,4,14l0-.07a2,2,0,0,0-.18-.23l0,0-.19-.16-.09-.05a.77.77,0,0,0-.18-.1l-.09,0-.06,0V12.05H34.87Zm-14.17-.1H17.3a.58.58,0,0,0-.57.57v5.67a.57.57,0,0,0,.57.56h3.4a.57.57,0,0,0,.57-.56V13.75A.58.58,0,0,0,20.7,13.18Zm-.57,5.67H17.87V14.32h2.26Zm6.24-5.67H23a.57.57,0,0,0-.57.57v5.67A.56.56,0,0,0,23,20h3.4a.56.56,0,0,0,.56-.56V13.75A.57.57,0,0,0,26.37,13.18Zm-.57,5.67H23.53V14.32H25.8ZM9.37,13.18H6a.57.57,0,0,0-.57.57v5.67A.56.56,0,0,0,6,20h3.4a.56.56,0,0,0,.56-.56V13.75A.57.57,0,0,0,9.37,13.18ZM8.8,18.85H6.53V14.32H8.8ZM15,13.18h-3.4a.57.57,0,0,0-.56.57v5.67a.56.56,0,0,0,.56.56H15a.56.56,0,0,0,.57-.56V13.75A.57.57,0,0,0,15,13.18Zm-.56,5.67H12.2V14.32h2.27ZM32,13.18h-3.4a.57.57,0,0,0-.56.57v5.67a.56.56,0,0,0,.56.56H32a.56.56,0,0,0,.57-.56V13.75A.57.57,0,0,0,32,13.18Zm-.56,5.67H29.2V14.32h2.27Z";
      break;
    case "SMPS Upto 15% less":
      path =
        "M33.12,33H4.88A.87.87,0,0,1,4,32.12V3.88A.87.87,0,0,1,4.88,3H33.12a.87.87,0,0,1,.88.88V32.12A.87.87,0,0,1,33.12,33ZM32.24,4.76H5.76V31.24H32.24ZM19,30.6A12.6,12.6,0,1,1,31.6,18,12.6,12.6,0,0,1,19,30.6Zm0-1.76a10.78,10.78,0,0,0,7-2.58l-1.66-1.67a8.45,8.45,0,0,1-10.7,0L12,26.26A10.78,10.78,0,0,0,19,28.84Zm2.42-7.18a4.38,4.38,0,0,1-4.84,0L14.9,23.34a6.7,6.7,0,0,0,8.2,0ZM21.64,18a2.72,2.72,0,0,0-.26-1.14L20.24,18l1.14,1.14A2.72,2.72,0,0,0,21.64,18ZM19,19.24l-1.14,1.14a2.63,2.63,0,0,0,2.28,0Zm1.14-3.62a2.63,2.63,0,0,0-2.28,0L19,16.76ZM17.76,18l-1.14-1.14a2.63,2.63,0,0,0,0,2.28Zm-2.42,2.42a4.38,4.38,0,0,1,0-4.84L13.66,13.9a6.7,6.7,0,0,0,0,8.2Zm1.24-6.08a4.38,4.38,0,0,1,4.84,0l1.68-1.68a6.7,6.7,0,0,0-8.2,0Zm6.08,1.24a4.38,4.38,0,0,1,0,4.84l1.68,1.68a6.7,6.7,0,0,0,0-8.2ZM8.16,18a10.78,10.78,0,0,0,2.58,7l1.67-1.66a8.45,8.45,0,0,1,0-10.7L10.74,11A10.78,10.78,0,0,0,8.16,18ZM19,7.16a10.78,10.78,0,0,0-7,2.58l1.66,1.67a8.45,8.45,0,0,1,10.7,0L26,9.74A10.78,10.78,0,0,0,19,7.16ZM27.26,11l-1.67,1.66a8.45,8.45,0,0,1,0,10.7L27.26,25a10.81,10.81,0,0,0,0-14ZM8.1,27.73A1.17,1.17,0,1,1,6.93,28.9,1.17,1.17,0,0,1,8.1,27.73Zm21.8,0a1.17,1.17,0,1,1-1.17,1.17A1.17,1.17,0,0,1,29.9,27.73ZM8.1,5.93A1.17,1.17,0,1,1,6.93,7.1,1.17,1.17,0,0,1,8.1,5.93Zm21.8,0A1.17,1.17,0,1,1,28.73,7.1,1.17,1.17,0,0,1,29.9,5.93Z";
      break;
    case "Gaming Rigs Upto 25% less":
      path =
        "M17 5C9.80667 5 4 10.8067 4 18V28.2267C4 29.7867 5.21333 31 6.77333 31H10.5C11.02 31 11.4533 30.5667 11.4533 30.0467V20.7733C11.4533 20.2533 11.02 19.82 10.5 19.82H6.77333C6.42667 19.82 6.16667 19.9067 5.82 19.9933V18C5.82 11.8467 10.8467 6.82 17 6.82C23.1533 6.82 28.18 11.8467 28.18 18V19.9933C27.92 19.9067 27.5733 19.82 27.2267 19.82H23.5C22.98 19.82 22.5467 20.2533 22.5467 20.7733V30.0467C22.5467 30.5667 22.98 31 23.5 31H27.2267C28.7867 31 30 29.7867 30 28.2267V18C30 10.8067 24.1933 5 17 5ZM6.77333 21.7267H9.54667V29.18H6.77333C6.25333 29.18 5.82 28.7467 5.82 28.2267V22.68C5.82 22.16 6.25333 21.7267 6.77333 21.7267ZM28.18 28.2267C28.18 28.7467 27.7467 29.18 27.2267 29.18H24.4533V21.7267H27.2267C27.7467 21.7267 28.18 22.16 28.18 22.68V28.2267Z";
      break;
    default:
      path = "";
  }

  return (
    <svg
      x={x - 30}
      y={260}
      width='50'
      height='40'
      viewBox='0 0 17.6 31.4'
      fill='white'>
      <path className='cls-1' d={path} transform='translate(-10.5 -2.5)' />
    </svg>
  );
};

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}
          transition={{ duration: 1 }}>
          <header className='masthead2' id='module'>
            <Container id='ContainerWidth'>
              <Row>
                <Col lg={4} md={12} sm={12} xs={12} id='masthead-title'>
                  <h1
                    className='product-title'
                    style={{ color: "white", fontWeight: 700 }}>
                    <div className='line'>
                      <span>Design &amp; Build</span>
                    </div>
                    <div className='line'>
                      <span>your own PC</span>
                    </div>
                  </h1>
                  <h5
                    className='productSub'>
                    We are everything from building<br></br>gaming PCs to
                    buying laptops.
                  </h5>
                  <DivLink style={{zIndex: "1", padding:"10px 27px 10px 27px", marginTop: "27px"}}  id='budgetDesktop' to="explore" spy={true} smooth={true} offset={50} duration={500} > 
                      <span></span>
                      <span></span>
                      <span></span>
                      Explore
                  </DivLink>
                </Col>
                <Col lg={8} md={12} sm={12} xs={12}>
                    <div className="pc-model">
                        <img className="pc-image" src={pcmodel} alt="3d_model"/>
                    </div>
                </Col>
              </Row>
            </Container>
          </header>
          <div id='module2'>      
              <Container
                id='ContainerWidth'
                style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <Row style={{ textAlign: "center" }}>
                  <Col xs={6} sm={6} md={3} lg={3}>
                    <div className='widgets_div'>
                      <div className='text_div'>
                        <h3 style={{ fontWeight: 800, padding: 0, margin: 0 }}>
                          2.5L+
                        </h3>
                        <h5 style={{ padding: 0, margin: 0 }}>Pcs Built</h5>
                      </div>

                      <div className='icon_div'>
                        <motion.svg
                          width='88'
                          height='103'
                          viewBox='0 0 88 103'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          animate='visible'
                          initial='hidden'>
                          <motion.path
                            d='M43.6848 7.98706L6.50781 45.1641V57.7111L34.5818 85.7851L43.6818 94.8851L80.8588 57.7081V45.1611L43.6848 7.98706Z'
                            stroke='#D8012B'
                            variants={pathVariants}
                          />
                          <motion.path
                            d='M43.6819 1L0.526855 44.1551V58.72L33.1149 91.308L43.6808 101.874L86.8358 58.7191V44.154L43.6819 1Z'
                            stroke='#4F000F'
                            variants={pathVariants2}
                          />
                          <path
                            opacity='0.26'
                            d='M43.6848 13.1479L10.9238 45.909V56.966L35.6628 81.705L43.6848 89.726L76.4458 56.965V45.908L43.6848 13.1479Z'
                            fill='#F60030'
                            stroke='#4F000F'
                          />
                          <path
                            d='M30.6338 38.553V45.8049L34.9068 50.337H42.2858V43.474L37.3648 38.553H30.6338Z'
                            fill='white'
                          />
                          <path
                            opacity='0.31'
                            d='M44.4141 52.333V59.585L48.6871 64.1171H56.0661V57.254L51.1451 52.333H44.4141Z'
                            fill='white'
                          />
                          <path
                            d='M56.1338 38.618H48.8818L44.3498 42.891V50.273H51.2128L56.1338 45.352V38.618Z'
                            fill='white'
                          />
                          <path
                            opacity='0.31'
                            d='M42.354 52.397H35.102L30.57 56.67V64.052H37.433L42.354 59.131V52.397Z'
                            fill='white'
                          />
                        </motion.svg>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={3} lg={3}>
                    <div className='widgets_div'>
                      <div className='text_div'>
                        <h3 style={{ fontWeight: 800, padding: 0, margin: 0 }}>
                          30+
                        </h3>
                        <h5 style={{ padding: 0, margin: 0 }}>Years XP</h5>
                      </div>

                      <div className='icon_div'>
                        <motion.svg
                          width='88'
                          height='103'
                          viewBox='0 0 88 103'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          animate='visible'
                          initial='hidden'>
                          <motion.path
                            d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z'
                            stroke='#D8012B'
                            variants={pathVariants}
                          />
                          <motion.path
                            d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z'
                            stroke='#4F000F'
                            variants={pathVariants2}
                          />
                          <path
                            opacity='0.26'
                            d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z'
                            fill='#F60030'
                            stroke='#4F000F'
                          />
                          <path
                            d='M34.3273 49.6156V52H27L39.3375 28L52 52H44.7258V49.3046H47.6356L39.3375 34.1168L31.633 49.6156H34.3273Z'
                            fill='white'
                          />
                          <path
                            d='M52.9661 52.3859V50.0015H60L48.156 74L36 50H42.984V52.6954H40.1904L48.156 67.8832L55.5524 52.3859H52.9661Z'
                            fill='white'
                          />
                        </motion.svg>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={3} lg={3}>
                    <div className='widgets_div'>
                      <div className='text_div'>
                        <h3 style={{ fontWeight: 800, padding: 0, margin: 0 }}>
                          3 YRS
                        </h3>
                        <h5 style={{ padding: 0, margin: 0 }}>Warranty</h5>
                      </div>

                      <div className='icon_div'>
                        <motion.svg
                          width='88'
                          height='103'
                          viewBox='0 0 88 103'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          animate='visible'
                          initial='hidden'>
                          <motion.path
                            d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z'
                            stroke='#D8012B'
                            variants={pathVariants}
                          />
                          <motion.path
                            d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z'
                            stroke='#4F000F'
                            variants={pathVariants2}
                          />
                          <path
                            opacity='0.26'
                            d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z'
                            fill='#F60030'
                            stroke='#4F000F'
                          />
                          <path
                            d='M34.0044 38.8143L43.2205 47.1315L52.6618 38.8143C52.6618 38.8143 47.8841 35.6672 43.2205 35.6672C38.557 35.6672 34.0044 38.8143 34.0044 38.8143Z'
                            fill='white'
                            fillOpacity='0.31'
                          />
                          <path
                            d='M55.8525 42.0048L47.5353 51.2209L55.8525 60.662C55.8525 60.662 58.9995 55.8842 58.9995 51.2209C58.9995 46.5576 55.8525 42.0048 55.8525 42.0048Z'
                            fill='white'
                          />
                          <path
                            d='M52.6626 63.853L43.4465 55.5357L34.0053 63.853C34.0053 63.853 38.7831 67 43.4465 67C48.1098 67 52.6626 63.853 52.6626 63.853Z'
                            fill='white'
                            fillOpacity='0.31'
                          />
                          <path
                            d='M30.8145 60.6622L39.1317 51.4461L30.8145 42.0049C30.8145 42.0049 27.6675 46.7828 27.6675 51.4461C27.6675 56.1094 30.8145 60.6622 30.8145 60.6622Z'
                            fill='white'
                          />
                        </motion.svg>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={3} lg={3}>
                    <div className='widgets_div'>
                      <div className='text_div'>
                        <h3 style={{ fontWeight: 800, padding: 0, margin: 0 }}>
                          Tech
                        </h3>
                        <h5 style={{ padding: 0, margin: 0 }}>Support</h5>
                      </div>

                      <div className='icon_div'>
                        <motion.svg
                          width='88'
                          height='103'
                          viewBox='0 0 88 103'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          animate='visible'
                          initial='hidden'>
                          <motion.path
                            d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z'
                            stroke='#D8012B'
                            variants={pathVariants}
                          />
                          <motion.path
                            d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z'
                            stroke='#4F000F'
                            variants={pathVariants2}
                          />
                          <path
                            opacity='0.26'
                            d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z'
                            fill='#F60030'
                            stroke='#4F000F'
                          />
                          <path
                            d='M43.1342 34L35 38.6557V47.8013L43.1342 52.7895L51.1053 47.8013V38.6557L43.1342 34Z'
                            fill='white'
                          />
                          <path
                            opacity='0.31'
                            d='M35.0815 49.2106L26.9473 53.8662V63.0119L35.0815 68L43.0525 63.0119V53.8662L35.0815 49.2106Z'
                            fill='white'
                          />
                          <path
                            opacity='0.31'
                            d='M52.0815 49.2106L43.9473 53.8662V63.0119L52.0815 68L60.0525 63.0119V53.8662L52.0815 49.2106Z'
                            fill='white'
                          />
                        </motion.svg>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
          </div>

          
          {/* <Badge className="styled-badge" variant="danger">coming soon...</Badge> */}
          <Container id='ContainerWidth'>
            <Element style={{ paddingTop: "100px", paddingBottom: "100px" }}>
              <Row>
                <Col sm={12} lg={6}>
                  <h1
                    className='product-title'
                    style={{ color: "white", fontWeight: 700 }}>
                    <span style={{ fontWeight: 200 }}>
                      Our pricing is
                      <span style={{ fontWeight: 700 }}>&nbsp;transparent</span>
                    </span>
                    <br></br>
                    <span>&amp; competitive</span>
                  </h1>

                  <p style={{ marginTop: "24px" }}>
                    We list everything that goes into your build and display
                    cost clearly. Our mission is to make PC building more
                    cost-effective than buying parts separately.
                  </p>
                  <Row style={{ marginTop: "20px" }}>
                    <Col sm={7}>
                      <span style={{ display: "flex" }}>
                        <svg
                          width='27'
                          height='27'
                          viewBox='0 0 27 27'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <rect
                            x='3'
                            y='5'
                            width='15'
                            height='15'
                            fill='#EC2434'
                          />
                        </svg>
                        <p style={{ margin: 0 }}>CHALLENGER COMPUTERS</p>
                      </span>
                    </Col>
                    <Col sm={5}>
                      <span style={{ display: "flex" }}>
                        <svg
                          width='27'
                          height='27'
                          viewBox='0 0 27 27'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <rect
                            x='3'
                            y='5'
                            width='15'
                            height='15'
                            fill='#1F2536'
                          />
                        </svg>
                        <p style={{ margin: 0 }}>COMPETITOR</p>
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={6}>
                  <LazyLoad ref={this.myRef} debounce={true}>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <LineChart
                          data={data}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 0,
                          }}>
                          {/* <CartesianGrid strokeDasharray='1 1' /> */}
                          <XAxis
                            interval={0}
                            tickLine={false}
                            dataKey='name'
                            tick={renderCustomAxisTick}
                            dx={60}
                            offset={20}
                          />
                          {/* <YAxis /> */}
                          <Tooltip dots={false} cursor={false} />
                          <Line
                            type='monotone'
                            dataKey='uv'
                            stackId='1'
                            stroke='#1F2536'
                            strokeWidth={2}
                          />
                          <Line
                            type='monotone'
                            dataKey='pv'
                            stackId='1'
                            stroke='#EC2434'
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </LazyLoad>
                  <Row>
                    <Col></Col>
                  </Row>
                </Col>
              </Row>
            </Element>
          </Container>
          <div
            id='whatsection'
            style={{ paddingTop: "100px", paddingBottom: "100px" }}>
            <Container id='ContainerWidth'>
              <Row>
                <Col sm={6}></Col>
                <Col sm={6}>
                  <h1
                    className='product-title'
                    style={{ color: "white", fontWeight: 700 }}>
                    <span style={{ fontWeight: 700 }}>
                      Tell us the games you play
                      <span style={{ fontWeight: 200 }}>
                        &nbsp; and we'll suggest you a PC
                      </span>
                    </span>
                  </h1>
                  <div onClick={()=>this.props.history.push('/suggestme')} style={{padding:"10px 27px 10px 27px", marginTop: "27px"}}  id='budgetDesktop' to="explore" spy={true} smooth={true} offset={50} duration={500} > 
                      <span></span>
                      <span></span>
                      <span></span>
                      Suggest Me
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Container name="explore" id='ContainerWidth'>
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
            <HomepageCarousel/>
          </Container> <br/>
        </motion.div>
      </React.Fragment>
    );
  }
}
