import React, { Fragment, useEffect, useState } from 'react'
import BookingsCard from './BookingsCard'
import { Box, Typography } from '@mui/material'
import { deleteBooking, getUserProfile, userBookings } from '../../api/ApiHelper';


const Bookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const isUserLoggedIn = localStorage.getItem('user-token') !== null;
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (isUserLoggedIn) {
          const userpro = await getUserProfile();
          setUserProfile(userpro.user);
        }
      }
      catch (error) {
        console.log("Error hapening :", error)
      }
    }
    fetchUserBookings();
  }, [])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (userProfile && userProfile._id) {
          const Bookings = await userBookings(userProfile._id);
          setMyBookings(Bookings.bookings);
        }
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }
    };

    if (userProfile) {
      fetchBookings();
    }
  }, [userProfile]);

  const handleRemoveBooking = async (id) => {
    try {
      const movieTodelte = await deleteBooking(id);
      setMyBookings((prevBookings) => {
        return prevBookings.filter((booking) => booking._id !== id);
      });
      console.log(movieTodelte,'Movie Deleted')
    } catch (error) {
      console.error('Error deleting booking:', error.response);
    }
  };

// console.log('mybooking',myBookings)

  return (
    <Fragment>
      {isUserLoggedIn ?
        <>
          <Typography
            padding={3}
            fontFamily={'fantasy'}
            variant='h4'
            textAlign={'center'}
          >My <span style={{ color: 'red' }}>Bookings</span></Typography>
          <Box display={'flex'} justifyContent={'center'} flexWrap="wrap">
            {myBookings.map((booking, index) => (
              <BookingsCard key={index}
                movieTitle={booking.movieTitle} // Pass the movieTitle from the booking
                date={booking.date} // Pass the date from the booking
                posterUrl={booking.movie} // Pass the posterUrl from the booking
                seats = {booking.seat}
                onRemoveBooking={handleRemoveBooking}
                id={booking._id} />
            ))}
          </Box>
        </>
        :
        <Box><Typography
          padding={3}
          fontFamily={'fantasy'}
          variant='h4'
          textAlign={'center'}
        >Please <span style={{ color: 'red' }}>Login</span></Typography></Box>}
    </Fragment>
  )
}

export default Bookings