// Textes qui s'écrivent en jaune

var messages = [
    "communautaire.",
    "chill."
];

var messageContainer = document.getElementById("message");
var cursor = document.getElementById("cursor");

let currentMessage = 0;
let currentLetter = 0;

function typeMessage() {
    if (currentLetter < messages[currentMessage].length) {
        messageContainer.innerHTML += messages[currentMessage].charAt(currentLetter);
        currentLetter++;
        setTimeout(typeMessage, 50);
    } else {
        setTimeout(eraseMessage, 2000);
    }
}

function eraseMessage() {
    if (currentLetter >= 0) {
        messageContainer.innerHTML = messages[currentMessage].substring(0, currentLetter);
        currentLetter--;
        setTimeout(eraseMessage, 30);
    } else {
        currentMessage++;
        if (currentMessage >= messages.length) {
            currentMessage = 0;
        }
        setTimeout(typeMessage, 500);
    }
}

typeMessage();

// Textes qui apparaissent du haut pour repartir vers le bas

var textes = [
"Amusez-vous !",
"Venez discuter !"
];
var tempsAffichage = 2000;
var tempsAnimation = 1000;
var indexTexte = 0;
var divTexte = document.getElementById("divTexte");

function afficherTexte() {
var texte = textes[indexTexte];
var divTexteAnim = document.createElement("div");
divTexteAnim.innerHTML = texte;
divTexteAnim.style.position = "absolute";
divTexteAnim.style.top = "-100%";
divTexteAnim.style.transition = "top " + tempsAnimation + "ms";
divTexte.appendChild(divTexteAnim);
setTimeout(function() {
    divTexteAnim.style.top = "0";
}, 50);
setTimeout(function() {
    divTexteAnim.style.top = "100%";
    setTimeout(function() {
    divTexte.removeChild(divTexteAnim);
    indexTexte = (indexTexte + 1) % textes.length;
    setTimeout(afficherTexte, tempsAnimation);
    }, tempsAnimation);
}, tempsAffichage);
}

setTimeout(afficherTexte, 250);