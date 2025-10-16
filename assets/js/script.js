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

"Dopo che sono stati inseriti i 5 numeri.." :
  - bottone per implementare eventListener al click, permettendo la lettura dei valori inseriti in input

"il software dice quanti e quali dei numeri da indovinare sono stati individuati"
  - salva i valori in input in un array
  - usa include per il controllo di elementi in comune
  - se trovato un elemento comune, viene salvato in un terzo array
  - fare un .length per mostrare quanti numeri sono stati indovinati
  - mostrare i valori presenti nel terzo array
*/


// Funzione per generare numeri casuali
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Funzione che nasconde un elemento e ne mostra un altro dopo 30 secondi.
function toggleElementsAfterDelay() {
  const idToHide = document.getElementById('array-container');
  const idToShow = document.getElementById('input-container');
  const countdownEl = document.getElementById('countdown');

  let timeLeft = 30;
  countdownEl.textContent = `Tempo rimanente: ${timeLeft}s`;

  const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = `Tempo rimanente: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      idToHide.classList.add('d-none');
      idToShow.classList.remove('d-none');
    }
  }, 1000);
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

// Funzione che prende e salva le risposte date in input in un array
const userAnswers = [];

function getAnswers() {
  const inputs = document.querySelectorAll('#input-container input');
  userAnswers.length = 0;

  for (let i = 0; i < inputs.length; i++) {
    userAnswers.push(Number(inputs[i].value));
  }
}

// Funzione che confronta i valori inseriti con i valori corretti
const correctNumbers = [];
function checkAnswers(arr1, arr2) {
  let count = 0;
  for (let i=0; i<arr1.length; i++) {
    for (let j=0; j<arr2.length; j++) {
      if(arr1[i]===arr2[j]) {
        correctNumbers[count] = arr1[i];
        count++;
      }
    }
  }
}

// Dopo il click del bottone, richiamo la funzione che salva le risposte nell'array
const button = document.querySelector('button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  getAnswers();
  checkAnswers(userAnswers, randomIntegerArray);


  // Nascondo il container con gli input 
  const idToHide = document.getElementById('input-container');
  idToHide.classList.add('d-none');

  // Scrivo il messaggio da mostrare in pagina
  let output = "<p><strong>I tuoi numeri:</strong> [";
  for (let i = 0; i < userAnswers.length; i++) {
    output += userAnswers[i];
    if (i < userAnswers.length - 1) output += ", ";
  }
  output += "]</p>";

  output += "<p><strong>I numeri corretti:</strong> [";
  for (let i = 0; i < randomIntegerArray.length; i++) {
    output += randomIntegerArray[i];
    if (i < randomIntegerArray.length - 1) output += ", ";
  }
  output += "]</p>";

  output += `<p><strong>Hai indovinato:</strong> ${correctNumbers.length} numero/i</p>`;

  if (correctNumbers.length > 0) {
    output += "<p><strong>I numeri indovinati:</strong> [";
    for (let i = 0; i < correctNumbers.length; i++) {
      output += correctNumbers[i];
      if (i < correctNumbers.length - 1) output += ", ";
    }
    output += "]</p>";
  } else {
    output += "<p><em>Nessun numero indovinato!</em></p>";
  }

  // Carico il messaggio nel suo contenitore
  const results_container = document.getElementById('results-container');
  results_container.innerHTML = output;
})