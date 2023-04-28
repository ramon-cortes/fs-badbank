import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/navbar';
import Inicio from './components/inicio';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';
import AllData from './components/alldata';
import SignUpSuc from './components/signupsuc';

function App() {
  const [status, setStatus] = useState({
    log: false, 
    user: '',
    admin: false,
    balance: 0
  });


  // Checking if user is already signed in
  /*useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3141/alreadyloggedin`,
      headers: { }
    };
    axios.request(config)
      .then((response) => {
        //console.log(response.data.email);
        if (response.data.email) {
          //console.log('already logged in = true');
          //console.log(response.data.user);
          setStatus({...status, log: true, user: response.data.email});
        } else {
          //console.log('already logged in = false');
        }
      })
      .catch((error) => {
        //console.log(error);
        //setStatus({...status, log: false});
    });
  }, []);
  */

  /*return (
    <div>
      starting app
    </div>    
  );*/
  return (
    <BrowserRouter>
      Mi prueba: 
      <NavBar status={status} setStatus={setStatus}/>
      <Routes>
        <Route path='/' exact element={<Inicio status={status}/>} />
        <Route path='/signup' element={<SignUp status={status} setStatus={setStatus}/>} />
        <Route path='/login' element={<Login status={status} setStatus={setStatus}/>} />
        <Route path='/logout' element={<Logout status={status} setStatus={setStatus}/>} />
        <Route path='/deposit' element={<Deposit/>} />
        <Route path='/withdraw' element={<Withdraw/>} />
        <Route path='/balance' element={<Balance/>} />
        <Route path='/alldata' element={<AllData/>} />
      </Routes>
      <SignUpSuc status={status}/>
    </BrowserRouter>
  );
}

export default App;
