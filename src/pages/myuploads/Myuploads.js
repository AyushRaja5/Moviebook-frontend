import React, { useEffect, useState } from 'react'
import './myuploads.css'
import { Box, Typography } from '@mui/material'
import MovieCard from './MovieCard'
import { getAdminProfile, removeMovie, uploadedMovie } from '../../api/ApiHelper'
const Myuploads = () => {
  const [adminMoviesId, setAdminMoviesId] = useState([]);
  const [allFetchedMovies, setAllFetchedMovies] = useState([]);
  const isAdminLoggedIn = localStorage.getItem('admin-token') !== null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isAdminLoggedIn) {
          const adminProfileData = await getAdminProfile(); // Fetch admin profile
          setAdminMoviesId(adminProfileData.admin.addmovies);
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = [];
      for (const movieId of adminMoviesId) {
        try {
          const response = await uploadedMovie(movieId);
          fetchedMovies.push(response.movie);
        } catch (error) {
          console.log(`Error fetching movie with ID ${movieId}:`, error);
        }
      }
      setAllFetchedMovies(fetchedMovies);
    };

    if (adminMoviesId.length > 0) {
      fetchMovies();
    }
  }, [adminMoviesId]);

  console.log(allFetchedMovies)
  
  const handleRemoveMovie = async(movieId) => {
    try{
      const Movie = await removeMovie(movieId);
      console.log(Movie);
      setAllFetchedMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
    }
    catch(error){
      console.log('Error in deleting Movie:', error.response)
    }
  }
  return (
    <div>
      {isAdminLoggedIn ? (
        <div>
          <Typography
            padding={3}
            fontFamily={'fantasy'}
            variant='h4'
            textAlign={'center'}
          >
            My <span style={{ color: 'red' }}>Uploads</span>
          </Typography>
          <Box display={'flex'} justifyContent={'center'} flexWrap="wrap">
            {allFetchedMovies.map((movie, index) => (
              <MovieCard
                key={index}
                movieTitle={movie.title}
                date={movie.releaseDate}
                posterUrl={movie.posterUrl}
                totalBooking={movie.bookings.length}
                
                onRemoveMovie={() => handleRemoveMovie(movie._id)}
                
              />
            ))}
          </Box>
        </div>
      ) : (
        <Typography
          padding={3}
          fontFamily={'fantasy'}
          variant='h3'
          textAlign={'center'}
        >
          Please log in first.
        </Typography>
      )}
    </div>
  )
}

export default Myuploads