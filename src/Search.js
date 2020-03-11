import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }

    handleOnChange(e) {
        this.setState({ query: e.target.value });
    }

    render() {
        return <div className="input-group info">
            <input type="text" onChange={this.handleOnChange.bind(this)} className="form-control" placeholder="Enter film name here"></input>
            <div className="input-group-append">
                <Link to={"/dashboard/" + this.state.query} class="btn btn-outline-secondary" type="button">GO</Link>
            </div>
        </div>
    }
}