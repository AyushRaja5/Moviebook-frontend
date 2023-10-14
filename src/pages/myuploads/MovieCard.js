import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'

const MovieCard = ({ movieTitle, date, posterUrl, totalBooking, onRemoveMovie, movieId }) => {
  return (
    <Card id={movieId} sx={{ margin: 1, width: 260, height: 350, borderRadius: 2, ":hover": { boxShadow: "10px 10px 4px #ccc" } }}>
      <img className='cardimg' src={posterUrl} alt='movie-card' />
      <CardContent sx={{ padding: 0 }}>
        <Typography gutterBottom variant="h5" component="div" margin={0} padding={0}>
          {movieTitle}
        </Typography>
        Uploaded Date: {new Date(date).toLocaleDateString()}
        <div className='seats'>
          Total Bookings : {totalBooking}
        </div>
      </CardContent>
      <CardActions>
        <Button className='remove-booking-btn'
        onClick={()=>onRemoveMovie(movieId)}
          sx={{
            margin: '0 auto', background: '#1b2430', color: 'white',
            '&:hover': { background: '#74aaf1', color: 'red' }
          }} variant='outlined'
          size="small" >Remove Movie
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieCard