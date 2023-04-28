//import { useContext } from "react";
//import { ValueContext } from '../App';

export default function Inicio({ status }) {
  //const logStatus = useContext(ValueContext);
  function test() {
    //console.log(status.log);
    if (status.log) {
      return 'Logged in';
    } else {
      return 'NOT Logged in';
    } 
  }
  return (
    <div>
      Página de Inicio
      <br />
      Log status {test()}
    </div>
  );
}