import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import requests from "../utils/requests";
import axios from "axios";


export const CategoryDisneyRequest = createAsyncThunk("DISNEY_CATEGORY", ({get_url, setMovies}) => {
    return axios.get(`${get_url}${requests.fetchDisney}`)
      .then(res => setMovies(res.data.items))
})

export const CategoryMarvelRequest = createAsyncThunk("MARVEL_CATEGORY", ({get_url, setMovies}) => {
    return axios.get(`${get_url}${requests.fetchMarvel}`)
      .then(res => setMovies(res.data.items))
})

export const CategoryNatGeo = createAsyncThunk("NATGEO_CATEGORY", ({get_url, setMovies}) => {
  return axios.get(`${get_url}${requests.fetchNatGeo}`)
    .then(res => setMovies(res.data.items))
})

export const CategoryPixarRequest = createAsyncThunk("PIXAR_CATEGORY", ({get_url, setMovies}) => {
    return axios.get(`${get_url}${requests.fetchPixar}`)
      .then(res => setMovies(res.data.items))
})

export const CategoryStarWarsRequest = createAsyncThunk("STARWARS_CATEGORY", ({get_url, setMovies}) => {
    return axios.get(`${get_url}${requests.fetchStarWars}`)
      .then(res => setMovies(res.data.items))
})


const categoriesReducer = createReducer(
    {},
    {
        [CategoryDisneyRequest.fulfilled]: (state,action) => action.payload,
        [CategoryMarvelRequest.fulfilled]: (state,action) => action.payload,
        [CategoryNatGeo.fulfilled]: (state,action) => action.payload,
        [CategoryPixarRequest.fulfilled]: (state,action) => action.payload,
        [CategoryStarWarsRequest.fulfilled]: (state,action) => action.payload,
    }
)

export default categoriesReducer;