import React, { Component } from 'react'
import WhatsBG from './whatsection.gif';

export class Features extends Component {
    render() {
        return (
            <section className="features-area py-100" style={{backgroundImage: `url(${WhatsBG})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="features-content text-center text-lg-start">
                                <h1 className="fs-4xl">Tell Us The Games You Play <span className="font-weight-light">And We'll Suggest You A PC</span></h1>
                                <a href='/suggestme' id="budgetDesktop" className="btn mt-3">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Suggest Me
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Features
