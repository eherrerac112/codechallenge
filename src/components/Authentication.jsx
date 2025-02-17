import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Authentication.css'

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!username || !password){
      window.alert('Please submit your credencials to login');
      return;
    }

    try {
      await axios.post('https://spotify-be-b07j.onrender.com/public/login',
        {
            'username': username,
            'password': password,
        }    
      ).then(response => response.data)
        .then(data => {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('username', data.username);
          navigate('searchtrack');
          }
        )

    } catch (error) {
      if(error.response){
        const statusError = error.response.status;
        if (statusError === 500){
          window.alert('Not able to log in. Please check your username and password');
          setUsername('');
          setPassword('');
        }else{
          console.error('Login failed:', error);
        }
      }
    }
  };


  return (
    <div className='p-3 mb-2 bg-light text-dark form-container'>
      <div className='form'>
        <h2>Spotify Api Token-based Authentication</h2>
            <div className='form-questions'>
              <div className='form-question'>
                <label>
                  Username:
                  </label>
                  <input
                    type="text"
                    value={username}
                    id='username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div className='form-question'>
                <label>
                  Password:
                  </label>
                  <input
                    type="password"
                    id='password'                   
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className='form-button-container'>
                <button type='button' className='btn btn-primary col-3' onClick={handleLogin}>Login</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Authentication;