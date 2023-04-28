//import { useContext } from "react";
//import { ValueContext } from '../App';

export default function Withdraw() {
  //const logStatus = useContext(ValueContext);
  //console.log(logStatus);

  function canWithdraw() {
    if (true) {
      return 'Not logged in. Login or Sign up in first';
    } else {
      return 'Withdraw page';
    }
  }
  
  return (
    <div>
      {canWithdraw()}
    </div>
  );
}