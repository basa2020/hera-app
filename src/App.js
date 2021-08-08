import React, { useEffect, useState ,useMemo} from "react";
import axios from "axios";
import "./App.css";
import {
  averageYears,
  differentialOfArrays,
  sortiranePoStarosti,
} from "./utils";
import Lista from "./Lista";

function App() {
  const [znastveniRadovi, setZnanstveniRadovi] = useState([]);
  const [znanstveniRadoviProvjera,setZnanstventiRadoviProvjera]=useState([])
  const [prosjekGodina, setProsjekGodina] = useState(null);
  const [odabraniRadovi,setOdabraniRadovi]=useState([])
  useEffect(() => {
    const requestOne = axios.get(
      "https://mocki.io/v1/53083792-ee35-4ec5-bebb-44e802bd62a0"
    );
    const requestTwo = axios.get(
      "https://mocki.io/v1/45d27447-2b84-4355-bc89-7758b6498d78"
    );
  axios.all([requestOne, requestTwo]).then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      setZnanstventiRadoviProvjera(responseTwo.data)
         const newZnanstveniRadovi = sortiranePoStarosti(
           differentialOfArrays(responseOne.data, responseTwo.data)
         );
         setZnanstveniRadovi(newZnanstveniRadovi);
    })
  );
  }, []);
  useEffect(() => {
    const prosjek = averageYears(znastveniRadovi);
    setProsjekGodina(prosjek.toFixed(2));
  }, [znastveniRadovi]);

const obrisiOdabrane=()=>{
  setZnanstveniRadovi(prevState=>{
  const newRadovi = prevState.filter((rad) => !odabraniRadovi.includes(rad));

    return newRadovi
  })
}
  const isDisabled = useMemo(
    () => (odabraniRadovi.length === 1 ? false : true),
    [odabraniRadovi]
  );
const moveUp = () => {
  setZnanstveniRadovi((prevState) => {
    const newRadovi = [...prevState];
    const pozicija = newRadovi.indexOf(odabraniRadovi[0]);
    if(pozicija===newRadovi.length-1){
      let temp = newRadovi[pozicija];
      newRadovi[pozicija] = newRadovi[0];
      newRadovi[0] = temp;
    }else{
       let temp = newRadovi[pozicija];
       newRadovi[pozicija] = newRadovi[pozicija+1];
       newRadovi[pozicija+1] = temp;
    }
    return newRadovi
  });
};
const moveDown = () => {
  setZnanstveniRadovi((prevState) => {
    const newRadovi = [...prevState];
    const pozicija = newRadovi.indexOf(odabraniRadovi[0]);
    if (pozicija === 0) {
      let temp = newRadovi[pozicija];
      newRadovi[pozicija] = newRadovi[newRadovi.length-1];
      newRadovi[newRadovi.length-1] = temp;
    } else {
      let temp = newRadovi[pozicija];
      newRadovi[pozicija] = newRadovi[pozicija - 1];
      newRadovi[pozicija -1] = temp;
    }
    return newRadovi;
  });
};
  return (
    <div className="App">
      <h1>Znanstveni Radovi</h1>
      <p>Prosjecna starost radova : {prosjekGodina}</p>
      <button className="btn" onClick={() => obrisiOdabrane()}>Obrisi odabrane radove</button>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px",marginBottom:'5px' }}
      >
        <button className="btn" style={{marginRight:'10px'}} disabled={isDisabled} onClick={()=>moveUp()}>Move up +</button>
        <button className="btn" disabled={isDisabled} onClick={()=>moveDown()}>Move down -</button>
      </div>
      <Lista
        radovi={znastveniRadovi}
        setZnanstveniRadovi={setZnanstveniRadovi}
        setOdabraniRadovi={setOdabraniRadovi}
      />
    </div>
  );
}

export default App;
