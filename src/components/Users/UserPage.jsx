import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getUser } from '../../state/updatedUser';
import UserPersonalCard from "../../common/Card/UserPersonalCard/UserPersonalCard";
import UserInfoCard from "../../common/Card/UserPersonalCard/UserInfoCard";
import { UserFavorites } from "../../state/favorites";

function UserPage() {

  const params = useParams()
  const id = JSON.stringify(parseInt(params.id));

  const [user,setUser] = useState({});
  const [movies,setMovies] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser({id,setUser}))
  },[])

  useEffect(() => {
    dispatch(UserFavorites({id,setMovies}));
  }, []);

  return (
    <>
      <UserPersonalCard user={user}/>

      <div className="flex justify-center mb-2">
        <h1 style={{fontSize:"30px"}}>{user.name}</h1>
      </div>

      <div className="flex justify-center">
        <h2 style={{fontSize:"30px"}}>Favorite List</h2>
      </div>

      <SimpleGrid minChildWidth="300px" spacing="30px">
        {movies.map((movie,i) => (
          <UserInfoCard movie={movie} key={i}/>
        ))}
      </SimpleGrid>
    </>
  );
}


export default UserPage;
