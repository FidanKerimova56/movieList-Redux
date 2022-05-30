import {
  ADD_MOVIE_TO_LIST,
  ADD_MOVIES,
  REMOVE_MOVIE_FROM_LIST,
  SET_LINKACTIVE,
  ADD_POST_MOVIES,
} from "./actions-type";
import axios from "axios";
import { baseUrl, apiKey } from "../constants";

export const addMovieList = (payload) => ({
  type: ADD_MOVIE_TO_LIST,
  payload,
});

export const addMovies = (payload) => ({
  type: ADD_MOVIES,
  payload,
});

export const removeMovies = (payload) => ({
  type: REMOVE_MOVIE_FROM_LIST,
  payload,
});

export const setLinkActive = (payload) => ({
  type: SET_LINKACTIVE,
  payload,
});

export const addPostMovies = (payload) => ({
  type: ADD_POST_MOVIES,
  payload,
});

export const getApi = async (searchLine) => {
  const res = await axios.get(baseUrl + `?s=${searchLine}&apikey=${apiKey}`);
  const data = res.data.Search;
  if (!data && !res) {
    throw console.log("Error");
  }
  return data;
};

export const remoteData = (searchLine) => {
  return function (dispatch) {
    getApi(searchLine)
      .then((res) => dispatch(addMovies(res)))
      .catch((err) => {
        dispatch(addMovies([]));
        return err;
      });
  };
};

export const getPostMovies = (imdbID) => {
  return (dispatch) => {
    axios
      .get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch(addPostMovies(data));
      })
      .catch((err) => {
        dispatch(addPostMovies([]));
        return err;
      });
  };
};
