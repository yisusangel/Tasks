import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Pager extends Component {
    constructor(props) {
        super(props);
        const { totalPages, currentPage, loading, maxVisible, updatePage } = this.props;
        this.state = {
            totalPages: totalPages || 1,
            currentPage: currentPage || 1,
            maxVisible: maxVisible || 7,
            loading: loading || false,
            updatePage
        };
        require('./Pager.css');
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            totalPages: nextProps.totalPages,
            currentPage: nextProps.currentPage,
        })
    }

    pagination(currentPage){
        const { totalPages, maxVisible } = this.state;
        let visible = parseInt(maxVisible/2, 10);
        let minPage = (currentPage - visible >= 1) ? (currentPage-visible) : 1;
        let maxPage = (currentPage + visible >= totalPages) ? totalPages : (currentPage+visible);
        let showPages = maxPage+1 - minPage;
        let array = Array.from(new Array(showPages),(val,index)=>index+minPage);
        return array.map((i) => {
            return (
                <li className={"page-item " + ((currentPage === i) ? "active" : "")} key={i}>
                    <span className="page-link" onClick={() => this.state.updatePage(i)}><span aria-hidden="true">{i}</span></span>
                </li>
            )
        })
    }

    render() {
        const { currentPage, totalPages, loading } = this.state;
        return (
            <nav aria-label="Page navigation" className={(loading ? "loading" : "")}>
                <ul className="pagination">
                    <li className={"page-item " + ((currentPage === 1) ? "disabled" : "")}>
                        <span className="page-link" onClick={() => this.state.updatePage(1)}><span aria-hidden="true"><FontAwesomeIcon icon="angle-double-left"/></span></span>
                    </li>
                    <li className={"page-item " + ((currentPage === 1) ? "disabled" : "")}>
                        <span className="page-link" onClick={() => this.state.updatePage(currentPage-1)}><span aria-hidden="true"><FontAwesomeIcon icon="angle-left"/></span></span>
                    </li>
                    {this.pagination(currentPage)}
                    <li className={"page-item " + ((currentPage === totalPages) ? "disabled" : "")} >
                        <span className="page-link" onClick={() => this.state.updatePage(currentPage+1)}><span aria-hidden="true"><FontAwesomeIcon icon="angle-right"/></span></span>
                    </li>
                    <li className={"page-item " + ((currentPage === totalPages) ? "disabled" : "")} >
                        <span className="page-link" onClick={() => this.state.updatePage(totalPages)}><span aria-hidden="true"><FontAwesomeIcon icon="angle-double-right"/></span></span>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pager;