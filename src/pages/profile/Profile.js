import React, { useEffect, useState } from 'react'
import { getAdminProfile, getUserProfile } from '../../api/ApiHelper'
import { useNavigate } from 'react-router-dom'
import './profile.css'
const Profile = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem('admin-token') !== null;
  const isUserLoggedIn = localStorage.getItem('user-token') !== null;

  const [userProfile, setUserProfile] = useState();
  const [adminProfile, setAdminProfile] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isAdminLoggedIn) {
          const adminProfileData = await getAdminProfile(); // Fetch admin profile
          setAdminProfile(adminProfileData.admin);
        } else if (isUserLoggedIn) {
          const userProfileData = await getUserProfile(); // Fetch user profile
          setUserProfile(userProfileData.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [isAdminLoggedIn, isUserLoggedIn])
  // console.log(userProfile)
  // console.log(adminProfile)
  const handleLogout = () => {
    if (isAdminLoggedIn) {
      localStorage.removeItem('admin-token');
      console.log('Logout SuccessFully Admin')
      navigate('/admin')
    }
    else if (isUserLoggedIn) {
      localStorage.removeItem('user-token');
      console.log('Logout SuccessFully User')
      navigate('/login')
    }
  }
  return (
    <div className="user-profile">
      {isAdminLoggedIn && adminProfile ? (
        <>
          {/* Display admin profile */}
          <div className="user-avatar">
          <img src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`} alt={`Avatar Image`} style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="user-details">
            <h2>{adminProfile.name}</h2>
            <p>{adminProfile.email}</p>
            <p>Added Movies : {adminProfile.addmovies.length}</p>
            <div className='logout-remove'>
              <button className='profile-button' onClick={handleLogout}>Logout</button>
              <button className='profile-button'>Remove Account</button>
            </div>
          </div>
        </>
      ) : isUserLoggedIn && userProfile ? (
        <>
          {/* Display user profile */}
          <div className="user-avatar">
          <img src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`} alt={`Avatar Image`} style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="user-details">
            <h2>{userProfile.name}</h2>
            <p>{userProfile.email}</p>
            <p>Total Booking: {userProfile.bookings.length}</p>
            <div className='logout-remove'>
              <button className='profile-button' onClick={handleLogout}>Logout</button>
              <button className='profile-button'>Remove Account</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}

export default Profile