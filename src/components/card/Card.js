import React from 'react'
import './card.css'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import { Link} from 'react-router-dom';
const CardComponent = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card id={id} sx={{ margin: 1, width: 260, height: 350, borderRadius: 2, ":hover": { boxShadow: "10px 10px 4px #ccc" } }}>
      <img className='cardimg' src={posterUrl} alt='movie-card' />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        {new Date(releaseDate).toLocaleDateString()}
      </CardContent>
      <CardActions>
        <Button LinkComponent={Link} to={`/booking/${id}`} sx={{ margin: 'auto' }} variant='outlined' size="small">Book</Button>
      </CardActions>
    </Card>
  )
}

export default CardComponent