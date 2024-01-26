"use strict";

window.addEventListener("DOMContentLoaded", start); // kalder start når alt indhold er indlæst

function start() {
  console.log("JavaScript kører");
  hideAll(); // kalder hideAll, som sætter klassen "hide" på de elementer, er indeholdt i funktionen
  askAboutName(); // kalder funktionen: fjerner "hide" og sætter en eventlistener på element med id="ask-name"
}

function hideAll() {
  document.querySelector("#ask-name").classList.add("hide"); // sætter "hide" klassen på elementet
  document.querySelector("#ask-age").classList.add("hide");// sætter "hide" klassen på elementet
  document.querySelector("#ask-birthyear").classList.add("hide");// sætter "hide" klassen på elementet
  document.querySelector("#success").classList.add("hide");// sætter "hide" klassen på elementet
  document.querySelector("#failure").classList.add("hide");// sætter "hide" klassen på elementet
}

function fillInFields(fieldname, value) { //denne funktion bruges til at tage input fra et felt(fieldname) og sætte det som værdi(value) et andet sted
  document.querySelectorAll(`[data-field=${fieldname}]`).forEach(element => (element.textContent = value)); // fx for hvert element med property
  //data-field=firstname, tildel hvert elements textContent property værdien peter (hvis funktionen er kaldt med firstname,peter)
}

function askAboutName() {
  const form = document.querySelector("#ask-name"); // definer form til det DOM-element med id=ask-name
  form.addEventListener("submit", answeredName);//sæt eventlistener på form: ved submit kald functionen answered name
  form.classList.remove("hide"); // vis form-elementet ved at fjerne "hide" (hide klassen er defineret i css og sætter elementets property til hidden)
}

function answeredName(event) {
  event.preventDefault(); // forhindrer at default action trigges fx reload 

  const form = event.target; // sætter form lig med det element som eventet stammer fra
  form.removeEventListener("submit", answeredName);// fjerner eventlistener fra form så functionen ikke kaldes gentagne gange
  form.querySelector("button").disabled = true; //disabler den første knap på form så den ikke afsendes igen

  const firstname = form.firstname.value; //gemmer værdien fra firstnamefeltet i konstanten first
  console.log("Answered name: " + firstname);//printer konstanten til konsollen, måske som tjek af at værdien er samlet op

  fillInFields("firstname", firstname);// kalder funktionen med parameterne fieldname, value

  askAboutAge(); // kalder funktion
}

function askAboutAge() {
  const form = document.querySelector("#ask-age");// definer form til det DOM-element med id=ask-age
  form.addEventListener("submit", answeredAge);//sæt eventlistener på form: ved submit kald functionen answeredAge
  form.classList.remove("hide");// vis formelementet
}

function answeredAge(event) {
  event.preventDefault(); // forhindrer at default action trigges fx reload 

  const form = event.target;// sætter form lig med det element som eventet stammer fra
  form.removeEventListener("submit", answeredAge);// fjerner eventlistener fra form så functionen ikke kaldes gentagne gange
  form.querySelector("button").disabled = true;//disabler den første knap på form så den ikke afsendes igen

  const age = form.age.valueAsNumber;// tildeler konstanten age værdien fra age feltet på formen (valueAsNumber prøver at returner en numerisk værdi fra feltet)
  console.log("Answered age: " + age); // printer kontanten til konsollen, måske som kontrol...

  fillInFields("age", age);//kalder fillInFields funktionen: feltet med data-value=age sættes får textContent sat til værdien af age-konstanten

  askAboutBirthYear(age);//kalder næste funktion med age som parameter
}

function askAboutBirthYear(age) {
  // calculate birthyear - expect that the person HASN'T had their birthday yet this year
  const birthyear = 2024 - 1 - age; // sætter konstanten birthyear til en beregnet værdi vha age-parameteren

  fillInFields("birthyear", birthyear); //feltet med data-value=birthhyear får textContent = værdien af konstanten birthyear

  const form = document.querySelector("#ask-birthyear");// sæt konstanten form= element med id=ask-birthyear
  form.addEventListener("submit", answeredBirthyear);// sæt eventlistener på form-elementet, ved submit-event kald answeredBirthyear
  form.classList.remove("hide");//vis form-elementet med id ask-birthyear
}

function answeredBirthyear(event) {
  event.preventDefault();// undertryk standard action på submit event

  const form = event.target;// sæt form lig det element som triggered eventet
  form.removeEventListener("submit", answeredBirthyear);// fjern eventlistneren 
  form.querySelector("button").disabled = true;//disable knappen

  const correct = form.correct.value; // sætter konst. correct til værdien af den valgte radiobutton
  console.log("Answered correct: " + correct);// printer til konsollen

  if (correct === "yes") { //conditional functionskald: 
    showSuccess();//kalder showSucces
  } else {
    showFailure();//kalder showFailure
  }
}

function showSuccess() {
  document.querySelector("#success").classList.remove("hide");//success-elementet vises
}

function showFailure() {
  document.querySelector("#failure").classList.remove("hide");// failure-elementet vises
}
