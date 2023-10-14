import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookMoviebyId, getMovieById } from '../../api/ApiHelper';
import { Box, Button, TextField, Typography } from '@mui/material';
import './booking.css';

const Booking = () => {
    const { id } = useParams();
    const [Movie, setMovie] = useState({});
    const [bookDate, setBookDate] = useState(new Date(Movie.releaseDate));
    const [selectedSeats, setSelectedSeats] = useState([]); // State to store selected seats
    const initialSeats = ["A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20",
        "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20",
        "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20",
        "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20"];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await getMovieById(id);
                setMovie(movieData.movie);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, [id]);
    console.log(Movie);
    const starsList = Movie.stars && Movie.stars.map((star, index) => (
        <span key={index}>
            {star}
            {index < Movie.stars.length - 2 ? ', ' : ''}
            {index === Movie.stars.length - 2 ? ' & ' : ''}
        </span>
    ));

    // Event handler for the date field
    const handleDateChange = (event) => {
        setBookDate(event.target.value);
    };

    // Event handler for selecting/deselecting seats
    const handleSeatToggle = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const bookedMovie = await bookMoviebyId({ id, bookDate, selectedSeats });
            console.log(bookedMovie, "Booking SuccessFull");
            setBookDate(new Date(Movie.releaseDate)); // Reset to default date
            setSelectedSeats([]); 
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    };

    const releaseDate = new Date(Movie.releaseDate);
    const formatedReleaseDate = releaseDate.toDateString();

    return (
        <div>
            {Movie && (
                <Fragment>
                    <Typography
                        padding={3}
                        fontFamily={'fantasy'}
                        variant='h4'
                        textAlign={'center'}
                    >
                        Book Tickets for <span style={{ color: 'red' }}>{Movie.title}</span>
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        className='Booking-movie-box'
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'column'}
                            padding={2}
                            width={'50%'}
                            height={'50%'}
                            margin={'auto'}
                            className='box-left'
                        >
                            <img
                                src={Movie.posterUrl}
                                alt={Movie.title}
                                width={'50%'}
                                height={'100%'}
                            />
                            <Box
                                width={'100%'}
                                marginTop={1}
                                padding={2}
                                backgroundColor='lightgreen'
                                textAlign={'justify'}
                            >
                                Description: {Movie.description}
                            </Box>
                        </Box>
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'column'}
                            padding={2}
                            width={'50%'}
                            margin={'auto'}
                            className='box-right'
                        >
                            <Typography fontFamily={'fantasy'} variant='h3' className='flashy-bouncy-text'>
                                Book Now
                            </Typography>
                            <Typography paddingTop={1} fontWeight={'bold'} marginTop={1}>
                                Staring : {starsList}
                            </Typography>
                            <Typography paddingBottom={1} fontWeight={'bold'}>
                                In Theatre : {formatedReleaseDate}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Box display={'flex'} flexDirection={'column'}>
                                    <TextField
                                        type='date'
                                        label={
                                            <span style={{ fontWeight: 'bold' }}>Book Date</span>
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        style={{ marginBottom: '10px' }}
                                        value={bookDate}
                                        onChange={handleDateChange}
                                    />
                                    <div style={{ textAlign: 'justify' }}>
                                        <Typography style={{ fontWeight: 'bold' }}>
                                            Select Seats:
                                        </Typography>
                                        {initialSeats.map((seat) => (
                                            <label key={seat} style={{ marginRight: '13px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSeats.includes(seat)}
                                                    onChange={() => handleSeatToggle(seat)}
                                                />
                                                {seat}
                                            </label>
                                        ))}
                                    </div>
                                    <Button type='submit' variant='outlined' sx={{marginTop:'20px'}}>
                                        Book Movie
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </div>
    );
};

export default Booking;
