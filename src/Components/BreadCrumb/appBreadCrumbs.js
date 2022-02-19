import React from "react";
import {connect} from "react-redux";
import axios from 'axios';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import '../../App.css';


class AppBreadcrumbs extends React.Component {

  state = {
    productTitle:null
  }
  componentDidMount(){
    if(this.props.payload !== undefined){
      axios.get('/product/' + this.props.payload)
    .then(res => this.setState({productTitle: res.data.product.productName.toUpperCase()}))
    }
  }
   render() {
    const routesList = {
      '/': 'Home',
      '/productdetails': null,
      '/productdetails/:id': this.state.productTitle,
      '/Prebuilds/:id': this.state.productTitle,
      '/laptops/:id': this.state.productTitle,
      '/search/:id': this.state.productTitle,
      '/pcparts':null,
      '/pcparts/:id/:id':this.state.productTitle,
    }
    
    const { history } = this.props;
     return (
       <Router>
          <Breadcrumbs  mappedRoutes={routesList}
           WrapperComponent={(props) =>{
             return (<ol style={{textTransform:'capitalize'}} className="breadcrumb">{props.children}</ol>)}}
           ActiveLinkComponent={(props) =>
             <li style={{color:'var(--base-danger, #e50926)', textTransform:'capitalize'}} className="breadcrumb-item active" >{props.children}</li>}
           LinkComponent={(props) =>{
             return( 
              <li 
              style={{color:'grey', textTransform:'capitalize'}} 
              onClick={props.children.props.to === '/search' ? ()=> history.push('/searchresults') : ()=> history.push(props.children.props.to)} 
              className="breadcrumb-item">{props.children}</li>
             )
            }
          }/>
      </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    productDetail: state.productDetail,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(withRouter(AppBreadcrumbs));