import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../common/Footer'
import PreFooter from '../common/PreFooter'
import Nav from '../components/Nav/Nav'
import SearchFound from '../components/SearchDetail/SearchFound'
import { checkLogin } from '../state/user'
import LoadingSpinner from '../common/LoadingSpinner'


function SearchDetail() {

  const [toggleNeedToLogIn, setToggleNeedToLogIn] = useState(<LoadingSpinner/>);

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin(setToggleNeedToLogIn))
  }, []);

  if (user.id) {
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
    {toggleNeedToLogIn}
  );
}

export default SearchDetail