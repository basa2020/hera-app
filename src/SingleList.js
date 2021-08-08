import React, { useState, useMemo, useEffect } from "react";
import "./App.css";

function SingleList({
  rad,
  starost,
  zanrovi,
  setZnanstveniRadovi,
  setOdabraniRadovi,
  mostFrequent,
}) {
  const [isSelected, setIsSelected] = useState(true);
  const [najduziZanrovi, setNajduziZanrovi] = useState([]);
  const brisanjeElemenata = (id) => {
    setZnanstveniRadovi((prevState) => {
      const newZnanstveniRadovi = prevState.filter((rad) => rad.id !== id);
      return newZnanstveniRadovi;
    });
  };
  const odaberiRad = (rad) => {
    setIsSelected(!isSelected);
    setOdabraniRadovi((prevState) => {
      const postoji = prevState.find((p) => p.id === rad.id);
      if (isSelected && !postoji) {
        return [...prevState, rad];
      } else if (!isSelected && postoji) {
        const newOdabraniRadaovi = prevState.filter((p) => p.id !== rad.id);
        return newOdabraniRadaovi;
      }
      return [...prevState];
    });
  };
  const noviniz = [];
  const duzinaZanrova = (zanrovi) => {
    if (zanrovi) {
      zanrovi.forEach((element) => {
        if (element.naziv.length > 16) {
          setNajduziZanrovi((prevState) => {
            return [...prevState, element];
          });
          noviniz.push(element);
        }
        if (element.podZanrovi?.length > 0) {
          element.podZanrovi.forEach((item) => {
            if (item.naziv.length > 16) {
              setNajduziZanrovi((prevState) => {
                return [...prevState, item];
              });

              noviniz.push(item);
            }
            duzinaZanrova(item.podZanrovi);
          });
        }
      });
    }
  };
  useEffect(() => {
    duzinaZanrova(rad.podZanrovi);
  }, [zanrovi]);

  return (
    <div
      className={isSelected ? "gray_border" : "red_border"}
      onClick={() => odaberiRad(rad)}
      style={{ padding: "5px", width: "65vw" }}
    >
      <h1>
        {rad.autor}-{rad.naziv}
      </h1>
      <h1>Starost : {starost}</h1>
      {najduziZanrovi.map((zanr) => {
        return <span>Najduzi podZanr : {zanr.naziv}</span>;
      })}
      {zanrovi.map((zanr) => (
        <p key={zanr} className={mostFrequent === zanr ? "zanr_red" : ""}>
          Zanr : {zanr}
        </p>
      ))}
      <button className="btn" onClick={() => brisanjeElemenata(rad.id)}>
        Izbrisi Element
      </button>
    </div>
  );
}

export default SingleList;
