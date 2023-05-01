import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ValueContext } from '../App';

// Validation (some)
function validateSignup(setError, setDisabledButton) {
  //const signupButton = document.getElementById('signup-button');  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;  
  //console.log(name, email);
  if (!name) {
    setError('Please fill name');
    setDisabledButton(true);
    //signupButton.disabled =  true;
    // ↓ Email Regex copied from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
    setError('Please enter a valid email');
    setDisabledButton(true);
    //signupButton.disabled =  true;
  } else if (password.length < 6) {
    setError('Password must be at least 6 chars long');
    setDisabledButton(true);
    //signupButton.disabled =  true;
  } else {
    setError('');
    setDisabledButton(false);
    //signupButton.disabled =  false;
  }
}

function axiosSignUp(status, setStatus, setError, LOCATION) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const admin = document.getElementById('admin').checked;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${LOCATION}/signup/${name}/${email}/${password}/${admin}`,
    headers: { }
  };
  axios.request(config)
    .then((response) => {
      //console.log(response.data.email);
      //console.log(response.data);
      if (response.data === true) {
        setStatus({...status, log: true, user: email, admin});
        document.getElementById('popup').style.display = 'block';
        setTimeout(() => {
          document.getElementById('popup').style.display = 'none';
        }, 8000);
      } else {
        setError(response.data);
      }
    })
    .catch((error) => {
      //console.log(error);
      setError(error);
      setStatus({...status, log: false});
    });  
}

function ReturnSignup({ status, setStatus, setError, error }) {
  const LOCATION = useContext(ValueContext);
  const [disabledButton, setDisabledButton] = useState(true);
  if (!status.log) {
    return (
      <div>
        Página de Signup
        <br />
        <input 
          id="name"
          onChange={() => validateSignup(setError, setDisabledButton)} 
          type="text"
          placeholder="Name"
        />
        <br />
        <input 
          id="email"
          onChange={() => validateSignup(setError, setDisabledButton)}
          type="text" 
          placeholder="Email"
        />
        <br />
        <input 
          id="password"
          onChange={() => validateSignup(setError, setDisabledButton)}
          type="password" 
          placeholder="Password"
        />
        <br />          
        Admin <input id="admin" type="checkbox"/>
        <br />
        <div className='smaller'>
          (Only Admins can view "All Data")
        </div>
        <button id='signup-button' disabled={disabledButton} onClick={() => axiosSignUp(status, setStatus, setError, LOCATION)}>Signup</button>
        <br />
        <div className='signup-error'>
          {error}
        </div>
      </div>
    );
  } else {
    return 'User: ' + status.user + ' logged in. Logout before Creating/Logging a new user';
  }
}

export default function SignUp({ status, setStatus }) {
  const [error, setError] = useState('');
  
  return <ReturnSignup status={status} setStatus={setStatus} setError={setError} error={error} />;
}

/*
export default function Login({ status, setStatus }) {
  //const logStatus = useContext(ValueContext);
  
}
*/