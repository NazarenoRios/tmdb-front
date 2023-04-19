import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, CheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { MovieBannerRequest } from "../../state/movies";
import { addToFavorites, Favorites } from "../../state/favorites";

import "./Banner.css";

function Banner() {
  const get_url = "https://api.themoviedb.org/3";

  const [checkFav, setCheckFav] = useState(false);
  const [movies, setMovies] = useState([]);

  const movie = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    dispatch(MovieBannerRequest( get_url ));
    dispatch(Favorites(setMovies));
  }, []);

  useEffect(() => {
    movies?.map(favMov => favMov.code === movie.id && setCheckFav(true))
  },[movies])

  const addFavorite = (e) => {
    e.preventDefault();
    setCheckFav(!checkFav);
    dispatch(addToFavorites(movie));
  };

  const removeFavorite = (e) => {
    e.preventDefault();
    setCheckFav(!checkFav)
    dispatch(removeFavorite(movie))
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

        <h1 style={{fontSize:"20px"}} className="banner__description text-xl">
          {truncate(movie?.overview, 250)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
