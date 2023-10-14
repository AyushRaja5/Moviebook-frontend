import React, { useEffect } from 'react'
import AuthForm from '../../components/forms/AuthForm'
import { UserLogin, UserSignUp } from '../../api/ApiHelper';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const getData = async(UserData) => {
        const {formData, signup} = UserData;
        if(!signup){
            const UserLoginData = await UserLogin(formData);
            if (UserLoginData && UserLoginData.token) {
                navigate('/') // Login successful, you can perform any necessary actions here
            }
        }
        else{
            // console.log( "SignUp ==>" ,formData.name, formData.email, formData.password);
            const UserSignUpData = await UserSignUp(formData);
            // navigate('/login')
            if(UserSignUp) navigate('/')
        }
    }

  return (
    <div>
        <AuthForm onSubmit = {getData}/>
    </div>
  )
}

export default Login