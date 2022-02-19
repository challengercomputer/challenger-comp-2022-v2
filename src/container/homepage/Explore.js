import React, { Component } from 'react'
import axios from "axios";
import {ScaleLoader} from "react-spinners";
import ProductItem from '../../Components/ProductItem';

export class Explore extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            name: 'prebuild', 
            loading: true,
            products:null
        };
    }

    componentDidMount(){
        this.getProducts(this.state.name);
    }

    ChangeHandle = (e, value) => {
        e.preventDefault();
        this.setState({
            loading: true,
            name: value,
        });
        this.getProducts(value);
    }

    getProducts(category) {
      axios.post(`/product?limit=6&page=1&category=${category}`)
      .then(response => {
        this.setState({
            products: response.data.products,
            loading:false,
        })
      })
    }

    render() {
        const { products, name, loading } = this.state;
        return (
            <section className="explore-area py-100" name="exploreHandle" id="exploreHandle">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <div className="explore__header text-center mb-5">
                                <ul className="list-unstyled explore__nav">
                                    { List.map((item, idx)=> <li key={idx} onClick={(e) => this.ChangeHandle(e, item.payload)} className={name === item.payload ? "active" : null }>{item.payload}s</li>) }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        {loading ? (
                        <div className="py-100 d-flex justify-content-center">
                            <ScaleLoader
                            color={'var(--base-danger)'}
                            size={75}/>
                        </div>)
                        : products.map((item, idx) => (
                        <div key={idx} className="col-lg-4 col-md-6 col-sm-6 mb-50">
                            <ProductItem item={item}/>
                        </div>
                        ))}
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 text-center">
                            <div className="button-area">
                                <a href={`${name}s`} className="btn btn__danger mt-3">
                                    Load More
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        )
    }
}

export default Explore;




const List = [
    {
        id: 1,
        payload: 'prebuild',
    },
    {
        id: 2,
        payload: 'laptop',
    },
]