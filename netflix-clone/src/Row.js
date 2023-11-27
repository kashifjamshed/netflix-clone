import React, { useEffect, useState } from 'react'
import axios from "./axios"
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({title, fetchUrl}) {
    const [movies, setMovies] = useState([]);

    useEffect(()=>{ 
    // if [], run once and dont run again
    // if we pass anything on 'movie' then run everytime that value changes
       async function fetchData() {
         const request = await axios.get(fetchUrl);
         console.log(request);
         setMovies(request.data.results);
         console.log(request.data.results);
         return request;
       }
       fetchData();
    },[fetchUrl])
    console.log(movies);
  return (
    <div className= "row"> 
       <h2>{title}</h2>
       <div className ="row__posters">
         {movies.map(movie=>(
          
          <img className ="row__poster" src={`${base_url}${movie.poster_path}`} alt={movie.name}  />
         
         ))}

       </div>
    </div>
  )
}

export default Row