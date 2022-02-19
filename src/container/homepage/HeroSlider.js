import React, { Component } from 'react'
import pcmodel from '../../assets/pc_3d.gif';
import { Link as DivLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export class HeroSlider extends Component {
    render() {
        return (
            <section className="HeroSlider vh-xl-100 py-5">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-8">
                            <div className="HeroSlider__banner text-center">
                                <img src={pcmodel} alt="Pc Build Model" />
                            </div>
                        </div>
                        <div className="col-lg-4 order-lg-first">
                            <div className="HeroSlider__content text-center text-lg-start">
                                <h1 className="HeroSlider__title mb-3">
                                    Design &amp; Build <br /> your own PC
                                </h1>
                                <p> We are everything from building <br className="d-none d-md-block" /> gaming PCs to buying laptops.</p>
                                <DivLink id='budgetDesktop' to="explore" spy={true} smooth={true} offset={50} duration={500} className="btn mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Explore
                                </DivLink>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        )
    }
}

export default HeroSlider
