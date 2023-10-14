import React, { useState } from 'react'
import './addmovie.css'
import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import { addMovie } from '../../api/ApiHelper';
const Addmovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    poster: '',
    featured: false, // Boolean variable for the checkbox
  });
  const [actor, setActor] = useState('')
  const [allActors, setAllActors] = useState([])
  const handleInputChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  };

  const handleActorChange = (event) => {
    setActor(event.target.value);
  };

  const handleAddActor = () => {
    if (actor.trim() === '') return; // Prevent adding empty actor

  if (!allActors.includes(actor)) {
    setAllActors((prevActors) => [...prevActors, actor]);
    setActor(''); // Clear the text field
  }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addMovie({...formData, allActors}).then((res)=>{
      console.log(res);
      setAllActors([]);
      setActor('');
      setFormData({
        title: '',
        description: '',
        releaseDate: '',
        poster: '',
        featured: false,
      });
    }).catch((error)=>console.log(error))

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box width={'60%'} padding={5} margin='auto' display={'flex'} flexDirection={'column'}
          boxShadow={'-10px 20px 20px #ccc'}>
          <Typography textAlign={'center'} variant='h5' fontFamily={'verdana'} marginBottom={3} fontWeight={600} color={'#2b2d42'}>Add Movie</Typography>

          <TextField variant='outlined' margin='normal' label="Movie Title" type={'text'} name='title' sx={{ marginTop: '0', marginBottom: '16px' }}
            value={formData.title}
            onChange={handleInputChange} />

          <TextField variant='outlined' margin='normal' label="Movie Description" type={'text'} name='description' sx={{ marginTop: '0', marginBottom: '16px' }}
            value={formData.description}
            onChange={handleInputChange} />

          <TextField variant='outlined' margin='normal' label="Release Date" type={'date'} name='releaseDate' sx={{ marginTop: '0', marginBottom: '16px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.releaseDate}
            onChange={handleInputChange} />

          <TextField variant='outlined' margin='normal' label="Poster URL" type={'text'} name='poster' sx={{ marginTop: '0', marginBottom: '16px' }}
            value={formData.poster}
            onChange={handleInputChange} />

          <FormLabel sx={{ display: 'flex', marginLeft: '2%' }}>Actors</FormLabel>

          <Box>
            <Box display={'flex'}>
                {allActors.map((actor, index) => (
                  <li key={index}  className='actorclass'>{actor}</li>
                ))}
            </Box>
            <TextField onChange={handleActorChange}
              variant='standard' margin='normal' value={actor} type={'text'} name='actor' sx={{ margin: '0' }} />
            <Button onClick={()=>{handleAddActor()}}>Add Actor</Button>
          </Box>

          <Box display={'flex'} alignItems={'center'}>
            <Checkbox sx={{ mr: 'auto', marginRight: '5px' }}
              checked={formData.featured}
              onClick={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              name="featured" // Make sure to specify the name
            /><FormLabel>Featured</FormLabel>
          </Box>

          <Box display='flex' justifyContent='center'>
            <Button variant='contained' type='submit'
              sx={{ width: '60%', bgcolor: '#2b2d42', ':hover': { bgcolor: 'rgb(26, 254, 26)' } }} >
              Add Movie</Button>
          </Box>
        </Box>
      </form>
    </div >
  )
}

export default Addmovie