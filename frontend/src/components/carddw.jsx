import axios from 'axios';
import { useState, useContext } from "react";
import { ValueContext } from '../App';

function axiosTransaction(amount, status, setStatus, setError, LOCATION) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${LOCATION}/transaction/${status.user}/${amount}`,
    headers: { }
  };
  axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      // Login successful
      if (response.data.email) {
        //console.log(JSON.stringify(response));
        setStatus({...status, balance: response.data.balance});
        setError('');
      } else {
        //console.log(response.data);
        setError(response.data);
      }
    })
    .catch((error) => {
      //console.log(error);
      setError('Error making Transaction');
    });
}

function Contents({ action, status, setStatus }) {
  const LOCATION = useContext(ValueContext);
  const [error, setError] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);


  function validateTransaction() {
    const transactionAmount = Number(document.getElementById('carddw-input').value);
    //const button = document.getElementById('transaction-button');
    if (action === 'Deposit') {      
      //console.log('validating...');
      if (transactionAmount > 0 && transactionAmount <= 1000000) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      if (transactionAmount > 0 && transactionAmount <= status.balance) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    }
  }

  function makeTransaction() {
    const transactionAmount = Number(document.getElementById('carddw-input').value);
    let balance = 0;
    if (action === 'Deposit') {
      //balance = status.balance + transactionAmount;
      axiosTransaction(transactionAmount, status, setStatus, setError, LOCATION);
    } else {
      //balance = status.balance - transactionAmount;
      axiosTransaction(-transactionAmount, status, setStatus, setError, LOCATION);
    }
    
  }
  
  if (status.log) {
    return (
      <>    
        <div className="aligh-right">
          Balance: {status.balance}
        </div>
        <div className="carddw-contentsdw">
          <br />
          <input type="number" id="carddw-input" onChange={validateTransaction} />
          <br />
          <button id="transaction-button" disabled={disabledButton} onClick={makeTransaction}>
            {action}
          </button>
          <div className="carddw-note smaller">
            <ul>
              <li>Deposits must be positive and $1,000,000 tops</li>
              <li>Withdraws must be positive</li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="carddw-contents">
        Signup or Login before making {action}s
      </div>
    )
  }
  
}

export default function CardDW({ action, status, setStatus }) {
  return (
    <div className="carddw">
      <div className="carddw-header">
        {action} page
      </div>
      <Contents action={action} status={status} setStatus={setStatus} />      
    </div>
  );
}