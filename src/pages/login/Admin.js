import React from 'react'
import AuthForm from '../../components/forms/AuthForm'
import {useNavigate} from 'react-router-dom'
import { AdminLogin, AdminSignUp } from '../../api/ApiHelper';

const Admin = () => {
  const navigate = useNavigate();
  const getData = async(AdminData) => {
    const {formData, signup} = AdminData;
    console.log( "Admin Data",AdminData)
    if(!signup){
      const AdminLoginData = await AdminLogin(formData);
      if (AdminLoginData && AdminLoginData.token) {
          navigate('/') // Login successful, you can perform any necessary actions here
      }
    }
    else{
      const AdminSignUpData = await AdminSignUp(formData);
      // navigate('/login')
      if(AdminSignUp) navigate('/')
    }
  }
  return (
    <div>
      <AuthForm onSubmit={getData}/>
    </div>
  )
}

export default Admin