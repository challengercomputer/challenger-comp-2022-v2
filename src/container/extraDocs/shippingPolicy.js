import React, {useEffect} from 'react';
import {Container, Row, Col, Card, Tab, Tabs, TabContent, Table, Badge} from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

export default function ShippingPolicy(){

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const pageData={
        title: "Shipping Policy",
        excerpt: "All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.",
    }

    return (      
        <section className="shipping pt-100 pb-70">
        <Helmet>
            <title>{pageData.title} | {Config.challengers__title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content={Config.challengers__websiteType} />

            <meta property="og:title" content={pageData.title} />
            <meta itemprop="name" content={pageData.title} />
            <meta name="twitter:title" content={pageData.title}/>

            <meta property="og:description" content={pageData.excerpt} />
            <meta itemprop="description" content={pageData.excerpt} />
            <meta name="twitter:description" content={pageData.excerpt} />
        </Helmet>
        
        <Container>
        {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar>
        <Toolbar id='toolbar-mobile-space'></Toolbar> */}
        <div style={{color:'white'}}>
        <h1>Shipping Policy</h1>
            <p>Thank you for visiting and shopping at https://www.challengerbuildyourpc.com/. Following are the
            terms and conditions that constitute our Shipping Policy.</p>
            <h3>Domestic Shipping Policy</h3>
            <h5>Shipment processing time</h5>
            <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
            <b>Shipping rates & delivery estimates</b>
            <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
            <Table striped bordered hover>
                <thead>
                    <tr style={{color:'white'}}>
                        <th>Shipment method</th>
                        <th>Estimated delivery time</th>
                        <th>Shipment cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{color:'white'}}>
                        <td>Standard</td>
                        <td>3-5 business days</td>
                        <td>Standard charge</td>
                    </tr>
                </tbody>
                </Table>
            <p>Delivery delays can occasionally occur.</p>
            <b>Shipment & Order confirmation</b>
            <p>You will receive an Order Confirmation email once your order has been confirmed or delivered containing your order number(s). </p>
            <b>Customs, Duties and Taxes</b>
            <p>
            https://www.challengerbuildyourpc.com/ is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
            <b>Damages</b>
            <p> https://www.challengerbuildyourpc.com/ is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
            <p>Please save all packaging materials and damaged goods before filing a claim.</p>
            <b>International Shipping Policy</b>
            <p>We currently do not ship outside India.</p>
            <b>Returns Policy</b>
            <p> Our Return &amp; Refund Policy provides detailed information about options and procedures for returning your order.</p>
        </div>
        </Container>
        </section>   )
}