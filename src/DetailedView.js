import React from 'react';

export default class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    getFilmSummary(){
        return {__html:this.state.film.summary};
    }

    componentDidMount() {
        console.log(this.props);
        fetch("http://api.tvmaze.com/singlesearch/shows?q=" + this.props.match.params.query)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        film: result
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
        let { error, isLoaded, film } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div class="large card">
                    {film.image ? <img class="card-img" src={film.image.original} alt="" /> : null}
                    <div class="card-body">
                        <h5 class="card-title">{film.name}</h5>
                        { film.genres ? <p class="card-text">{film.genres.map((genre, j) => (<span key={j}>{genre} </span>))}</p> : null}
                        <p class="card-text"><small class="text-muted" dangerouslySetInnerHTML={this.getFilmSummary()}></small></p>
                    </div>
                </div>
            );
        }
    }
}