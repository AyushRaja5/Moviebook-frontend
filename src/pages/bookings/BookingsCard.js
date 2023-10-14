import React, { useEffect, useState } from 'react'
import './bookings.css'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import './bookings.css'
import { deleteBooking, getMovieById } from '../../api/ApiHelper'
const BookingsCard = ({ movieTitle, date, posterUrl, seats, onRemoveBooking, id }) => {
    const [movieUrl, setMovieUrl] = useState('');
    useEffect(() => {
      const fetchMovieUrl = async () => {
          try {
              const response = await getMovieById(posterUrl);
              setMovieUrl(response.movie.posterUrl); // Assuming response.data contains the movie URL
          } catch (error) {
              console.log('Movie Not Found', error);
          }
      };
      fetchMovieUrl();
  }, [id]);
  return (
    <Card id={id} sx={{ margin: 1, width: 260, height: 350, borderRadius: 2, ":hover": { boxShadow: "10px 10px 4px #ccc" } }}>
      <img className='cardimg' src={movieUrl} alt='movie-card' />
      <CardContent sx={{ padding: 0 }}>
        <Typography gutterBottom variant="h5" component="div" margin={0} padding={0}>
          {movieTitle}
        </Typography>
        Booking Date: {new Date(date).toLocaleDateString()}
        <div className='seats'>
          {seats && seats.map((seat, index) => (<span key={index}>{seat}</span>))}
        </div>
      </CardContent>
      <CardActions>
        <Button className='remove-booking-btn'
          onClick={()=>onRemoveBooking(id)}
          sx={{
            margin: '0 auto', background: '#1b2430', color: 'white',
            '&:hover': { background: '#74aaf1', color: 'red' }
          }} variant='outlined'
          size="small" >Delete Booking
        </Button>
      </CardActions>
    </Card>
  )
}

export default BookingsCard