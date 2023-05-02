import CardDW from "./carddw";

export default function Deposit({ status, setStatus }) {
  return (
    <>
      <CardDW action='Deposit' status={status} setStatus={setStatus} />
    </>
  );
  /*if (status.log) {
    return (
      <>
        <CardDW action='deposit' />
      </>
    );
    
  } else {
    return (
      <div>
        Login or Signup before making Deposits
      </div>
    );
  }*/
  
}