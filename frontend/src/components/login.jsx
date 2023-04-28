import axios from 'axios';
import { useState } from 'react';

function axiosLogin(status, setStatus, setError) {  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3141/login/${email}/${password}`,
    headers: { }
  };
  axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      // Login successful
      if (response.data.email) {
        //console.log(JSON.stringify(response));
        setStatus({log: true, user: response.data.email, admin: response.data.admin, balance: response.data.balance});
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        setError('');
      } else {
        //console.log(response.data);
        setError(response.data);
      }
    })
    .catch((error) => {
      //console.log(error);
      setStatus({...status, log: false});
    });  
}

function LoginOrLogout({ status, setStatus }) {
  const [error, setError] = useState('');
  if (!status.log) {
    return (
      <div>
        Página de Login
        <br />
        <input id="email" type="text" placeholder="Email"/>
        <br />
        <input id="password" type="password" placeholder="Password"/>
        <br />
        <button onClick={() => axiosLogin(status, setStatus, setError)}>Login</button>
        <br />
        <div className='signup-error'>
          {error}
        </div>
      </div>
    );
  } else {
    return 'Welcome: ' + status.user;
  }
}

export default function Login({ status, setStatus }) {
  //const logStatus = useContext(ValueContext);  
  
  return (
    <>
     <LoginOrLogout status={status} setStatus={setStatus} />
    </>
  );
}