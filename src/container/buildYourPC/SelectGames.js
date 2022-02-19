import React, {useEffect, useState} from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import {useDispatch, 
  // useSelector
} from 'react-redux';
// import {setSelectedGames} from '../../store/actions/storeFront';
import Image from "react-bootstrap/Image";
import Toolbar from "@material-ui/core/Toolbar";
import { motion } from "framer-motion";
import axios from 'axios';
import {ScaleLoader} from "react-spinners";
import "./buildForm.css";
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

export default function SelectGames(props){

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [counter, setCounter] = useState(0);
  const pageTransition = {
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  useEffect(() => {
    window.scrollTo(0,0)
    axios.get('/game')
    .then(res => {
      // console.log(res.data.games);
      setGames(res.data.games);
      setLoading(false)
    })
  },[])

  const handleImage = (e, game) => {
    let data;
    if(e.target.checked === false){
        setCounter(counter - 1);
        data = selectedGames.filter(games => {
            return games !== game;
        })
        setSelectedGames(data);
    } else {
      setCounter(counter + 1);
      if(selectedGames.length > 1){
        return;
      }
      else {
        data = selectedGames.concat(game);
        setSelectedGames(data);
      }
    }
  }
  // console.log(games.map(item => item.game))
  // console.log(games && games)
  const pageData = {
    title: "Select Games",
    excerpt: `${games.map(item => item.game)}`,
  }

  const handlePickYourBudget = () => {
    props.history.push('/selectbudget')
    return dispatch({type:'SELECTED_GAMES', value:selectedGames})
  }

  if(loading) {
    return (
      <div className="d-flex justify-content-center py-150">
        <ScaleLoader
        color={'var(--base-danger, red)'}
        size={75}/>
      </div>);
  }

  return (
    <React.Fragment>
      <section className="select-games-area pt-100 pb-70 bg-base-dark">
      <Helmet>
        <title>{pageData.title} | {Config.challengers__title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="Pc Build website" />

        <meta property="og:title" content={pageData.title} />
        <meta itemprop="name" content={pageData.title} />
        <meta name="twitter:title" content={pageData.title}/>
        
        <meta property="og:description" content={pageData.excerpt} />
        <meta itemprop="description" content={pageData.excerpt} />
        <meta name="twitter:description" content={pageData.excerpt} />
      </Helmet>

      {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar>
      <Toolbar id='toolbar-mobile-space'></Toolbar> */}
      <Container
        className='form'
        style={{ overflow: "hidden" }}>
        <Row>
          <Col
            lg={9}
            md={9}
            xs={12}
            sm={12}
            style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <h3>What games do you want to play?</h3>
            <h5 style={{ color: "var(--base-danger, #E50926)" }}>Choose any 2 games</h5>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12} style={{marginTop:10}} id='budgetDesktopCol'>
            <div className="text-center text-md-end" onClick={counter === 2 ? handlePickYourBudget : null}>
              <span id={counter === 2 ? 'budgetDesktop' : 'budgetDesktop-disable'}>
                <span></span>
                <span></span>
                <span></span>
                Pick Your Budget
              </span>
            </div>
          </Col>
        </Row>

        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}
          transition={{ duration: 1 }}>
          <Row style={{ marginBottom: "50px" }}>
            {games.map((game, idx )=> {
            return <Col key={idx} xs={4} sm={4} md={3} lg={2} style={{ marginTop: "10px" }}>
              <input onChange={(e) => handleImage(e, game)} type='checkbox' id={game._id}/>
              <label 
                  className="select-item-label"
                htmlFor={game._id}>
                <figure>
                  <Image
                    src={game.gameImage.s3URL}
                    // alt=""
                    id='gamesSelect'
                  />
                </figure>
              </label>
            </Col>})}
          </Row>
        </motion.div>
      </Container>
      {/* Mobile View Filer Button & Modal Popup */}
      <Button
        onClick={counter === 2 ? handlePickYourBudget : null}
        className='fixed-bottom'
        id={counter === 2 ? 'filterButtonMobile' : 'filterButtonMobile-opacity'}
        size='lg'
        block
        style={{ borderRadius: 0, position: "fixed" }}>
        Next
      </Button>
      </section>
    </React.Fragment>
  );
};
