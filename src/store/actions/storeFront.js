import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setInitPrebuilds = (products) => {
  return {
    type: actionTypes.INIT_PREBUILDS,
    prebuilds: products
  }
}

export const setInitLaptops = (products) => {
  return {
    type: actionTypes.INIT_LAPTOPS,
    laptops: products
  }
}

export const setPcParts = (products) => {
  return {
    type: actionTypes.INIT_PCPARTS,
    pcParts: products
  }
}

export const setSearchProduct = (products, searchKeyword) => {
  return {
    type:actionTypes.SEARCH_PRODUCT,
    products:products,
    searchKeyword: searchKeyword
  }
}

export const setFilterProducts = (products, filters) => {
  return {
    type:actionTypes.SET_FILTERS,
    products:products,
    filters:filters
  }
}

export const setProductDetails = (products) => {
  return {
    type: actionTypes.PRODUCT_DETAILS,
    products: products
  }
}

export const setCartAdded  = (products) => {
  return {
    type:actionTypes.CART_ADDED,
    cartProducts:products
  }
}

export const setCartRemoved  = (id) => {
  return {
    type:actionTypes.CART_REMOVED,
    id:id
  }
}


export const setQuantity = (value, id) => {
  return {
    type : actionTypes.QUANTITY,
    qtyNum: value,
    id: id
  } 
}

export const setCustomQuantity = (value, index) => {
  return {
    type : actionTypes.CUSTOM_QUANTITY,
    qtyNum: value,
    index: index
  } 
}

export const setEmptySearch = () => {
  return {
    type: actionTypes.EMPTY_SEARCH,
    value: null
  }
}

export const setSelectedGames = (games) => {
  return {
    type: actionTypes.SELECTED_GAMES,
    value: games
  }
}

export const setAddWishlist = (product) => {
  return {
    type: actionTypes.ADD_TO_WISHLIST,
    value: product
  }
}

export const setRemoveWishlist = (product) => {
  return {
    type: actionTypes.REMOVE_TO_WISHLIST,
    value: product
  }
}

export const setReduxCoupon = (coupon) => {
  return {
    type: actionTypes.COUPON,
    value: coupon
  }
}

export const reduxRemoveCoupon = (coupon) => {
  return {
    type: actionTypes.REMOVE_COUPON,
    value: coupon
  }
}

export const addCustomPc = (product) => {
  return {
    type: actionTypes.ADD_CUSTOM_PC,
    value: product
  }
}

