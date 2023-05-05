import axios from 'axios';
import { useEffect, useContext } from 'react';
import { ValueContext } from '../App';

function axiosLogout(status, setStatus, LOCATION) {
  const email = status.user;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${LOCATION}/logout/${email}`,
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
  const LOCATION = useContext(ValueContext);
  //const response = axiosLogout(status, setStatus);

  useEffect(() => {
    if (status.log) {
      const response = axiosLogout(status, setStatus, LOCATION);
    }
  }, []);

  function LoggedOut() {
    if (!status.log) {
      return (
      <div className='card-wrapper'>
        <div className='carddw'>
          <div className="carddw-header">
            Logout Page
          </div>
          <div className="carddw-contents2">
            Logged out Successfuly
          </div>
        </div>        
      </div>
    );
    } else {
      return (
        <div>
          Error logging out:
          <br />
          known bug... I mean, it's the first time it happens
        </div>
      );
    }
  }
  
  return <LoggedOut/>;
}