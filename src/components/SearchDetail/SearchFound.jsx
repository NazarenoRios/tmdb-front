import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "../../common/Card/CategoryCard";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { MovieSearchRequest, MovieSearchRequest2, MovieSetSearch, MovieSetSearch2, SerieSetSearch, SerieSetSearch2 } from "../../state/movies";
import CategoryCard2 from "../../common/Card/CategoryCard2";

function SearchFound() {
  
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [series,setSeries] = useState([]);
  const [series2,setSeries2] = useState([]);

  const get_url = "https://api.themoviedb.org/3";
  const API_KEY = "?api_key=a9891d14d2e4598d55823b3ec706cfb0";

  const search = useInput();
  const dispatch = useDispatch();

  //input
  const details = function (e) {
    e.target.placeholder = "";
  };

 const handleSearch = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    dispatch(MovieSetSearch({get_url, API_KEY, search, setMovies}))
    dispatch(MovieSetSearch2({get_url, API_KEY, search, setMovies2}))
    dispatch(SerieSetSearch({get_url, API_KEY, search, setSeries}))
    dispatch(SerieSetSearch2({get_url, API_KEY, search, setSeries2}))
  }
 }
  //SearchFound
  useEffect(() => {
    dispatch(MovieSearchRequest({get_url, setMovies}))
    dispatch(MovieSearchRequest2({get_url, setMovies2}))
  },[])

  return (
    <>
      <Container>
        <Input
          autocorrect="off"
          maxlength="50"
          placeholder="What are you looking for?"
          autocapitalize="sentences"
          onFocus={details}
          onKeyDown={handleSearch}
          {...search}
        />
      </Container>

      <SimpleGrid minChildWidth="300px" spacing="30px">
        {series?.map((movie, i) => (
          <CategoryCard2 movie={movie} key={i} />
        ))}
        {series2?.map((movie, i) => (
          <CategoryCard2 movie={movie} key={i} />
        ))}
        {movies.map((movie, i) => (
          <CategoryCard movie={movie} key={i} />
        ))}
        {movies2.map((movie, i) => (
          <CategoryCard movie={movie} key={i} />
        ))}
      </SimpleGrid>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Input = styled.input`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  height: 68px;
  letter-spacing: 0px;
  outline: none;
  padding-left: 48px;
  width: 1629px;
  border-color: rgba(255, 255, 255, 0.4);
  background-color: #131728;
  text-align: center;

  &::placeholder {
    color: #fff;
  }
`;

export default SearchFound;
