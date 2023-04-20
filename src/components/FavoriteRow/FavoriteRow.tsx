import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import "./Row.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../../config/axiosInstance";

const base_url = "https://image.tmdb.org/t/p/original/";

function FavoriteRow({ title }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
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
  

  if (movies) {
    return (
      // title
      <div className="row h-40 space-y-0.5 md:space-y-2 sm:mt-12">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl md:mt-40">
          {title}
        </h2>

        {/* row */}
        <div className="row__posters group relative md:-ml-2">
          {/* carousel left button */}
          <ChevronLeftIcon
            className={`leftIcon absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
              !isMoved && "hidden"
            }`}
            onClick={() => handleClick("left")}
          />

          {/* movies row */}
          <div
            className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
            ref={rowRef}
          >
            {movies?.map((movie, i) => (
              <div
                key={i}
                className="relative h-28 min-w-[180px] md:min-w-[380px] md:min-h-[220px]"
              >
                <Link to={`/movie/${movie.code}`}>
                  <Image
                    key={movie.id}
                    className="row__poster "
                    src={`${base_url}${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    alt={movie.name}  
                    height="100%"
                    width="100%"
                  />
                </Link>
              </div>
            ))}
          </div>
          {/* carousel right button */}
          <ChevronRightIcon
            className="rightIcon absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }
}

export default FavoriteRow;
