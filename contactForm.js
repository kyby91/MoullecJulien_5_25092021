//DOM
const first = document.getElementById("first")
const last = document.getElementById("last")
const email = document.getElementById("email")
const message = document.getElementById("message")
const validateBtn = document.getElementsByClassName("contact_button")
const validation = document.getElementById('validation')

validation.style.display = "none"

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}






// first, champ prénom
function checkFirstElementValue() {
  let regexp = /^[a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?/
  if(!regexp.test(first.value)) {
    firstError.textContent = "Veuillez entrer 2 caractères minimum";
    firstError.style.color = "red";
    first.style.borderColor = "red";
    firstError.style.fontSize = "20px";
    firstError.style.display = "block";
    inputState.first = false;
    } else {
      firstError.style.display = "none";
      first.style.borderColor = "black";
      inputState.first = true;
    }
}

// last, champ nom
function checkLastElementValue() {
  let regexp = /^[a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?/
  if(!regexp.test(last.value)) {
    lastError.textContent = "Veuillez entrer 2 caractères minimum";
    lastError.style.color = "red";
    last.style.borderColor = "red";
    lastError.style.fontSize = "20px";
    lastError.style.display = "block";
    inputState.last = false;
    } else {
      lastError.style.display = "none";
      last.style.borderColor = "black";
      inputState.last = true;
    }
}


// email
function checkEmail() {
  let regexp = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/
  if(regexp.test(email.value)){
    emailError.style.display = "none";
    email.style.borderColor = "black";
    inputState.mail = true;
  } else {
    emailError.textContent = "L'adresse mail n'est pas valide";
    emailError.style.color = "red";
    email.style.borderColor = "red";
    emailError.style.fontSize = "20px";
    emailError.style.display = "block";
    inputState.mail = false;
  }
}

let inputState = { 
  first : false,
  last : false,
  mail: false,
}

//fonction regroupant tout les champs pour valider ou non
function checkGlobalValidation() {
  // e.preventDefault()
  checkFirstElementValue()
  checkLastElementValue()
  checkEmail()
  //vérifie que toute les propriétés de l'objet soit vraie
  const hasUnvalidProperty = Object.keys(inputState).find(key => inputState[key] === false);
  // si une ou plusieurs fausse la validation n'est pas posiible
  if(hasUnvalidProperty) {
    // e.preventDefault()
    
    // si toute vraie alors disparition des champs et apparition du text et du bouton
  } else {
    // e.preventDefault()
    document.querySelector("#modal-form").style.display = "none";
    closeModal();
    validation.style.display = "block"
    console.log("Prénom : "+ first.value)
    console.log("Nom : "+ last.value)
    console.log("E-mail : "+ email.value)
    console.log("Message : "+ message.value)
  }
  return false;
}