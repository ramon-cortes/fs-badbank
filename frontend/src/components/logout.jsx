import axios from 'axios';
import { useEffect } from 'react';


function axiosLogout(status, setStatus) {
  const email = status.user;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3141/logout/${email}`,
    headers: { }
  };
  axios.request(config)
    .then((response) => {
      //console.log(response.data.email);
      setStatus({...status, log: false});
      return response;
    })
    .catch((error) => {
      //console.log(error);
      setStatus({...status, log: true});
      return error;
    });  
}


export default function Logout({ status, setStatus }) {
  //const response = axiosLogout(status, setStatus);

  useEffect(() => {
    const response = axiosLogout(status, setStatus);
  }, []);

  function LoggedOut() {
    if (!status.log) {
      return (
        <div>
          Logged out Successfully
        </div>
      );
    } else {
      return (
        <div>
          Error logging out:
        </div>
      );
    }
  }
  
  return <LoggedOut/>;
}