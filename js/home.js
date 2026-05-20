// ─── Typewriter — texte jaune ─────────────────────────────
var messages = [
    "communautaire.",
    "chill.",
    "sympa."
];

var messageContainer = document.getElementById("message");
var cursor = document.getElementById("cursor");

let currentMessage = 0;
let currentLetter = 0;

function typeMessage() {
    if (currentLetter < messages[currentMessage].length) {
        messageContainer.innerHTML += messages[currentMessage].charAt(currentLetter);
        currentLetter++;
        setTimeout(typeMessage, 55);
    } else {
        setTimeout(eraseMessage, 2200);
    }
}

function eraseMessage() {
    if (currentLetter >= 0) {
        messageContainer.innerHTML = messages[currentMessage].substring(0, currentLetter);
        currentLetter--;
        setTimeout(eraseMessage, 28);
    } else {
        currentMessage = (currentMessage + 1) % messages.length;
        setTimeout(typeMessage, 500);
    }
}

typeMessage();

// ─── Texte défilant vertical ──────────────────────────────
var textes = [
    "Amusez-vous !",
    "Venez discuter !",
    "Rejoignez-nous !"
];
var tempsAffichage = 2000;
var tempsAnimation = 800;
var indexTexte = 0;
var divTexte = document.getElementById("divTexte");

function afficherTexte() {
    var texte = textes[indexTexte];
    var divTexteAnim = document.createElement("div");
    divTexteAnim.innerHTML = texte;
    divTexteAnim.style.position = "absolute";
    divTexteAnim.style.top = "-100%";
    divTexteAnim.style.transition = "top " + tempsAnimation + "ms cubic-bezier(0.4, 0, 0.2, 1)";
    divTexte.appendChild(divTexteAnim);

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            divTexteAnim.style.top = "0";
        });
    });

    setTimeout(function () {
        divTexteAnim.style.top = "100%";
        setTimeout(function () {
            if (divTexteAnim.parentNode) divTexte.removeChild(divTexteAnim);
            indexTexte = (indexTexte + 1) % textes.length;
            setTimeout(afficherTexte, 60);
        }, tempsAnimation);
    }, tempsAffichage);
}

setTimeout(afficherTexte, 350);