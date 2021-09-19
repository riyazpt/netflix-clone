import React from "react";
import "./RowPost.css";
import { useEffect, useState } from "react";
import { imageUrl, API_KEY } from "../../Constatnts/Constants";
import axios from "../../axios";
import YouTube from "react-youtube";
function RowPost(props) {
  const [movie, setMovie] = useState([]);
  const [urlId, setYotubeLink] = useState();
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => {
        alert("Netowrk error");
      });
    return () => {};
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`movie/${id}/videos?api_key=${API_KEY}&llanguage=en-US`)
      .then((response) => {
        if (response.data.results.length != 0) {
          setYotubeLink(response.data.results[0]);
          console.log(response.data.results[0].key);
        } else {
          console.log("empty array");
        }
      })
      .catch((error) => {
        alert("Netowrk error");
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movie.map((obj) => {
          return (
            <img
              onClick={() => handleMovie(obj.id)}
              className={props.isSmall ? "small-poster" : "poster"}
              alt="poster"
              src={`${imageUrl + obj.backdrop_path}`}
            />
          );
        })}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
