import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading:true,
    products:[],
    productDetail:null,
    cartProducts:[],
    wishlists:[],
    filters:{},
    selectedGames:[],
    customPcProducts:[],
    searchKeyword:null,
    notFound:null,
    cart: 0,
    errorMessage:'',
    page:1,
    coupon:{
        discount: 0,
        status: false,
        _id: null,
        code: null,
        __v: 0
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.TOGGLE_LOAD:
            return {
                ...state,
                loading:true
            }
        case actionTypes.INIT_PREBUILDS:
            return {
                ...state,
                filters:{},
                products:action.prebuilds,
                searchKeyword: null,
                notFound:null,
                loading:false
            } 
        case actionTypes.INIT_LAPTOPS:
            return {
                ...state,
                filters:{},
                products:action.laptops,
                searchKeyword:null,
                notFound:null,
                loading:false
            } 
        case actionTypes.INIT_PCPARTS:
            return {
                ...state,
                filters:{},
                searchKeyword: null,
                products:action.pcParts,
                notFound:null,
                loading:false
            }         
        case actionTypes.SEARCH_PRODUCT:
            return {
                ...state,
                products:action.products,
                searchKeyword: action.searchKeyword,
                filters: {},
                activeNum:1,
                notFound: null,
                loading:false
            } 
        case actionTypes.SET_FILTERS:
            return {
                ...state,
                products:action.products,
                filters:action.filters,
                loading:false
            }
        case actionTypes.PRODUCT_DETAILS:
            return {
                ...state,
                productDetail: action.products,
                loading:false
            }
        case actionTypes.CART_ADDED:    
            const cartProduct = action.cartProducts;
            cartProduct['qty'] = 1;
            return {
                ...state,
                cart:state.cart + 1,
                cartProducts:state.cartProducts.concat(action.cartProducts)    
            }
        case actionTypes.CART_REMOVED:
            const updatedCart = state.cartProducts.filter((cartProduct, index) =>index !== action.id)
            return {
                ...state,
                cart:state.cart - 1,
                cartProducts:updatedCart
            }
        case actionTypes.QUANTITY: 
            state.cartProducts.map((cart) => {
                if(cart._id === action.id){
                    cart.qty = action.qtyNum
                }
            })
            return {
                ...state,
                cartProducts: state.cartProducts
            }
        case actionTypes.CUSTOM_QUANTITY: 
            state.customPcProducts.map((cart, index) => {
                if(index === action.index){
                    cart.qty = action.qtyNum
                }
            })
            return {
                ...state,
                customPcProducts: state.customPcProducts
            }
            case actionTypes.NOT_FOUND: 
                return {
                    ...state,
                    searchKeyword: action.searchKeyword,
                    notFound: 'SORRY THE PRODUCT YOU ARE LOOKING FOR IS UNAVAILABLE'
                }
            case actionTypes.ERROR:
                return {
                    ...state,
                    errorMessage: action.errorMessage
                }
            case actionTypes.EMPTY_SEARCH:
                return {
                    ...state,
                    searchKeyword: ''
                }
            case actionTypes.SELECTED_GAMES:
                return {
                    ...state,
                    selectedGames: action.value 
                }
            case actionTypes.ADD_TO_WISHLIST:
                return {
                    ...state,
                    wishlists: action.value
                }
            case actionTypes.COUPON:
                return {
                    ...state,
                    coupon: action.value
                }
            case actionTypes.REMOVE_COUPON:
                return {
                    ...state,
                    coupon: action.value
                }
            case actionTypes.ADD_CUSTOM_PC:
                return {
                    ...state,
                    cart:state.cart + 1,
                    customPcProducts: state.customPcProducts.concat(action.value)
                }
            case actionTypes.REMOVE_CUSTOM_PC:
                const customData = state.customPcProducts.filter((customPcProduct, index) => index !== action.value)
                return {
                    ...state,
                    cart:state.cart - 1,
                    customPcProducts: customData
                }    
            case actionTypes.PAGE:
                return {
                    ...state,
                    page: action.value
                }   
            case 'EMPTY_DATA':
                return {
                    ...state,
                    cartProducts:[],
                    filters:{},
                    selectedGames:[],
                    customPcProducts:[],
                    cart: 0,
                    page:1,
                    coupon:{
                        discount: 0,
                        status: false,
                        _id: null,
                        code: null,
                        __v: 0
                    }
                }   
        default: return state;
    }
}
export default reducer;