import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { initProducts, initFilterProducts }  from '../../store/actions/storeFront';
import './pagination.css';

function PcPartPagination(props){
    
    const dispatch = useDispatch();
    const searchKeyword = useSelector(state => state.searchKeyword);
    const products = useSelector(state => state.products);
    const filters = useSelector(state => state.filters);
    const pageNum = useSelector(state => state.page)

    if(products.totalPages == 0) {
        return false;
    }
    const handlePage = (e) => {
        dispatch({type:'PAGE', value:e.selected + 1})
        if(Object.keys(filters).length > 0 && searchKeyword === null){
            dispatch(initFilterProducts(filters, props.match.params.id, e.selected + 1))
        } else if(Object.keys(filters).length <= 0 && searchKeyword !== null){
            dispatch(initProducts(e.selected+1, 'pcpartsSearch', searchKeyword,props.match.params.id))
        } else if(Object.keys(filters).length > 0 && searchKeyword !== null){
            dispatch(initFilterProducts(filters, 'pcpartsSearch', e.selected + 1 ,props.match.params.id,searchKeyword))
        } else {
            dispatch(initProducts(e.selected+1, props.match.params.id))
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

export default withRouter(PcPartPagination);


