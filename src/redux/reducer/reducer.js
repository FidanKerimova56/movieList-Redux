import {
  ADD_MOVIE_TO_LIST,
  REMOVE_MOVIE_FROM_LIST,
  ADD_MOVIES,
  SET_LINKACTIVE,
  ADD_POST_MOVIES,
} from "../actions/actions-type";

const initialState = {
  linkActive: false,
  movies: [],
  listMovies: [],
  postMovies: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MOVIE_TO_LIST:
      const movie = state.movies.find((item) => item.imdbID === payload);
      return { ...state, listMovies: [...state.listMovies, movie] };

    case REMOVE_MOVIE_FROM_LIST:
      const newListMovies = state.listMovies.filter(
        (item) => item.imdbID !== payload
      );
      return { ...state, listMovies: newListMovies };

    case ADD_MOVIES:
      return { ...state, movies: payload };

    case SET_LINKACTIVE:
      return { ...state, linkActive: payload };

    case ADD_POST_MOVIES:
      return { ...state, postMovies: [...state.postMovies, { ...payload }] };

    default:
      return state;
  }
};

export default reducer;
