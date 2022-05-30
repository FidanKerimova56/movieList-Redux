import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostMovies } from "../../redux/actions/actions";
import "./ListPage.css";

class ListPage extends Component {
  state = {
    title: "",
  };
  componentDidMount() {
    const id = this.props.match.params;
    axios
      .get(`https://acb-api.algoritmika.org/api/movies/list/${id.id}`)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ title: data.title });
        data.movies.forEach((item) => {
          this.props.getPostMovies(item);
        });
      });
  }
  render() {
    const { movies } = this.props;
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {movies.map((item) => {
            return (
              <li key={item.imdbID}>
                <a
                  href={"https://www.imdb.com/title/" + item.imdbID}
                  className="link___block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.Title} ({item.Year})
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  movies: state.postMovies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPostMovies: (imdbID) => {
      dispatch(getPostMovies(imdbID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);