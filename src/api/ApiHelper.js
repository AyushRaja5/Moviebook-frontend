import axios from 'axios'

export const getallMovies = async () => {
    const res = await axios.get('/movie/getallmovies').catch((err) => console.log(err))

    const moviedata = await res.data;
    // console.log(moviedata);
    return moviedata;
}

export const UserLogin = async ({ email, password }) => {
    try {
        const response = await axios.post('/user/login', {
            email, password
        });
        if (response.status === 500) console.log("Balle Balle")
        // Check if the response status code indicates success (2xx)
        if (response.status >= 200 && response.status < 300) {
            const UserData = response.data;
            console.log("Login Successful");
            // console.log(UserData.token);
            localStorage.setItem('user-token', UserData.token);
            return UserData;
        } else {
            // Handle non-successful status codes (e.g., 4xx, 5xx)
            console.error("Login Error - Status Code:", response.status);
            // You can also handle specific error cases based on the status code here.
            return { error: "An error occurred during login." };
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
};

export const UserSignUp = async ({ name, email, password }) => {
    try {
        const response = await axios.post('/user/signup', {
            name, email, password
        })
        const UserSignUpdata = response.data;

        if (UserSignUpdata.error)
            console.log(UserSignUpdata.error)
        else {
            console.log('User Sign Up succesfully');
        }
        return UserSignUpdata;
    }
    catch (err) {
        // console.log(err)
        console.log(err.response.data.message)
    }
}

export const AdminLogin = async ({ email, password }) => {
    try {
        const response = await axios.post('/admin/login', {
            email, password
        });

        if (response.status >= 200 && response.status < 300) {
            const AdminData = response.data;
            console.log("Login Successful");
            localStorage.setItem('admin-token', AdminData.token);
            return AdminData;
        } else {
            // Handle non-successful status codes (e.g., 4xx, 5xx)
            console.error("Login Error - Status Code:", response.status);
            // You can also handle specific error cases based on the status code here.
            return { error: "An error occurred during login." };
        }
    }
    catch (error) {
        console.log(error.response.data.message);
    }
}

export const AdminSignUp = async ({ name, email, password }) => {
    try {
        const response = await axios.post('/admin/signup', {
            name, email, password
        })
        const AdminSignUpdata = response.data;

        if (AdminSignUpdata.error)
            console.log(AdminSignUpdata.error)
        else {
            console.log('Admin Sign Up succesfully');
        }
        return AdminSignUpdata;
    }
    catch (err) {
        // console.log(err)
        console.log(err.response.data.message)
    }
}

export const getAdminProfile = async () => {
    const response = await axios.get('/admin', {
        headers: {
            'Authorization': localStorage.getItem('admin-token')
        }
    }).catch((error) => console.log(error));
    const adminProfile = await response.data;
    return adminProfile;
}
export const getUserProfile = async () => {
    const response = await axios.get(`/user`, {
        headers: {
            'Authorization': localStorage.getItem('user-token')
        }
    }).catch((error) => console.log(error));
    const userProfile = await response.data;
    return userProfile;
}

export const getMovieById = async (id) => {
    // const response = await axios.get(`movie/getmovie/${id}`, {}).catch((err) => console.log(err));
    // if (response.status !== 200) return console.log("Unexpected Error");
    // const movieDetail = await response.data;
    // return movieDetail;
    try {
        const response = await axios.get(`movie/getmovie/${id}`, {});
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Unexpected Error");
            return null; // Return null or some other error indicator
        }
    } catch (err) {
        console.log("Error:", err);
        return null; // Return null or some other error indicator
    }
}

export const bookMoviebyId = async ({ id, bookDate, selectedSeats }) => {

    const response = await axios.post(`/booking/bookingMovie/${id}`, { date: bookDate, seat: selectedSeats }, {
        headers: {
            'Authorization': localStorage.getItem('user-token')
        }
    });
    const bookMovie = response.data;
    // userBookings(id);

    return bookMovie;
}

export const userBookings = async (id) => {
    const response = await axios.get(`/user/getmovie/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('user-token')
        }
    }).catch((err) => console.log(err))

    const allBookings = await response.data;
    return allBookings;
}

export const deleteBooking = async (id) => {
    const response = await axios.delete(`/booking/deletebooking/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('user-token')
        }
    }).catch((error) => console.log(error))

    const deleteMovie = response.data;
    return deleteMovie;
}

export const addMovie = async (data) => {
    console.log(data);
    const response = await axios.post('http://localhost:8000/movie/addmovie', {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.poster,
        featured: data.featured,
        stars: data.allActors,
    }, {
        headers: {
            'Authorization': localStorage.getItem('admin-token'),
        },
    }).catch((error) => console.log(error));

    const AddMovie = response.data;
    return AddMovie;
};

export const uploadedMovie = async (movieId) => {
    try {
        const response = await axios.get(`/movie/getmovie/${movieId}`);
        const movie = response.data;
        return movie;
    } catch (error) {
        console.error('Error fetching movie:', error);
        // throw error; // Rethrow the error for handling further up the call stack if needed
    }
}

export const removeMovie = async (movieId) => {
    // console.log(movieId)
    try {
        const response = await axios.delete(`/movie/deletemovie/${movieId}`,{
            headers:{
                'Authorization' : localStorage.getItem('admin-token')
            }
        });
        const removedMovie = response.data;
        return removedMovie
    }catch(error){
        console.log('Error while removing movie', error);
    }
}