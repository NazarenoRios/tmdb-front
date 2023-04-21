import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, CheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { MovieBannerRequest } from "../../state/movies";

import "./Banner.css";
import { fetchApi } from "../../config/axiosInstance";

function Banner() {
  const get_url = "https://api.themoviedb.org/3";

  const [checkFav, setCheckFav] = useState(false);
  const [movies, setMovies] = useState([]);

  const movie = useSelector((state) => state.movies);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    dispatch(MovieBannerRequest(get_url));
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

  useEffect(() => {
    movies?.map((favMov) => favMov.code === movie.id && setCheckFav(true));
  }, [movies]);

  const fetchAddFavorite = async () => {
    const res = await fetchApi({
      method: "put",
      url: `/api/movies/addFavorite?userId=${users.id}&code=${movie.id}&title=${movie.title}&poster_path=${movie.poster_path}&vote_average=${movie.vote_average}&release_date=${movie.release_date}&type=movie`,
    });
    return res.data
  };

  const fetchDeleteFavorite = async () => {
    const res = await fetchApi({
      method: "delete",
      url: `/api/movies/removeFavorite?userId=${users.id}&code=${movie.id}&type=movie`,
    });
    return res.data
  };

  const addFavorite = (e) => {
    e.preventDefault();
    setCheckFav(!checkFav);
    fetchAddFavorite()
  };

  const removeFavorite = (e) => {
    e.preventDefault();
    setCheckFav(!checkFav);
    fetchDeleteFavorite();
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons flex">
          <Link to={`/movie/${movie.id}`}>
            <button className="banner__button">Play</button>
          </Link>

          <Link to="/favorites">
            <button className="banner__button">My List</button>
          </Link>

          <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60 hover:bg-[#c6c6c6] hover:text-[#191919]">
            {checkFav ? (
              <button onClick={removeFavorite}>
                <CheckIcon className="h-6" />
              </button>
            ) : (
              <button onClick={addFavorite}>
                <PlusIcon className="h-6" />
              </button>
            )}
          </div>
        </div>

        <h1
          style={{ fontSize: "20px" }}
          className="banner__description text-xl"
        >
          {truncate(movie?.overview, 250)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
