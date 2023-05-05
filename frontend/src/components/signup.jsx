import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ValueContext } from '../App';
import { Link } from 'react-router-dom';

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
        setStatus({...status, log: true, user: email, admin, balance: 100});
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
      <div className='card-wrapper'>
        <div className='carddw'>
          <div className="carddw-header">
            Signup page
          </div>
          <div className="carddw-contents2">
            <input 
              className='inputs'
              id="name"
              onChange={() => validateSignup(setError, setDisabledButton)} 
              type="text"
              placeholder="Name"
            />
            <br />
            <input 
              className='inputs'
              id="email"
              onChange={() => validateSignup(setError, setDisabledButton)}
              type="text" 
              placeholder="Email"
            />
            <br />
            <input 
              className='inputs'
              id="password"
              onChange={() => validateSignup(setError, setDisabledButton)}
              type="password" 
              placeholder="Password"
            />
            <br />          
            Admin <input className='input-checkbox' id="admin" type="checkbox"/>
            <br />
            <div className='smaller'>
              * Only Admins can view full details (including Logs !) at "All Data"
            </div>
            <button id='signup-button' disabled={disabledButton} onClick={() => axiosSignUp(status, setStatus, setError, LOCATION)}>Signup</button>
            <br />
            <div className='signup-error'>
              {error}
            </div>
          </div>
          
        </div>        
      </div>
    );
  } else {
    return (
      <div className='card-wrapper'>
        <div className='carddw'>
          <div className="carddw-header">
            Signup Page
          </div>
          <div className="carddw-contents2">
            Welcome {status.user} !
            <br />
            <br />
            <Link className='link' to='/logout'>Logout</Link> before Creating/Logging a new user
          </div>
        </div>        
      </div>
    );
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