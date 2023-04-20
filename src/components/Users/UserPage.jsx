import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getUser } from '../../state/updatedUser';
import UserPersonalCard from "../../common/Card/UserPersonalCard/UserPersonalCard";
import UserInfoCard from "../../common/Card/UserPersonalCard/UserInfoCard";
import { UserFavorites } from "../../state/favorites";
import axios from "axios";

function UserPage() {

  const params = useParams()
  // const id = JSON.stringify(parseInt(params.id));

  // const [user,setUser] = useState({});
  const [movies,setMovies] = useState([]);

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUser({id,setUser}))
  // },[])

  const users = useSelector((state) => state.users)

  // useEffect(() => {
  //   // dispatch(UserFavorites({id,setMovies}));
  //   axios
  //   .get(`/api/movies/favorites?userId=${users.id}`)
  //   .then((res) => {
  //     console.log(res)
  //     setMovies(res.config.data)
  //   });
  // }, []);

  console.log("users",users)
  // console.log("MOVIES",movies)

  return (
    <>
      {/* <UserPersonalCard user={users}/> */}

      {/* <div className="flex justify-center mb-2">
        <h1 style={{fontSize:"30px"}}>{users.name}</h1>
      </div> */}

      <div className="flex justify-center">
        <h2 style={{fontSize:"30px"}}>Favorite List</h2>
      </div>

      {/* <SimpleGrid minChildWidth="300px" spacing="30px">
        {movies ? (movies.map((movie,i) => (
          <UserInfoCard movie={movie} key={i}/>
        ))) : ("")}
      </SimpleGrid> */}
    </>
  );
}


export default UserPage;
