import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
const labelStyle = { mt: 1 }
const AuthForm = ({onSubmit}) => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await onSubmit({ formData, signup: isSignUp });
        setIsSignUp(!isSignUp)
    }
    
    return (
        <Dialog PaperProps={{style: {borderRadius:15}}} open={true}>
            <Box sx={{ml:'auto', padding: 1}}><IconButton onClick={()=>navigate('/')}><AiOutlineCloseCircle/></IconButton></Box>
            <Typography variant='h4' textAlign={'center'}>{isSignUp ? "Sign Up" : "Login"}</Typography>
            <form onSubmit={handleSubmit}>
                <Box display={'flex'} justifyContent={'center'} flexDirection="column" width={400}
                    padding={5} paddingTop={0} paddingBottom={2} margin="auto" alignContent={'center'}>

                    {isSignUp && <><FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField variant='standard' margin='normal' type={'text'} name='name'
                     onChange={handleChange} // Add onChange event
                     value={formData.name} // Set input value
                     autoComplete='on'
                    /> </>}

                    <FormLabel sx={labelStyle}>Email</FormLabel>
                    <TextField variant='standard' margin='normal' type={'email'} name='email'
                      onChange={handleChange} // Add onChange event
                      value={formData.email} // Set input value
                      autoComplete='on'
                    />
                    <FormLabel sx={labelStyle}>Password</FormLabel>
                    <TextField variant='standard' margin='normal' type={'password'} name='password' 
                     onChange={handleChange} // Add onChange event
                     value={formData.password} // Set input value
                     autoComplete='on'
                    />
                    <Button type='submit' sx={{ mt: 2, borderRadius: 10, bgcolor: '#2b2d42' }} variant='contained' fullWidth>{isSignUp? "Sign Up" :"Login"}</Button>
                    
                    <Button sx={{ mt: 2, borderRadius: 10,}} fullWidth onClick={()=>setIsSignUp(!isSignUp)}>
                        {isSignUp? "Login here" : "Sign Up"}  Here!</Button>
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm