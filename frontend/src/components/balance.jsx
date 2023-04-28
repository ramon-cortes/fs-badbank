export default function Balance() {
  //const logStatus = useContext(ValueContext);
  //console.log(logStatus);

  function canViewBalance() {
    if (true) {
      return 'Not logged in. Login or Sign up in first to view Balance';
    } else {
      return 'Balance page';
    }
  }
  
  return (
    <div>
      {canViewBalance()}
    </div>
  );
}