import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getUser = createAsyncThunk("GET_USER", ({id,setUser}) => {
    return axios.get(`/api/users/user/${id}`,{
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(res => setUser(res.data))
})

export const searchUser = createAsyncThunk("SEARCH_USER", ({name,setUsers}) => {
    console.log(name)
    return axios.get(`/api/users/search?name=${name}`,{
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(res => setUsers(res.data))
})


const updatedUserReducer = createReducer(
    {},
    {
        [getUser.fulfilled]: (state,action) => action.payload,
        [searchUser.fulfilled]: (state,action) => action.payload,
    }
)

export default updatedUserReducer;