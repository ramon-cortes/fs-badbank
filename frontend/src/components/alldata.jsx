import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { ValueContext } from '../App';
import AllDataTable from './alldatatable';
import AllDataNormal from './alldatanormal';
import AllDataUsersTable from './alldatauserstable';

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
      //console.log(status.user);
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
            <div className='admin-data-grid'>
              <div className='alldata-normal'>
                <AllDataNormal allDataUser={allData.user}/>
                <AllDataTable title={'Transactions'} arr={transactions.transactions} />
              </div>
              <div className='alldata-admin'>
                <AllDataUsersTable arr={allData.allUsers}/>
                <br />
                <AllDataTable title={'Activity'} arr={allData.activity} />
              </div>
            </div>
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
        <div className='card-wrapper'>
          <div className='carddw'>
            <div className="carddw-header">
              All Data Page
            </div>
            <div className="carddw-contents2">
              Loading Data, please wait
            </div>
          </div>        
        </div>
      );
    }
  } else {
    return (
      <div className='card-wrapper'>
        <div className='carddw'>
          <div className="carddw-header">
            All Data Page
          </div>
          <div className="carddw-contents2">
            Signup or Login to view Data
          </div>
        </div>        
      </div>
    );
  }
}