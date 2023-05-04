import './App.css';
import { useState, useEffect, createContext  } from 'react';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/navbar';
import Inicio from './components/inicio';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import AllData from './components/alldata';
import SignUpSuc from './components/signupsuc';

export const ValueContext = createContext(null);
let LOCATION = '';
if (process.env.NODE_ENV === "production") {
  LOCATION = 'http://ramon-cortesfullstackbankingap.herokuapp.com';
} else {
  LOCATION = 'http://localhost:3141';
}

function App() {
  const [status, setStatus] = useState({
    log: false, 
    user: '',
    admin: false,
    balance: 0
  });
  const [allData, setAllData] = useState(false);

  // Checking if user is already signed in
  useEffect(() => {
    //http://ramon-cortesfullstackbankingap.herokuapp.com
    //http://localhost:3141
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LOCATION}/alreadyloggedin`,
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
  

  /*return (
    <div>
      starting app
    </div>    
  );*/
  return (
    <BrowserRouter>
    <ValueContext.Provider value={LOCATION} >
      <NavBar status={status} setStatus={setStatus}/>
      <Routes>
        <Route path='/' exact element={<Inicio status={status}/>} />
        <Route path='/signup' element={<SignUp status={status} setStatus={setStatus}/>} />
        <Route path='/login' element={<Login status={status} setStatus={setStatus}/>} />
        <Route path='/logout' element={<Logout status={status} setStatus={setStatus}/>} />
        <Route path='/deposit' element={<Deposit status={status} setStatus={setStatus}/>} />
        <Route path='/withdraw' element={<Withdraw status={status} setStatus={setStatus}/>} />
        <Route path='/alldata' element={<AllData status={status} allData={allData} setAllData={setAllData} />} />
      </Routes>
      <SignUpSuc status={status}/>
    </ValueContext.Provider>
    </BrowserRouter>
  );
}

export default App;
