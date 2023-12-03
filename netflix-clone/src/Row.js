import React, { useEffect, useState } from 'react'
import axios from "./axios"
import "./Row.css"
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const[trailerUrl,setTrailerUrl] = useState("");
    const opts = {
      height:"390",
      width: "100%",
      playerVars:{
      autoplay: 1
      }
    }
    useEffect(()=>{ 

    // if [], run once and dont run again
    // if we pass anything on 'movie' then run everytime that value changes
       async function fetchData() {
         const request = await axios.get(fetchUrl);
         setMovies(request.data.results);

         return request;
       }
       fetchData();
    },[fetchUrl])

    const handleClick = (movie)=>{
       if(trailerUrl){
        setTrailerUrl('');
       }
       else{
        movieTrailer(movie.name)
        .then(url=>{
          //https://www.youtube.com/watch?v=XtMThy8QKqU&t=7607s
          const urlParams = new URLSearchParams(new URL(url).search); // to find everything after question mark
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        }).catch((error)=>console.log(error));
       }
    }
  return (
    <div className= "row"> 
       <h2>{title}</h2>
       <div className ="row__posters">
         {movies.map(movie=>(
          <img className = {`row__poster ${isLargeRow && "row__posterLarge"} `}
               onClick={()=>handleClick(movie)}
               key={movie.id}
               src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
               alt={movie.name} 
         />
         ))}
       </div>
      
       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

       
    </div>
  )
}

export default Row