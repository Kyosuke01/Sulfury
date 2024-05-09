const btnCopyKyosuke = document.querySelector(".kyosuke_copy");
const txtCopyKyosuke = document.querySelector(".kyosuke_pseudo");

const btnCopyKam = document.querySelector(".kam_copy");
const txtCopyKam = document.querySelector(".kam_pseudo");

const btnCopyLiffux = document.querySelector(".liffux_copy");
const txtCopyLiffux = document.querySelector(".liffux_pseudo");

const btnCopyQuentin = document.querySelector(".quentin_copy");
const txtCopyQuentin = document.querySelector(".quentin_pseudo");

const btnCopyRyota = document.querySelector(".ryota_copy");
const txtCopyRyota = document.querySelector(".ryota_pseudo");

const btnCopyXeinel = document.querySelector(".xeinel_copy");
const txtCopyXeinel = document.querySelector(".xeinel_pseudo");

const btnCopyArdea974 = document.querySelector(".ardea974_copy");
const txtCopyArdea974 = document.querySelector(".ardea974_pseudo");

const btnCopyEmin = document.querySelector(".emin_copy");
const txtCopyEmin = document.querySelector(".emin_pseudo");

const btnCopyNinfrast = document.querySelector(".ninfrast_copy");
const txtCopyNinfrast = document.querySelector(".ninfrast_pseudo");

// Kyosuke

btnCopyKyosuke.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyKyosuke.innerText);
});

function showPopupKyosuke() {
  var popup = document.getElementById("popup_kyosuke");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Kam

btnCopyKam.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyKam.innerText);
});

function showPopupKam() {
  var popup = document.getElementById("popup_kam");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Liffux

btnCopyLiffux.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyLiffux.innerText);
});

function showPopupLiffux() {
  var popup = document.getElementById("popup_liffux");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Quentin

btnCopyQuentin.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyQuentin.innerText);
});

function showPopupQuentin() {
  var popup = document.getElementById("popup_quentin");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Ryota

btnCopyRyota.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyRyota.innerText);
});

function showPopupRyota() {
  var popup = document.getElementById("popup_ryota");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Xeinel

btnCopyXeinel.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyXeinel.innerText);
});

function showPopupXeinel() {
  var popup = document.getElementById("popup_xeinel");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Ardea

btnCopyArdea974.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyArdea974.innerText);
});

function showPopupArdea974() {
  var popup = document.getElementById("popup_ardea974");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Emin

btnCopyEmin.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyEmin.innerText);
});

function showPopupEmin() {
  var popup = document.getElementById("popup_emin");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Ninfrast

btnCopyNinfrast.addEventListener("click", () => {
  navigator.clipboard.writeText(txtCopyNinfrast.innerText);
});

function showPopupNinfrast() {
  var popup = document.getElementById("popup_ninfrast");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}
