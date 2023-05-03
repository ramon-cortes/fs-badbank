export default function AllDataNormal({ allDataUser }) {
  function UserInfo() {
    let arr = new Array();
    for (const [key, value] of Object.entries(allDataUser)) {
      //console.log(`${key}: ${value}`);
      if (key === 'admin' && value === true) {
        arr.push(`user level: admin`);
      } else if (key === 'admin' && value === false) {
        arr.push(`user level: normal user`);  
      } else {
        arr.push(`${key}: ${value}`);
      }      
    }
    const items = arr.map((el, i) => {
      return (
        <li key={i}>{el}</li>
      )
    });
    return (
      <ul className="smaller">{items}</ul>
    );
  }
  return (
    <UserInfo/>
  );
}