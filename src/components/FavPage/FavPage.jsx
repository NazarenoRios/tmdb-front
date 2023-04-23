import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Card from "../../common/Card/Card";
import { fetchApi } from "../../config/axiosInstance";
import NoMovies from "./NoMovies";
import LoadFavPage from "./LoadFavPage";

export default function FavPage() {

  const [movies, setMovies] = useState([]);
  const [toggleNoMovies, setToggleNoMovies] = useState(<LoadFavPage/>);

  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await fetchApi({
        method: "get",
        url: `/api/movies/favorites?userId=${users.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status !== 200) {
        setToggleNoMovies(<NoMovies/>)
      }

      setMovies(res.data);
    };
    fetchMovieData();
  }, []);

  if (movies.length !== 0) {
    return (
      <>
        <Nav />
        <SimpleGrid minChildWidth="300px" spacing="30px">
          {movies.map((movie, i) => (
            <Card movie={movie} key={i} />
          ))}
        </SimpleGrid>
      </>
    );
  }

  return (
    <>
      {toggleNoMovies}
    </>
  );
}
