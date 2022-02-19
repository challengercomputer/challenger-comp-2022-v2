import React, { 
    // Component 
} from 'react';
import WishList from './wishlists';
import Builds from './builds';
// import {Toolbar, Badge} from "@material-ui/core";
import { Container, Tabs, Tab, TabContent } from 'react-bootstrap';
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";


export default function MyList(){
        return (
            <section className="mylist-area pt-150 pb-70">
                <Helmet>
                <title>{pageData.title} | {Config.challengers__title}</title>
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
                <Container>
                    {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
                    <Toolbar id='toolbar-mobile-space'></Toolbar>
                    <Toolbar id='toolbar-mobile-space'></Toolbar> */}
                    <Tabs defaultActiveKey='home' id='uncontrolled-tab-example' style={{ marginBottom: "56px", border: "1px solid #CDCDCD", borderRadius: "0px", }}>
                        <Tab eventKey='home' title='WISHLISTS' >
                            <TabContent style={{ marginTop: "24px", color: "white" }}>
                                <Container>
                                    <WishList/>
                                </Container>
                            </TabContent>
                        </Tab>
                        <Tab eventKey='profile' title='BUILDS'>
                        <TabContent>
                            <Container>
                                <Builds/>
                            </Container>
                        </TabContent>
                        </Tab>
                    </Tabs>
            </Container>
          </section>
        )
    }

const pageData = {
    title: "My List",
    excerpt: 'Best Pc Build List with Wishlists and Pc Builds'
}