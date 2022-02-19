import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { initProducts, initFilterProducts }  from '../../store/actions/storeFront';
import './pagination.css';

export default function SearchPagination(){
    
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const filters = useSelector(state => state.filters);
    const searchKeyword = useSelector(state => state.searchKeyword);
    const pageNum = useSelector(state => state.page)

    if(products.totalPages == 0) {
        return false;
    }
    const handlePage = (e) => {
        dispatch({type:'PAGE', value:e.selected + 1})
        dispatch(Object.keys(filters).length > 0 ? initFilterProducts(filters, 'search', e.selected + 1) : initProducts(e.selected+1, 'search', searchKeyword))
    }
    return( 
        <div className="pagination-center">
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    forcePage={pageNum - 1}
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


