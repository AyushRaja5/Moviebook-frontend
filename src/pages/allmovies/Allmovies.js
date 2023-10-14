import React, { useEffect, useState } from 'react'
import { getallMovies } from '../../api/ApiHelper';
import Card from '../../components/card/Card';
import './allmovies.css'
import { Typography } from '@mui/material';
const Allmovies = () => {
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
    console.log(allMovie);
    return (
        <>
            <Typography padding={3} fontFamily={'fantasy'} variant='h4' textAlign={'center'}>
                All <span style={{ color: 'red' }}>Movies</span></Typography>
            <div className='allmovies-div'>
                {
                    allMovie && allMovie.map((movie, index) => <Card id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index} />)
                }
            </div>
        </>
    )
}

export default Allmovies