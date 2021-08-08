import React, { useEffect, useState,useMemo } from 'react'
import SingleList from './SingleList';
import { elementKojiSeNajvisePonavlja, sortiranjeZanr } from './utils';

function Lista({
  radovi,
  setZnanstveniRadovi,
  setOdabraniRadovi,
}) {
  const [zanrovi,setZanrovi]=useState([])

  useEffect(() => {
    for (let i = 0; i < radovi.length; i++) {
      radovi[i].zanr.forEach((element) => {
        setZanrovi((prevState) => {
          return [...prevState, element];
        });
      });
    }
  }, [radovi]);
   const mostFrequent = useMemo(
     () => elementKojiSeNajvisePonavlja(zanrovi),
     [zanrovi]
   );
  console.log('zanrovi',zanrovi)
  console.log('najvise',mostFrequent)
  return (
    <div>
     {mostFrequent.maxCount>=3 && <h1>Zanr koje se najvise ponavlja : {mostFrequent.newMostFrequent}</h1>}
      {radovi.map((rad) => {
        const { datumIzdanja } = rad.datum;
        var godinaIzdanja = datumIzdanja.substr(datumIzdanja.length - 4);
        const now = new Date().getFullYear();
        const starost = now - godinaIzdanja;
        const sortiraniZanrovi = sortiranjeZanr(rad.zanr);
        return (
          <SingleList
            key={rad.id}
            rad={rad}
            starost={starost}
            zanrovi={sortiraniZanrovi}
            setZnanstveniRadovi={setZnanstveniRadovi}
            setOdabraniRadovi={setOdabraniRadovi}
            mostFrequent={mostFrequent.newMostFrequent}
          />
        );
      })}
    </div>
  );
}

export default Lista
