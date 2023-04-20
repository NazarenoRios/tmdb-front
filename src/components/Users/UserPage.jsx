import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UserPersonalCard from "../../common/Card/UserPersonalCard/UserPersonalCard";
import UserInfoCard from "../../common/Card/UserPersonalCard/UserInfoCard";
import { fetchApi } from "../../config/axiosInstance";
import { useLocation } from "react-router-dom";

function UserPage() {

  const params = useLocation();

  console.log(params.pathname.split("/user/")[1])

  const [movies,setMovies] = useState([]);

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
