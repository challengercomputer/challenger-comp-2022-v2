import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/storeFront';

//React Router
import { BrowserRouter as Router, Switch, Route, 
  // Redirect
} from "react-router-dom";

//Importing Components & Containers
import AppBarMobile from "./Components/AppBar/appBar";
import ProductDetail from "./container/productDetail/ProductDetail";
import HomePage from "./container/homepage/homepage";
import { AnimatePresence } from "framer-motion";
import Footer from "./Components/Footer/footer";
import PrivateRoute from "./container/authentication/PrivateRoute";

//Pages
import Prebuild from "./container/prebuild/prebuild";
import Laptops from "./container/laptops/laptops";
import SearchResults from "./container/searchResults/searchResults";
import PcParts from "./container/pcParts/pcParts";
import MyList from "./container/myList/mylist";
import customizeYourself from "./container/customizeYourself/customizeYourself";
import SelectGames from "./container/buildYourPC/SelectGames";
import SelectBudget from "./container/buildYourPC/SelectBudget";
import PCPredicted from "./container/buildYourPC/PCPredicted"; 
import YourCart from "./container/YourCart/YourCart";
import Checkout from "./container/checkout/checkout";
import Notfound from "./container/errorpage/errorpage";
import PaymentComplete from "./container/checkout/paymentComplete";
import PrivacyPolicy from "./container/extraDocs/privacyPolicy";
import shippingPolicy from "./container/extraDocs/shippingPolicy";
import About from "./container/extraDocs/about";
// import FloatingIcon from "./Components/FloatingIcon";
//axios
import axios from "axios";
import MyOrders from "./container/myOrders/myOrders";
import './sass/main.scss';

import { StylesProvider, createGenerateClassName  } from '@material-ui/core/styles';
import MyProfile from "./container/myProfile/myProfile";
axios.defaults.baseURL = 'https://challengerbuildyourpc.com/api/v1/client';

// axios.interceptors.request.use(
//   response => {
//     console.log(response)
//   },
//   error => {
//     if(error.response.status === 401){
//       alert('login expired!')
//       return <Redirect to='/'/>
//     }
//   }
// )
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  }
  catch(e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(() => saveToLocalStorage(store.getState()))

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <AnimatePresence exitBeforeEnter>
        <StylesProvider generateClassName={generateClassName}>
          <AppBarMobile/>
            <Switch> 
              <Route path='/' exact component={HomePage}/>
              <PrivateRoute path='/myprofile' component={MyProfile}/>
              <PrivateRoute path='/mylist' component={MyList}/>
              <PrivateRoute path='/myorders' component={MyOrders}/>
              <Route path='/searchresults' component={SearchResults}/>
              <Route exact path='/pcparts/:id' component={PcParts}/> 
              <Route path='/suggestme' component={SelectGames}/>
              <Route path='/selectbudget' component={SelectBudget}/>
              <Route path='/predictedpc/:value' component={PCPredicted}/>
              <Route path='/customizeyourself' component={customizeYourself}/>
              <Route exact path='/:nestedUrl/:id' component={ProductDetail}/>
              <Route path='/:base/:nestedUrl/:id' component={ProductDetail}/>
              <Route path='/Prebuilds' component={Prebuild}/>
              <Route path='/laptops' component={Laptops}/>
              <Route exact path='/YourCart' component={YourCart}/>
              <Route path='/Checkout' component={Checkout}/>
              <Route path='/paymentComplete' component={PaymentComplete}/>
              <Route path='/privacypolicy' component={PrivacyPolicy}/> 
              <Route path='/shippingpolicy' component={shippingPolicy}/>
              <Route path='/about' component={About}/>
              <Route component={Notfound}/>
            </Switch>
            <Footer/>
            </StylesProvider>
            {/* <FloatingIcon/> */}
          </AnimatePresence>
        </Switch>
      </Router>
    </Provider>
  );
}