export const removeCustomPc = (id) => {
  return {
    type: actionTypes.REMOVE_CUSTOM_PC,
    value: id
  }
}
// Api calls
export const initProducts = (page, category, data, pcpartSearch) => {
  window.scrollTo(0, 0)
  return dispatch => {
      dispatch({type: actionTypes.TOGGLE_LOAD});
      if(category === 'prebuild'){
        return axios.post(`/product?limit=9&page=${page}&category=prebuild`)
        .then(response => {
          dispatch(setInitPrebuilds(response.data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      }
      else if(category === 'laptop'){
        return axios.post(`/product?limit=9&page=${page}&category=laptop`)
        .then(response => {
          dispatch(setInitLaptops(response.data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      } 
      else if(category === 'search'){
        return axios.post(`/product?limit=9&page=${page}&search=${data}`)
        .then(response => {
          if(response.data.products.length >= 1){
            dispatch(setSearchProduct(response.data, data ))
          } else {
            dispatch({type: actionTypes.NOT_FOUND, searchKeyword:data})
          }   
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      } 
      else if(category === 'prebuildSearch'){
        return axios.post(`/product?limit=9&page=${page}&category=prebuild&search=${data}`)
        .then(response => {
          if(response.data.products.length >= 1){
            dispatch(setSearchProduct(response.data, data ))
          } else {
            dispatch({type: actionTypes.NOT_FOUND, searchKeyword:data})
          }   
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      }
      else if(category === 'laptopSearch'){
        return axios.post(`/product?limit=9&page=${page}&category=laptop&search=${data}`)
        .then(response => {
          if(response.data.products.length >= 1){
            dispatch(setSearchProduct(response.data, data ))
          } else {
            dispatch({type: actionTypes.NOT_FOUND, searchKeyword:data})
          }   
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      } 
      
      else if(category === 'pcpartsSearch'){
        return axios.post(`/product?limit=9&page=${page}&category=${pcpartSearch}&search=${data}`)
        .then(response => {
          if(response.data.products.length >= 1){
            dispatch(setSearchProduct(response.data, data ))
          } else {
            dispatch({type: actionTypes.NOT_FOUND, searchKeyword:data})
          }   
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      }
      else{
        return axios.post(`/product?limit=9&page=${page}&category=${category}`)
        .then(response => {
          dispatch(setPcParts(response.data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      }  
  }
}

// condition changed from if to else if
export const initFilterProducts = (data, category, page, categorySearch, extraSearchKeyword) => {
  window.scrollTo(0, 0)
  return dispatch => {
      dispatch({type: actionTypes.TOGGLE_LOAD});
      if(category === 'prebuild'){
        if(data.subcategory.length > 0){
          return axios.post(`/product?limit=9&page=${page}&category=prebuild&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`,  {"subcategory" : [data.subcategory]})
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        } 
        else {
          return axios.post(`/product?limit=9&page=${page}&category=prebuild&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`)
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        }
      }
      if(category === 'prebuildSearch'){
        if(data.subcategory.length > 0){
          return axios.post(`/product?limit=9&page=${page}&category=prebuild&search=${categorySearch}&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`,  {"subcategory" : [data.subcategory]})
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        } 
        else {
          return axios.post(`/product?limit=9&page=${page}&category=prebuild&search=${categorySearch}&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`)
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        }
      }
      if(category === 'laptopSearch'){
        if(data.subcategory.length > 0){
          return axios.post(`/product?limit=9&page=${page}&category=laptop&search=${categorySearch}&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`,  {"subcategory" : [data.subcategory]})
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        } 
        else {
          return axios.post(`/product?limit=9&page=${page}&category=laptop&search=${categorySearch}&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`)
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        }
      }
      // data, category, page, categorySearch, extraSearchKeyword
      if(category === 'pcpartsSearch'){
        if(data.subcategory.length > 0){
          return axios.post(`/product?limit=9&page=${page}&category=${categorySearch}&search=${extraSearchKeyword}&sortBy=finalPrice&sort=1`,  {"subcategory" : [data.subcategory]})
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        } 
        else {
          return axios.post(`/product?limit=9&page=${page}&category=${categorySearch}&search=${extraSearchKeyword}&sortBy=finalPrice&sort=1`)
          .then(response => {
            dispatch(setFilterProducts(response.data, data))
          })
          .catch(e => {
            dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
          })
        }
      }
      else if(category === 'laptop'){
        if(data.subcategory.length > 0){
        axios.post(`/product?limit=9&page=${page}&category=laptop&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`,  {"subcategory" : [data.subcategory]})
        .then(response => {
          dispatch(setFilterProducts(response.data, data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
        } else {
          axios.post(`/product?limit=9&page=${page}&category=laptop&minPrice=${data.min}&maxPrice=${data.max}&sortBy=finalPrice&sort=1`)
        .then(response => {
          dispatch(setFilterProducts(response.data, data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
        }
      }
      else if(category === 'search'){
        axios.post(`/product?limit=9&page=${page}&search=${data.keyword}&sortBy=finalPrice&sort=${data.sort}`)
        .then(response => {
          dispatch(setFilterProducts(response.data, data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
      }
      else{
        if(data.subcategory.length > 0){        
        axios.post(`/product?limit=9&page=${page}&category=${category}&sortBy=finalPrice&sort=${data.sort}`, {"subcategory" : [data.subcategory]})
        .then(response => {
          dispatch(setFilterProducts(response.data, data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
        } else{
          axios.post(`/product?limit=9&page=${page}&category=${category}&sortBy=finalPrice&sort=${data.sort}`)
        .then(response => {
          dispatch(setFilterProducts(response.data, data))
        })
        .catch(e => {
          dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
        })
        }
      }
  }
}

export const productDetails = (id) => {
  return dispatch => {
    dispatch({type: actionTypes.TOGGLE_LOAD})
    axios.get('/prebuild/' + id)
    .then(response => {
      dispatch(setProductDetails(response.data));
    })
  }
}


export const searchProduct  = (page, searchKeyword) => {  
  return dispatch => {
    dispatch({type: actionTypes.TOGGLE_LOAD});
    axios.post(`/product?limit=9&page=${page}&search=${searchKeyword}`)
    .then(response => {
      if(response.data.products.length >= 1){
        dispatch(setSearchProduct(response.data, searchKeyword ))
      } else {
        dispatch({type: actionTypes.NOT_FOUND, searchKeyword:searchKeyword})
      }   
    })
    .catch(e => {
      dispatch({type: actionTypes.ERROR, errorMessage: 'Something went wrong'})
    })
  }
}

export const cartAdded = (id) => {
  return dispatch => {
      axios.get(`/product/${id}`)
      .then(response => {
        dispatch(setCartAdded(response.data.product))
    })
  }
}

export const cartRemoved = (id) => {
  return dispatch => {
    dispatch(setCartRemoved(id));
  }
}

export const addWishlist = () => {
  return dispatch => {
    axios.get('/prebuild?limit=6&page=1')
    .then(response => {
      dispatch(setAddWishlist(response.data))
    })
  }
}

export const removeWishlist = () => {
  return dispatch => {
    axios.get('/prebuild?limit=6&page=1')
    .then(response => {
      dispatch(setRemoveWishlist(response.data))
    })
  }
}
