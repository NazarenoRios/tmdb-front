import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import UserPersonalCard from "../../common/Card/UserPersonalCard/UserPersonalCard";
import UserInfoCard from "../../common/Card/UserPersonalCard/UserInfoCard";
import { fetchApi } from "../../config/axiosInstance";

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

  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await fetchApi({
        method: "get",
        url: `/api/movies/favorites?userId=${users.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMovies(res.data);
    };
    fetchMovieData();
  }, []);

  console.log("users",users)
  console.log("MOVIES",movies)

  return (
    <>
      <UserPersonalCard user={users}/>

      <div className="flex justify-center mb-2">
        <h1 style={{fontSize:"30px"}}>{users.name}</h1>
      </div>

      <div className="flex justify-center">
        <h2 style={{fontSize:"30px"}}>Favorite List</h2>
      </div>

      <SimpleGrid minChildWidth="300px" spacing="30px">
        {movies ? (movies.map((movie,i) => (
          <UserInfoCard movie={movie} key={i}/>
        ))) : ("")}
      </SimpleGrid>
    </>
  );
}


export default UserPage;
