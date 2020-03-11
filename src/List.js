import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://api.tvmaze.com/search/shows?q=" + this.props.match.params.query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    let { error, isLoaded, items } = this.state;
    let filmslist = items.map((item, i) => (
      <li key={i}>
        <div className="small card">
          {item.show.image ? <img className="card-img-top" src={item.show.image.medium} alt="" /> : null}
          <div className="card-body">
            <h5 className="card-title">{item.show.name}</h5>
            <p className="card-text">{item.show.genres.map((genre, j) => (<span key={j}>{genre}{item.show.genres[j + 1] ? ', ' : null} </span>))}</p>
            {item.show.rating.average ? <p className="card-text">Rating: {item.show.rating.average}</p> : null}
            <Link to={"/film/" + item.show.name} className="btn btn-primary card-button">See more</Link>
          </div>
        </div>
      </li>
    ));
    if (error) {
      return <div className="info">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="info">Loading...</div>;
    } else if (items.length <= 1) {
      return (<div className="info"> Nothing matched your query. Please try again. </div>);
    } else {
      return (
        <ul className="cards-container">
          {filmslist}
        </ul>
      );
    }
  }
}