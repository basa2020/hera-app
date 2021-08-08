export const differentialOfArrays = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].id === arr2[j].id) {
        arr1.splice(i, 1);
      }
    }
  }
  return arr1;
};

export const averageYears = (arr1) => {
  var prosjek = 0;
  for (let i = 0; i < arr1.length; i++) {
    const { datumIzdanja } = arr1[i].datum;
    var godinaIzdanja = datumIzdanja.substr(datumIzdanja.length - 4);
    const now = new Date().getFullYear();
    const starost = now - Number(godinaIzdanja);
    prosjek = prosjek + starost;
  }
  return prosjek / arr1.length;
};

export const sortiranePoStarosti = (arr) => {
  let promjena = true;
  while (promjena) {
    promjena=false
    for (let i = 0; i < arr.length; i++) {
      const datum = arr[i].datum.datumIzdanja;
      const datum2 = arr[i+1]?.datum.datumIzdanja;
      var godinaIzdanja = datum.substr(datum.length - 4);
      var godinaIzdanja2 = datum2?.substr(datum2.length - 4);
      if (godinaIzdanja < godinaIzdanja2) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        promjena=true
      }
    }
  }
  return arr;
};

export const sortiranjeZanr=(arr)=>{
return arr.sort()
}

export const elementKojiSeNajvisePonavlja=(arr)=>{
   let counts = arr.reduce((a, c) => {
     a[c] = (a[c] || 0) + 1;
     return a;
   }, {});
   let maxCount = Math.max(...Object.values(counts));
   let mostFrequent = Object.keys(counts).filter((k) => counts[k] === maxCount);
   const newMostFrequent=mostFrequent[0]
   return { newMostFrequent, maxCount };
}
