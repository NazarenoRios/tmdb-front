import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger"
import moviesReducer from "./movies";
import usersReducer from "./user";
import categoriesReducer from "./categories";
import favoritesReducer from "./favorites";
import updatedUserReducer from "./updatedUser";

const store = configureStore({
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        users: usersReducer,
        movies: moviesReducer,
        categories: categoriesReducer,
        favorites: favoritesReducer,
        updatedUser: updatedUserReducer
    }
})

export default store;