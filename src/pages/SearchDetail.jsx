import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../common/Footer'
import NeedToLogIn from "../pages/NeedToLogin";
import PreFooter from '../common/PreFooter'
import Nav from '../components/Nav/Nav'
import SearchFound from '../components/SearchDetail/SearchFound'
import { checkLogin } from '../state/user'


function SearchDetail() {

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, []);

  const token = localStorage.getItem("token")

  if (token) {
    return (
      <>
          <Nav/>
          <SearchFound/>
          <PreFooter/>
          <Footer/>
      </>
    )
  }

  return (
    <NeedToLogIn />
  );
}

export default SearchDetail