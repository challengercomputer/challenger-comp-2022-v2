import React, {useEffect} from 'react';
import './extra.css';
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

export default function About(){

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (      
        <section className="about-area pt-130 pb-70 bg-base-dark">
            <Helmet>
            <title>{pageData.title} | {Config.challengers__sub}</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="Pc Build website" />

            <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
            <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

            <meta property="og:description" content={pageData.excerpt} />
            <meta itemprop="description" content={pageData.excerpt} />
            <meta name="twitter:description" content={pageData.excerpt} />

            </Helmet>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <h1 className="fs-4xl mb-3">{pageData.title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="about-area__content">
                            {pageData.content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const pageData = {
    title: "About Us",
    content: <React.Fragment><p>We Challenger Computer started in the day of valentine in feb 14 1997. we have been serving you with pleasure for past 24 years we treat every customer the same. All our valuable customers are schools colleges leading corporates small and medium enterprisers. Customers satisfaction serves as our foremost priority. <strong className="fs-md text-base-inverted"> In past 5 years we have been praised for our build such as gaming pc youtubers rendering pc solutions for graphical work editors architect 3d toys designers studio designers.</strong> </p> <p>We strive hard for putting up a happy face in each and every customer who visit our store we are experts in all kind of pc building and software problem we achieved this milestone with our experienced technicians who traveled with us throughout our journey our technicians are with an experience of minimum 20 years in this field we have been working hard from the day one in serving our customers at the doorstep with 3 branches in every corner of the city.</p><strong className="fs-md text-base-inverted">Now we begin our new journey for bringing as many as we could fit in our backpack and heading home ready to turn your dream into reality!</strong></React.Fragment>,
    excerpt: 'We Challenger Computer started in the day of valentine in feb 14 1997. we have been serving you with pleasure for past 24 years we treat every customer the same. All our valuable customers are schools colleges leading corporates small and medium enterprisers. Customers satisfaction serves as our foremost priority. <strong> In past 5 years we have been praised for our build such as gaming pc youtubers rendering pc solutions for graphical work editors architect 3d toys designers studio designers.</strong> </p> <p>We strive hard for putting up a happy face in each and every customer who visit our store we are experts in all kind of pc building and software problem we achieved this milestone with our experienced technicians who traveled with us throughout our journey our technicians are with an experience of minimum 20 years in this field we have been working hard from the day one in serving our customers at the doorstep with 3 branches in every corner of the city.</p><strong>Now we begin our new journey for bringing as many as we could fit in our backpack and heading home ready to turn your dream into reality!'
}