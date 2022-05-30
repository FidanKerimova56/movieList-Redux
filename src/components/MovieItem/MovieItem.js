import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieList } from "../../redux/actions/actions";
import "./MovieItem.css";

function MovieItem({ Title, Year, Poster, imdbID, disabled }) {
  const dispatch = useDispatch();
  const linkActive = useSelector((state) => state.linkActive);
  const listMovies = useSelector((state) => state.listMovies);
  const [isAdded, SetAdded] = useState(false);
  const handlerBtn = (id) => {
    SetAdded(listMovies.find((item) => item.imdbID === id));
  };

  useEffect(() => {
    handlerBtn(imdbID);
  });

  return (
    <article className="movie-item">
      <img className="movie-item__poster" src={Poster} alt={Title} />
      <div className="movie-item__info">
        <h3 className="movie-item__title">
          {Title}&nbsp;({Year})
        </h3>
        <button
          type="button"
          className="movie-item__add-button"
          onClick={() => {
            handlerBtn(imdbID);
            dispatch(addMovieList(imdbID));
          }}
          disabled={disabled || linkActive}
        >
          {!isAdded ? "Добавить в список" : "Добавлено"}
        </button>
      </div>
    </article>
  );
}

export default MovieItem;
