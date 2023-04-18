import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Nav from "../../Nav/Nav";
import CategoryCard from "../../../common/Card/CategoryCard";
import { CategoryMarvelRequest } from "../../../state/categories";

export default function Marvel() {
  const get_url = "https://api.themoviedb.org/3";

  const [movies,setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CategoryMarvelRequest({get_url,setMovies}));
  }, []);

  return (
    <>
      <Nav />
      <SimpleGrid minChildWidth="300px" spacing="30px">
      {movies.map((movie, i) => (
          <CategoryCard movie={movie} key={i} />
        ))}
      </SimpleGrid>
    </>
  );
}