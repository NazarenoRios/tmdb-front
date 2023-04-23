import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"))
const MoviePage = lazy(() => import("./pages/MoviePage"))
const TvPage = lazy(() => import("./pages/TvPage"))
const SearchDetail = lazy(() => import("./pages/SearchDetail"))
const Principal = lazy(() => import("./pages/Principal"))
const LoginForm = lazy(() => import("./pages/LoginForm"))
const RegisterForm = lazy(() => import("./pages/RegisterForm"))
const Favorites = lazy(() => import("./pages/Favorites"))
const Users = lazy(() => import("./pages/Users"))
const User = lazy(() => import("./pages/User"))
const MyProfile = lazy(() => import("./pages/MyProfile"))
const ChangePassword = lazy(() => import("./pages/ChangePassword"))
const Disney = lazy(() => import("./components/Categories/Category/Disney"))
const Marvel = lazy(() => import("./components/Categories/Category/Marvel"))
const Pixar = lazy(() => import("./components/Categories/Category/Pixar"))
const StarWars = lazy(() => import("./components/Categories/Category/StarWars"))
const NatGeo = lazy(() => import("./components/Categories/Category/NatGeo"))
// const Chat = lazy(() => import("./pages/Chat"))

function App() {

  return (
      <Routes>
        <Route path="/" element={<Suspense fallback={<LoadingSpinner/>} ><Principal /></Suspense>}/>
        <Route path="/home" element={<Suspense fallback={<LoadingSpinner/>} ><Home /></Suspense>} />
        <Route path="/tv/:id" element={<Suspense fallback={<LoadingSpinner/>} ><TvPage /></Suspense>} />
        <Route path="/movie/:id" element={<Suspense fallback={<LoadingSpinner/>} ><MoviePage /></Suspense>} />
        <Route path="/search" element={<Suspense fallback={<LoadingSpinner/>} ><SearchDetail /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<LoadingSpinner/>} ><LoginForm /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<LoadingSpinner/>} ><RegisterForm /></Suspense>} />
        <Route path="/favorites" element={<Suspense fallback={<LoadingSpinner/>} ><Favorites /></Suspense>}/>
        <Route path="/users" element={<Suspense fallback={<LoadingSpinner/>} ><Users /></Suspense>}/>
        <Route path="/user/:id" element={<Suspense fallback={<LoadingSpinner/>} ><User /></Suspense>}/>
        <Route path="/myprofile" element={<Suspense fallback={<LoadingSpinner/>} ><MyProfile /></Suspense>}/>
        <Route path="/changepassword" element={<Suspense fallback={<LoadingSpinner/>} ><ChangePassword /></Suspense>}/>
        <Route path="/disney" element={<Suspense fallback={<LoadingSpinner/>} ><Disney /></Suspense>}/>
        <Route path="/marvel" element={<Suspense fallback={<LoadingSpinner/>} ><Marvel /></Suspense>}/>
        <Route path="/natgeo" element={<Suspense fallback={<LoadingSpinner/>} ><NatGeo /></Suspense>}/>
        <Route path="/pixar" element={<Suspense fallback={<LoadingSpinner/>} ><Pixar /></Suspense>}/>
        <Route path="/starwars" element={<Suspense fallback={<LoadingSpinner/>} ><StarWars /></Suspense>}/>
        {/* <Route path="/chat" element={<Suspense fallback={<LoadingSpinner/>} ><Chat /></Suspense>}/> */}
      </Routes>
  );
}

export default App;
