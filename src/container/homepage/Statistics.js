import React, { Component } from 'react';
import Config from '../../store/Config';
import StatisticsBG from './redopt.gif';
import {motion} from "framer-motion";

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

export class Statistics extends Component {
    render() {
        return (
            <section className="statistics-area" style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${StatisticsBG})`}}>
                <div className="container">
                    <div className="row">
                        {List.map(item => (
                            <div key={item.id} className="col-lg-3 col-sm-6">
                                <div className="statistics-area__single">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="counter-item me-3">
                                            <h1 className="fs-4xl mb-0">
                                              { item.count ? <span>{Config.numFormatter(item.count)}</span> : 
                                                item.name ? item.name : null
                                              }{item.ext ? item.ext : null}</h1>
                                            <p className="mb-0 fs-lg">{item.title}</p>
                                        </div>
                                        <div className="counter-icon">
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}

export default Statistics



const List = [
    {
        id: 1,
        count: 250000,
        ext: '+',
        title: 'Pcs Built',
        icon: <motion.svg width='88' height='103' viewBox='0 0 88 103' fill='none' xmlns='http://www.w3.org/2000/svg' animate='visible' initial='hidden'> <motion.path d='M43.6848 7.98706L6.50781 45.1641V57.7111L34.5818 85.7851L43.6818 94.8851L80.8588 57.7081V45.1611L43.6848 7.98706Z' stroke='#D8012B' variants={pathVariants} /> <motion.path d='M43.6819 1L0.526855 44.1551V58.72L33.1149 91.308L43.6808 101.874L86.8358 58.7191V44.154L43.6819 1Z' stroke='#4F000F' variants={pathVariants2} /> <motion.path opacity='0.26' d='M43.6848 13.1479L10.9238 45.909V56.966L35.6628 81.705L43.6848 89.726L76.4458 56.965V45.908L43.6848 13.1479Z' fill='#F60030' stroke='#4F000F' /> <motion.path d='M30.6338 38.553V45.8049L34.9068 50.337H42.2858V43.474L37.3648 38.553H30.6338Z' fill='white' /> <motion.path opacity='0.31' d='M44.4141 52.333V59.585L48.6871 64.1171H56.0661V57.254L51.1451 52.333H44.4141Z' fill='white' /> <motion.path d='M56.1338 38.618H48.8818L44.3498 42.891V50.273H51.2128L56.1338 45.352V38.618Z' fill='white' /> <motion.path opacity='0.31' d='M42.354 52.397H35.102L30.57 56.67V64.052H37.433L42.354 59.131V52.397Z' fill='white' /> </motion.svg>
    },
    {
        id: 2,
        count: 30,
        ext: '+',
        title: 'Years XP',
        icon: <motion.svg width='88' height='103' viewBox='0 0 88 103' fill='none' xmlns='http://www.w3.org/2000/svg' animate='visible' initial='hidden'> <motion.path d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z' stroke='#D8012B' variants={pathVariants} /> <motion.path d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z' stroke='#4F000F' variants={pathVariants2} /> <path opacity='0.26' d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z' fill='#F60030' stroke='#4F000F' /> <path d='M34.3273 49.6156V52H27L39.3375 28L52 52H44.7258V49.3046H47.6356L39.3375 34.1168L31.633 49.6156H34.3273Z' fill='white' /> <path d='M52.9661 52.3859V50.0015H60L48.156 74L36 50H42.984V52.6954H40.1904L48.156 67.8832L55.5524 52.3859H52.9661Z' fill='white'/></motion.svg>
    },
    {
        id: 3,
        name: '3 YRS',
        title: 'Warranty',
        icon: <motion.svg width='88' height='103' viewBox='0 0 88 103' fill='none' xmlns='http://www.w3.org/2000/svg' animate='visible' initial='hidden'> <motion.path d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z' stroke='#D8012B' variants={pathVariants} /> <motion.path d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z' stroke='#4F000F' variants={pathVariants2} /> <path opacity='0.26' d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z' fill='#F60030' stroke='#4F000F' /> <path d='M34.0044 38.8143L43.2205 47.1315L52.6618 38.8143C52.6618 38.8143 47.8841 35.6672 43.2205 35.6672C38.557 35.6672 34.0044 38.8143 34.0044 38.8143Z' fill='white' fillOpacity='0.31' /> <path d='M55.8525 42.0048L47.5353 51.2209L55.8525 60.662C55.8525 60.662 58.9995 55.8842 58.9995 51.2209C58.9995 46.5576 55.8525 42.0048 55.8525 42.0048Z' fill='white' /> <path d='M52.6626 63.853L43.4465 55.5357L34.0053 63.853C34.0053 63.853 38.7831 67 43.4465 67C48.1098 67 52.6626 63.853 52.6626 63.853Z' fill='white' fillOpacity='0.31' /> <path d='M30.8145 60.6622L39.1317 51.4461L30.8145 42.0049C30.8145 42.0049 27.6675 46.7828 27.6675 51.4461C27.6675 56.1094 30.8145 60.6622 30.8145 60.6622Z' fill='white' /> </motion.svg> 
    },
    {
        id: 4,
        name: 'Tech',
        title: 'Support',
        icon: <motion.svg width='88' height='103' viewBox='0 0 88 103' fill='none' xmlns='http://www.w3.org/2000/svg' animate='visible' initial='hidden'> <motion.path d='M44.158 7.98706L6.98096 45.1641V57.7111L35.055 85.7851L44.155 94.8851L81.3319 57.7081V45.1611L44.158 7.98706Z' stroke='#D8012B' variants={pathVariants} /> <motion.path d='M44.155 1L1 44.1551V58.72L33.588 91.308L44.154 101.874L87.309 58.7191V44.154L44.155 1Z' stroke='#4F000F' variants={pathVariants2} /> <path opacity='0.26' d='M44.158 13.1479L11.397 45.909V56.966L36.136 81.705L44.158 89.726L76.919 56.965V45.908L44.158 13.1479Z' fill='#F60030' stroke='#4F000F' /> <path d='M43.1342 34L35 38.6557V47.8013L43.1342 52.7895L51.1053 47.8013V38.6557L43.1342 34Z' fill='white' /> <path opacity='0.31' d='M35.0815 49.2106L26.9473 53.8662V63.0119L35.0815 68L43.0525 63.0119V53.8662L35.0815 49.2106Z' fill='white' /> <path opacity='0.31' d='M52.0815 49.2106L43.9473 53.8662V63.0119L52.0815 68L60.0525 63.0119V53.8662L52.0815 49.2106Z' fill='white' /> </motion.svg>
    },
  ]