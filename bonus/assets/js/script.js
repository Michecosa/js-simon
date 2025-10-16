/* 
* BONUS:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.
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

  let timeLeft = 3;
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

// Array di 5 numeri casuali da 1 a 99 (estremi inclusi)
const randomIntegerArray = [];
for(let i = 0; i < 5; i++) {
  randomIntegerArray[i] = getRndInteger(1,99);
}

// Salva array in una stringa per miglior gestione del formato visualizzato
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

// Funzione di validazione degli input
function validateInputs() {
  const inputs = document.querySelectorAll('#input-container input');
  const errorMessage = document.getElementById('error-message');
  let isValid = true;
  const values = [];
  
  // Reset degli stili di errore (usando classi Bootstrap)
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
    input.classList.remove('border-danger');
    input.classList.remove('bg-danger-subtle');
  });
  errorMessage.classList.add('d-none');
  errorMessage.textContent = '';

  // Controlla ogni input
  for (let i = 0; i < inputs.length; i++) {
    const value = inputs[i].value.trim();
    
    // Verifica che il campo non sia vuoto
    if (value === '') {
      inputs[i].classList.add('is-invalid', 'border-danger', 'bg-danger-subtle');
      errorMessage.textContent = 'Tutti i campi devono essere compilati!';
      errorMessage.classList.remove('d-none');
      isValid = false;
      continue;
    }

    // Verifica che sia un numero valido
    if (isNaN(value) || !Number.isInteger(Number(value))) {
      inputs[i].classList.add('is-invalid', 'border-danger', 'bg-danger-subtle');
      errorMessage.textContent = 'Inserisci solo numeri interi!';
      errorMessage.classList.remove('d-none');
      isValid = false;
      continue;
    }
    
    const numValue = Number(value);

    
    // Verifica che sia nel range corretto (1-99)
    if (numValue < 1 || numValue > 99) {
      inputs[i].classList.add('is-invalid', 'border-danger', 'bg-danger-subtle');
      errorMessage.textContent = 'I numeri devono essere compresi tra 1 e 99!';
      errorMessage.classList.remove('d-none');
      isValid = false;
      continue;
    }

    values.push(numValue);
  }
  
  return isValid;
}

// Funzione che confronta i valori inseriti con i valori corretti
const correctNumbers = [];
function checkAnswers(arr1, arr2) {
  correctNumbers.length = 0;
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

// Dopo il click del bottone, valida e processa le risposte
const button = document.querySelector('button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  
  // Valida gli input prima di procedere
  if (!validateInputs()) {
    return; // Blocca l'esecuzione se la validazione fallisce
  }
  
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
});