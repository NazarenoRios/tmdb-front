import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Nav/Nav";
import CategoryCard from "../../../common/Card/CategoryCard";
import { CategoryNatGeo } from "../../../state/categories";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { fetchApi } from "../../../config/axiosInstance";
import NeedToLogin from "../../../pages/NeedToLogin";

export default function NatGeo() {
  const get_url = "https://api.themoviedb.org/3";

  const [movies,setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CategoryNatGeo({get_url,setMovies}));
  }, []);

  const [toggleNeedToLogIn, setToggleNeedToLogIn] = useState(
    <LoadingSpinner />
  );

  const user = useSelector((state) => state.users);

  const checkLogin = async () => {
    const res = await fetchApi({
      method: "get",
      url: "/api/users/me",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.status !== 200) {
      setToggleNeedToLogIn(<NeedToLogin />);
    }

    const { data } = await fetchApi({
      method: "get",
      url: `/api/users/persistence/${res.data.id}`,
    });

    return data;
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (user.id) {
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

  return { toggleNeedToLogIn };
}
