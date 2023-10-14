import React, { useEffect, useState } from 'react'
import { getallMovies } from '../../api/ApiHelper'
import './home.css'
import Card from '../card/Card'
import {Link} from 'react-router-dom'
import { Button} from '@mui/material'
const Home = () => {
  const [allMovie, setAllMovie] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getallMovies();
        setAllMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchData();
  }, []);
  // console.log(allMovie)
  return (
    <div className='home-main'>
      <div className='poster-big'>
        <img src='https://cdn2.storyasset.link/2d19ac09-e79e-459c-b9b4-6b9d601fe11c/26-ms-jnngaipjqe.jpeg'
          alt='Bhramastra' height={"100%"} width={"100%"} />
      </div>
      <div className='featured-movie'>
        <h2>Latest Release</h2>
      </div>
      <div className='cards-div'>
        {
          allMovie && allMovie.slice(0,4).map((movie, index)=> <Card id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}/>)
        }
      </div>
      <div className='all-movies'>
        <Button LinkComponent={Link} to='/allmovies' variant='outlined' className='all-movies-button' sx={{color:'#2b2d42'}}>
          View All Movies...</Button>
      </div>
    </div>
  )
}

export default Home

{/* {allMovie.map((movie) => (
        <h1 key={movie.id}>{movie.title}</h1>
      ))} */}