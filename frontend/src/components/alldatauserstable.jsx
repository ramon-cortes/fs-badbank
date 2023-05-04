export default function AllDataUsersTable({ arr }) {
  function MiTabla() {
    // Headers
    const arrHeaders = ['name', 'email', 'level', 'balance'];
    const headers = arrHeaders.map((e, i) => {
      return (
        <th key={i}>{e}</th>
      );
    });
    // Rows
    let arregloH = [];
    for (let i = 0; i < arr.length; i++) {
      let arregloD = [];
      let level = '';
      arr[i].admin === true ? level = 'admin' : level = 'user';
      arregloD.push(arr[i].name, arr[i].email, level, arr[i].balance);
      arregloH.push(arregloD);
    }
    //console.log(JSON.stringify(arregloH));
    const rows = arregloH.map((e, i) => {
      const definitions = e.map((ee, ii) => {
        return (
          <td key={ii}>{ee}</td>
        );
      });
      return (
        <tr key={i}>{definitions}</tr>
      );
    });     
    return (
      <table>
        <thead><tr>{headers}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  return (
    <div>
      All Users &nbsp;
      <span className="smaller">
        (passwords not displayed, but exist in the DB)
      </span> 
      <br />
      <MiTabla/>
    </div>
  );
}