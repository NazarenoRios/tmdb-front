import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Favorites } from "../../state/favorites";
import Nav from "../Nav/Nav";
import Card from "../../common/Card/Card";
import axios from "axios";

export default function FavPage() {

  const [movies, setMovies] = useState([]);

  const users = useSelector((state) => state.users)

  useEffect(() => {
    axios
    .get(`/api/movies/favorites?userId=${users.id}`)
    .then((res) => {
      console.log(res)
      setMovies(res.config.data)
    });
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
      <p className="text-red-600">404 Not Found</p>
    </>
  );
}
