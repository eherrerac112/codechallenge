import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Track.css'

const CreateTrack = () => {

    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();

    const createTrack = async (e) => {
        e.preventDefault();

        if(!isrc){
          window.alert('Please submit an ISRC');
          return;
        }    

        console.log('Creating the track for ' + isrc);

        const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
        };

        const bodyParameters = {
          key: "value"
       };

        try {
        await axios.post('https://spotify-be-b07j.onrender.com/spotify/track?isrc=' + isrc, bodyParameters, config
        ).then(response => response.data)
            .then(data => {
              document.getElementById('trackName').value = data.name;
              document.getElementById('artistName').value = data.artistName;
              document.getElementById('albumName').value = data.albumName;
              document.getElementById('contentIndicator').value = data.explicitContentIndicator;
              document.getElementById('playbackSeconds').value = data.playbackSeconds;
              document.getElementById('trackImg').src = data.images[0].url;
              window.alert('Track added to the system');
          }
          )

        } catch (error) {
          if(error.response){
            const statusError = error.response.status;
            if (statusError === 409){
              window.alert(error.response.data.message);
              setIsrc('');
              document.getElementById('trackName').value = '';
              document.getElementById('artistName').value = '';
              document.getElementById('albumName').value = '';
              document.getElementById('contentIndicator').value = '';
              document.getElementById('playbackSeconds').value = '';
              document.getElementById('trackImg').src = '';
            }else if(statusError === 401){
              window.alert(error.response.data.message);
              navigate('/');
            }else if(statusError === 500){
              window.alert('Internal Server Error, please try another ISRC');
              setIsrc('');
            }
            else if(statusError === 404){
              window.alert(error.response.data.message);
              setIsrc('');
            }
            else {
              console.error('Login failed:', error);
            }
          }
        }
    };

    return (
          <Container className='p-3 mb-2 bg-light text-dark form-container'>
          <div className='form-nav'>
              <Button onClick={() => navigate('/createtrack')}>Metadata Creation</Button>
              <Button onClick={() => navigate('/searchtrack')}>Metadata Search</Button>
            </div>
           <div className='iscrform'>
              <p>Welcome {localStorage.getItem('username')}</p>
              <h1>Submit track by ISCR</h1>
              <InputGroup className='mb-3' size='lg'>
                <FormControl
                  placeholder='Search ISRC'
                  type='input'
                  onKeyDown={event => {
                    if (event.key === 'Enter'){
                      createTrack();
                    }
                  }}
                  onChange={event => setIsrc(event.target.value)}
                  value={isrc}
                  />
              </InputGroup>
                <Button onClick={createTrack} className='form-submit'>Search</Button>
                <div className='form-question'><label>Track Name:</label><input id='trackName'></input></div>
                <div className='form-question'><label>Artist Name:</label><input id='artistName'></input></div>
                <div className='form-question'><label>Album Name:</label><input id='albumName'></input></div>
                <div className='form-question'><label>Content Indicator:</label><input id='contentIndicator'></input></div>
                <div className='form-question'><label>Playback Seconds:</label><input id='playbackSeconds'></input></div>
                <Card className='form-img-container'>
                  <Card.Img id='trackImg' src='#'/>
                </Card>
            </div>
          </Container>
    );
}

export default CreateTrack;