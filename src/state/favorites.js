
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

// export const addToFavorites = createAsyncThunk("ADD_TO_FAVORITES",(movie, thunkAPI) => {
//     const { users } = thunkAPI.getState();
    
//     if (!users.id) throw new Error("You need to be logged in");
//     return axios
//       .put(`/api/movies/addFavorite?userId=${users.id}&code=${movie.id}&title=${movie.title}&poster_path=${movie.poster_path}&vote_average=${movie.vote_average}&genres=${movie.genres.map(genre => genre["name"])}`,{code: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average, genre: movie.genres.map(genre => genre["name"])})
//       .then((res) => res.data);
//   }
// );

export const addToFavorites = createAsyncThunk("ADD_TO_FAVORITES",(movie, thunkAPI) => {
  const { users } = thunkAPI.getState();
  
  if (!users.id) throw new Error("You need to be logged in");
  return axios
    .put(`/api/movies/addFavorite?userId=${users.id}&code=${movie.id}&title=${movie.title}&poster_path=${movie.poster_path}&vote_average=${movie.vote_average}&release_date=${movie.release_date}`,{code: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date})
    .then((res) => res.data);
}
);

export const removeFromFavorites = createAsyncThunk("REMOVE_FAVORITE",(movie, thunkAPI) => {
  const { users } = thunkAPI.getState();
  if (!users.id) throw new Error("You need to be logged in");
  return axios
    .delete(`/api/movies/removeFavorite?userId=${users.id}&code=${movie.id}`)
    .then((res) => res.data);
}
);

export const Favorites = createAsyncThunk("FAVORITES",(setMovies, thunkAPI) => {
  const { users } = thunkAPI.getState();
  if (!users.id) throw new Error("You need to be logged in");
  axios
    .get(`/api/movies/favorites?userId=${users.id}`)
    .then((res) => {
      setMovies(res.data)
    });
}
);

export const UserFavorites = createAsyncThunk("USER_FAVORITES",({id, setMovies}) => {
  return axios
    .get(`/api/movies/favorites?userId=${id}`)
    .then((res) => setMovies(res.data));
}
);

export const FavoritesRow = createAsyncThunk("FAVORITES_ROW",(setFavorites, thunkAPI) => {
  const { users } = thunkAPI.getState();
  if (!users.id) throw new Error("You need to be logged in");
  return axios
    .get(`/api/movies/favorites?userId=${users.id}`)
    .then((res) => setFavorites(res.data));
}
);

const favoritesReducer = createReducer(
    {},
    {
        [addToFavorites.fulfilled]: (state,action) => action.payload,
        [removeFromFavorites.fulfilled]: (state,action) => action.payload,
        [Favorites.fulfilled]: (state,action) => action.payload,
        [UserFavorites.fulfilled]: (state,action) => action.payload,
        [FavoritesRow.fulfilled]: (state,action) => action.payload,
    }
)

export default favoritesReducer;