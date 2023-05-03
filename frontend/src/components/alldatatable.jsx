export default function AllDataTable({ title, arr }) {
  function MiTabla() {
    let arregloH = new Array();
    let arregloD = new Array();
    
    for (const [key, value] of Object.entries(arr[0])) {
      //console.log(`${key}: ${value}`);
      arregloH.push(key);
    }
    const headers = arregloH.map((e, i) => {
      return (
        <th key={i}>{e}</th>
      );
    });
    
    // convert object into array (of arrays)
    for (let i = 0; i < arr.length; i++) {
      let arregloIntermedio = new Array();
      for (const [key, value] of Object.entries(arr[i])) {
        //console.log(`${key}: ${value}`);
        arregloIntermedio.push(value);
      }
      arregloD.push(arregloIntermedio);
    }
    //console.log(JSON.stringify(arregloD));
    // get table definitions
    const rows = arregloD.map((e, i) => {
      const definitions = e.map((el, ii) => {
        let element = '';        
        if (el === true) {
          element = 'deposit'
        } else if (el === false) {
          element = 'withdraw'
        } else {
          element = el;
        }
        return (
          <td key={ii}>
            {element}
          </td>
        );
      });
      return (
        <tr key={i}>
          {definitions}
        </tr>
      );
    });

    /*const rows = arregloD.map((e, i) => {
      return (
        <tr>

        </tr>
      ),
    });*/
      
    /*const definitions = arr.map((e, i) => {
      return (
        <td key={i}>{e}</td>
      );
    });
    <tbody>trs
    */
    return (
      <table>
        <thead><tr>{headers}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  return (
    <div>
      {title}
      <br />
      <MiTabla/>
    </div>
  );
}