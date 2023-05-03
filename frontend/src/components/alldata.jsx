import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { ValueContext } from '../App';
import AllDataTable from './alldatatable';
import AllDataNormal from './alldatanormal';

function axiosAllData(status, setError, allData, setAllData, LOCATION) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${LOCATION}/alldata/${status.user}`,
    headers: { }
  };
  axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      // Login successful
      if (response.data.activity) {
        //console.log(JSON.stringify(response.data));
        setAllData({...response.data});        
        setError('');
      } else {
        //console.log(response.data);
        setError(response.data);
      }
    })
    .catch((error) => {
      //console.log(error);
      setError('Error getting All Data');
    });
}

export default function AllData({ status, allData, setAllData }) {
  const LOCATION = useContext(ValueContext);
  const [error, setError] = useState('');

  // Get All Data !
  useEffect(() => {
    if (status.log) {
      axiosAllData(status, setError, allData, setAllData, LOCATION);
    }
  }, []);  
  
    
  if (status.log) {
    //console.log(allData);
    if (allData) {
      const transactions = allData.allUsers.find(el => el.email === status.user);
      // Admin Data !
      if (status.admin) {
        return (
          <div>
            Admin Data
            <br />
            <div className='admin-data-grid'>
              <div className='alldata-normal'>
                <AllDataNormal allDataUser={allData.user}/>
                <AllDataTable title={'Transactions'} arr={transactions.transactions} />
              </div>
              <div className='temp-bgcolor2'>
                users
                <br />
                <AllDataTable title={'Activity'} arr={allData.activity} />
              </div>
            </div>
            <br />
            {JSON.stringify(allData)}
          </div>
        );
        // Normal user Data !
      } else {        
        //console.log(JSON.stringify(transactions.transactions));
        return (
          <div className='alldata-normal'>
            <AllDataNormal allDataUser={allData.user}/>
            <AllDataTable title={'Transactions'} arr={transactions.transactions} />
          </div>        
        );
      }    
      // Not logged in
    } else {
      return (
        <div>
          Loading All Data. Please wait
        </div>
      );
    }
  } else {
    return (
      <div>
        All Data page. Signup or Login to view Data
      </div>
    );
  }
}