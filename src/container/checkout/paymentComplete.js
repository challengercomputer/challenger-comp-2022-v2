import React, { Component } from 'react';
import orderPlaced from '../../assets/order.gif';

export default class PaymentComplete extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }
    
    render(){
        return (
            <div>
                <div style={{ textAlign:'center', marginTop:125}}><img src={orderPlaced} style={{height:200, borderRadius:100,}} alt="correct"/></div>
                {this.props.location.params ?
                    <p style={{textAlign:'center', fontSize:30}}>Your order is on hold! <br/>Once you've made the payment, please do contact on +91 90870 11234 and confirm your order.</p> :
                    <p style={{padding: '0px 250px', textAlign:'center', fontSize:30}}>Your order has been placed !<br/>Please check your mail for order details</p> }
            </div>
        )
    }
}

