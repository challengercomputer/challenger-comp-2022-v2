import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as actionTypes from '../../store/actions/actionTypes';
import { initProducts, initFilterProducts }  from '../../store/actions/storeFront';
import './pagination.css';

export default function PrebuildPagination(){
    
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const searchKeyword = useSelector(state => state.searchKeyword);
    const filters = useSelector(state => state.filters);
    const pageNum = useSelector(state => state.page)
    if(products.totalPages == 0) {
        return false;
    }
    const handlePage = (e) => {
        dispatch({type:actionTypes.PAGE, value:e.selected + 1});
        if(Object.keys(filters).length > 0 && searchKeyword === null){
            dispatch(initFilterProducts(filters, 'prebuild', e.selected + 1))
        } else if(Object.keys(filters).length <= 0 && searchKeyword !== null){
            dispatch(initProducts(e.selected+1, 'prebuildSearch', searchKeyword))
        } else if(Object.keys(filters).length > 0 && searchKeyword !== null){
            dispatch(initFilterProducts(filters, 'prebuildSearch', e.selected + 1, searchKeyword))
        } else {
            dispatch(initProducts(e.selected+1, 'prebuild'))
        }
    }
    return( 
        <div className="pagination-center">
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    forcePage={pageNum - 1}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageClassName="page-number"
                    pageCount={products.totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={(e)=>handlePage(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            <div className="d-flex justify-content-center">
                <p style={{marginTop:15}}>PAGE {pageNum} OF {products.totalPages}</p>
            </div>
        </div>
    );
}


