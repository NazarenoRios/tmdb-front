import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import requests from "../utils/requests";
import axios from "axios";

export const MovieBannerRequest = createAsyncThunk("MOVIE_BANNER", (get_url) => {
    return axios.get(`${get_url}${requests.fetchAnimation}`)
      .then(res => res.data.results[Math.floor(Math.random() * res.data.results.length)])
})

export const MovieDetailRequest = createAsyncThunk("MOVIE_DETAIL", ({get_url, API_KEY, id}) => {
    return axios.get(`${get_url}/movie/${id}${API_KEY}&append_to_response=videos,images`)
      .then(res => res.data)
})

export const TvDetailRequest = createAsyncThunk("MOVIE_DETAIL", ({get_url, API_KEY, id}) => {
    return axios.get(`${get_url}/tv/${id}${API_KEY}&append_to_response=videos,images`)
      .then(res => res.data)
})

export const MovieSearchRequest = createAsyncThunk("MOVIE_SEARCH", ({get_url, setMovies}) => {
    return axios.get(`${get_url}${requests.fetchAnimation}`)
      .then(res => setMovies(res.data.results))
})

export const MovieSearchRequest2 = createAsyncThunk("MOVIE_SEARCH2", ({get_url, setMovies2}) => {
    return axios.get(`${get_url}${requests.fetchTrending}`)
      .then(res => setMovies2(res.data.results))
})

export const MovieSetSearch = createAsyncThunk("MOVIE_SET_SEARCH", ({get_url, API_KEY, search, setMovies}) => {
    return axios.get(`${get_url}/search/movie${API_KEY}&query=${search.value}&page=1`)
        .then(res => {
            setMovies(res.data.results)
            search.onChange({ target: { value: "" } });
        })
})

export const MovieSetSearch2 = createAsyncThunk("MOVIE_SET_SEARCH2", ({get_url, API_KEY, search, setMovies2}) => {
    return axios.get(`${get_url}/search/movie${API_KEY}&query=${search.value}&page=2`)
        .then(res => {
            setMovies2(res.data.results)
            search.onChange({ target: { value: "" } });
        })
})

export const SerieSetSearch = createAsyncThunk("MOVIE_SET_SEARCH", ({get_url, API_KEY, search, setSeries}) => {
    return axios.get(`${get_url}/search/tv${API_KEY}&query=${search.value}&page=1`)
        .then(res => {
            setSeries(res.data.results)
            search.onChange({ target: { value: "" } });
        })
})

export const SerieSetSearch2 = createAsyncThunk("MOVIE_SET_SEARCH", ({get_url, API_KEY, search, setSeries2}) => {
    return axios.get(`${get_url}/search/tv${API_KEY}&query=${search.value}&page=2`)
        .then(res => {
            setSeries2(res.data.results)
            search.onChange({ target: { value: "" } });
        })
})


const moviesReducer = createReducer(
    {},
    {
        [MovieDetailRequest.fulfilled]: (state,action) => action.payload,
        [TvDetailRequest.fulfilled]: (state,action) => action.payload,
        [MovieBannerRequest.fulfilled]: (state,action) => action.payload,
        [MovieSearchRequest.fulfilled]: (state,action) => action.payload,
        [MovieSearchRequest2.fulfilled]: (state,action) => action.payload,
        [MovieSetSearch.fulfilled]: (state,action) => action.payload,
        [MovieSetSearch2.fulfilled]: (state,action) => action.payload,
        [SerieSetSearch.fulfilled]: (state,action) => action.payload,
        [SerieSetSearch2.fulfilled]: (state,action) => action.payload
    }
)

export default moviesReducer;