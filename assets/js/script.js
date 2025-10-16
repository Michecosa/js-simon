/* 
* Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.

Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. 
*/


/* 
* INTERPRETAZIONE DEI REQUISITI *
"5 numeri casuali" :
  - funzione Math.random (con min e max)
  - ciclo for per ripetere la funzione Math.random 5 volte
  - salvare i valori generati in un array

"timer di 30 secondi" :
  - timing function : setTimeout 

"Dopo 30 secondi i numeri scompaiono..." : (cosa effettuare al termine del timer)
  - add("d-none")  -proprietà di classList-  per il contenitore degli array visualizzati in pagina

"...e appaiono invece 5 input in cui l'utente deve inserire i numeri"
  - remove("d-none")  -proprietà di classList-  per il contenitore degli input
*/


// Funzione per generare numeri casuali
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Nasconde un elemento e ne mostra un altro dopo 30 secondi.
 * 
 * @function toggleElementsAfterDelay
 * @param {string} idToHide - L'ID dell'elemento da nascondere.
 * @param {string} idToShow - L'ID dell'elemento da mostrare.
 * @param {number} [30000] - Tempo di attesa in millisecondi (30 secondi)
*/

function toggleElementsAfterDelay() {
  setTimeout(() => {
    const idToHide = document.getElementById('array-container');
    const idToShow = document.getElementById('input-container');

    idToHide.classList.add('d-none');
    idToShow.classList.remove('d-none');
  }, 30000);
}


// Array di 5 numeri casuali da 1 a 50 (estremi inclusi)
const randomIntegerArray = [];
for(let i = 0; i < 5; i++) {
  randomIntegerArray[i] = getRndInteger(1,50);
}

// Salva array in una stringa per miglior gestione del formato visualizzato (separo dal for precedente solo per dare ordine al codice)
let randomIntegerArraySting = "";
for (let i = 0; i < 5; i++) {
  randomIntegerArraySting += `${randomIntegerArray[i]}`;
  if (i != 4) {
    randomIntegerArraySting += " , ";
  } else {
    randomIntegerArraySting += " "
  }
}

// Mostra l'array in pagina
const array_visualizer = document.getElementById('array-visualizer');
array_visualizer.innerText = randomIntegerArraySting;


// Avvia il timer che, dopo 30 secondi, nasconde un elemento e mostra l'altro
toggleElementsAfterDelay();