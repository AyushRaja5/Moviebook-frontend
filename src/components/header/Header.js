import React, { useState, useEffect } from 'react';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { HiMenuAlt3, HiSearch } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { getallMovies } from '../../api/ApiHelper';

const Header = () => {
    const navigate = useNavigate();
    const [allMovie, setAllMovie] = useState([]);
    const isAdminLoggedIn = localStorage.getItem('admin-token') !== null;
    const isUserLoggedIn = localStorage.getItem('user-token') !== null;

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

    const movieTitles = [];
    for (const movie of allMovie) {
        movieTitles.push(movie.title);
    }

    const [menuClicked, setmenuClicked] = useState(false);
    const [searchMovie, setSearchMovie] = useState('');
    const [suggestedMovies, setSuggestedMovies] = useState([]);

    const updateSuggestions = (input) => {
        const filteredSuggestions = allMovie.filter((movie) =>
            movie.title.toLowerCase().includes(input.toLowerCase())
        );
        setSuggestedMovies(filteredSuggestions);
    };
    
    const handleLogout = () => {
        if (isAdminLoggedIn) {
            localStorage.removeItem('admin-token');
            console.log('Logout Successfull');
        } else if (isUserLoggedIn) {
            localStorage.removeItem('user-token');
            console.log('Logout Successfull');
        }
        navigate('/');
    };

    return (
        <>
            <nav>
                <div className='logo'>
                    <NavLink to='/' className='logo-a'>
                        <img
                            src='https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-27.png'
                            alt='Logo img'
                        />
                    </NavLink>
                </div>
                <div className='inputfield'>
                    <input
                        type="search"
                        value={searchMovie}
                        placeholder="Search Movie here"
                        name='moviename'
                        onChange={(e) => {
                            setSearchMovie(e.target.value);
                            updateSuggestions(e.target.value);
                        }}
                        list='movieSuggestions'
                    />
                    <HiSearch className='search-icon' />
                </div>
                <div className='faltu'>
                    <ul className={`navbarlist ${menuClicked ? 'active' : ''}`}>
                        <li>
                            <NavLink to='/allmovies' activeClassName='active-link'>
                                All Movies
                            </NavLink>
                        </li>

                        {isAdminLoggedIn && (
                            <>
                                <li>
                                    <NavLink to='/uploadedmovie' activeClassName='active-link'>
                                        My Uploads
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/addmovie' activeClassName='active-link'>
                                        Add Movie
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isUserLoggedIn && (
                            <li>
                                <NavLink to='/bookings' activeClassName='active-link'>
                                    My Bookings
                                </NavLink>
                            </li>
                        )}

                        {isAdminLoggedIn || isUserLoggedIn ? (
                            <>
                                <li>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </li>
                                <li>
                                    <NavLink to='/profile' activeClassName='active-link'>
                                        Profile
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to='/admin' activeClassName='active-link'>
                                        Admin
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/login' activeClassName='active-link'>
                                        User
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className='mobile'>
                    {menuClicked ? (
                        <AiOutlineClose onClick={() => setmenuClicked(!menuClicked)} className='mobile-cross-icon' />
                    ) : (
                        <HiMenuAlt3 onClick={() => setmenuClicked(!menuClicked)} className='mobile-menu-icon' />
                    )}
                </div>
            </nav>

            {searchMovie && suggestedMovies.length > 0 && (
                <div className='suggestions'>
                    <ul>
                        {suggestedMovies.map((suggestedMovie) => (
                            <li key={suggestedMovie._id}>{suggestedMovie.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;
