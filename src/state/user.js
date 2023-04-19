import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import {fetchApi} from "../config/axiosInstance"

export const sendRegisterRequest = createAsyncThunk( "register", async({ email, password, name, lastname }) => {

    const res = await fetchApi({
      method: 'post',
      url: "/api/users/register",
      body: {
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
        },
    });

    return res.data;
  }
);

export const sendLoginRequest = createAsyncThunk(
  "login",
  async ({ email, password }) => {
    try {
      const { status, data } = await fetchApi({
        method: 'post',
        url: '/api/users/login',
        body: {
          email: email.value,
          password: password.value,
        },
      });
      
      if (status === 201) {
        localStorage.setItem("token", data.user.token);
      }

      console.log(status);
      console.log(data.user.token);
      console.log(data.user.id);

      const res = await fetchApi({
        method: 'get',
        url: `/api/users/persistence/${data.user.id}`,
      });

      return res.data;
      // return { status: 200, message: "Logged successfully!" }
    } catch (err) {
      return {
        status: err.response.status,
        message: "Invalid Credentials, please try again",
      };
    }
  }
);

export const checkLogin = createAsyncThunk("check", async () => {
  // const {
  //   data
  // } = await axios.get("api/users/me", {
  //   headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  // });

  const data = await fetchApi({
    method: 'get',
    url: "/api/users/me",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })

  console.log(data)

  const { data: data2} = await fetchApi({
    method: 'get',
    url: `/api/users/persistence/${data.id}`
  });
  // console.log(data)
  return data2;
});


export const logOut = createAsyncThunk("LOG_OUT",async () => {
  localStorage.clear();
  
  await fetchApi({
    method: 'post',
    url: '/api/users/logout',
  });

  return;
});

export const updateProfile = createAsyncThunk(
  "UPDATE_PROFILE",
  ({ name, lastname }) => {
    return axios
      .put("/api/users/profile", {
        name: name.value,
        lastname: lastname.value,
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  }
);

export const updateProfileName = createAsyncThunk(
  "UPDATE_PROFILE",
  (lastname) => {
    return axios
      .put("/api/users/profile", {
        lastname: lastname.value,
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  }
);

export const updateProfileLastname = createAsyncThunk(
  "UPDATE_PROFILE",
  (name) => {
    return axios
      .put("/api/users/profile", {
        name: name.value,
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  }
);

export const updateProfilePicture = createAsyncThunk(
  "UPDATE_PROFILE_PICTURE",
  (pic) => {
    return axios
      .put("/api/users/profile", {
        pic: pic,
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  }
);

export const changePassword = createAsyncThunk(
  "CHANGE_PASSWORD",
  ({ password }) => {
    return axios
      .put("/api/users/changePassword", {
        password: password.value,
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  }
);

export const getAllUsers = createAsyncThunk("GET_USERS", (setUsers) => {
  return axios
    .get("/api/users/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => setUsers(res.data));
});

const usersReducer = createReducer(
  {},
  {
    [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [checkLogin.fulfilled]: (state, action) => action.payload,
    [logOut.fulfilled]: (state, action) => action.payload,
    [updateProfile.fulfilled]: (state, action) => action.payload,
    [updateProfileName.fulfilled]: (state, action) => action.payload,
    [updateProfileLastname.fulfilled]: (state, action) => action.payload,
    [updateProfilePicture.fulfilled]: (state, action) => action.payload,
    [changePassword.fulfilled]: (state, action) => action.payload,
    [getAllUsers.fulfilled]: (state, action) => action.payload,
  }
);

export default usersReducer;
