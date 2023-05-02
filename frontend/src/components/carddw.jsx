import { useState } from "react";

function Contents({ action, status, setStatus }) {
  const [disabledButton, setDisabledButton] = useState(true);


  function validateTransaction() {
    if (action === 'Deposit') {
      const depositAmount = Number(document.getElementById('carddw-input').value);
      const button = document.getElementById('transaction-button');
      //console.log('validating...');
      if (depositAmount > 0 && depositAmount <= 1000000) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      // validar Withdraw aquí
    }
  }

  function makeTransaction() {
    if (action === 'Deposit') {
      console.log('making deposit...');
      console.log('balance: ' + status.balance);
      const depositAmount = Number(document.getElementById('carddw-input').value);
      console.log('trying to deposit ' + depositAmount);
      let balance = status.balance + depositAmount;
      setStatus({...status, balance});
      //AQUÍ VOY
      // Actualizar Mongo cada deposit? o sólo al hacer logout?
    } else {

    }
  }
  
  if (status.log) {
    return (
      <>    
        <div className="aligh-right">
          Balance: {status.balance}
        </div>
        <div className="carddw-contents">
          <br />
          <input type="number" id="carddw-input" onChange={validateTransaction} />
          <br />
          <button id="transaction-button" disabled={disabledButton} onClick={makeTransaction}>
            {action}
          </button>
          <div className="carddw-note smaller">
            Deposits must be positive and $1,000,000 tops
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