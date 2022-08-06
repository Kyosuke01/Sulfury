const header = document.querySelector("header");
const nav = document.querySelector("nav");
const welcome = document.querySelectorAll("ul li");
const button1 = document.querySelector(".btn1");
const button2 = document.querySelector(".btn2");
const button3 = document.querySelector(".btn3");
const img = document.querySelector("header img");
const text = document.querySelector(".text_sulfury");
const link1 = document.querySelector(".nav_link_home");
const link2 = document.querySelector(".nav_link_reglement");
const link3 = document.querySelector(".nav_link_equipe");
const link4 = document.querySelector(".nav_link_join");

const TL1 = new TimelineMax({ paused: true });

TL1.from(header, 1, { y: -500, opacity: 0 })
  .from(nav, 0.5, { y: -200, opacity: 0 })
  .from(img, 1, { opacity: 0 })
  .from(text, 1, { opacity: 0 }, "-=1")
  .from(link1, 0.2, { opacity: 0 })
  .from(link2, 0.2, { opacity: 0 })
  .from(link3, 0.2, { opacity: 0 })
  .from(link4, 0.2, { opacity: 0 })
  .from(welcome, 1, { x: 1000, opacity: 0 })
  .from(button1, 1.5, { x: -200, opacity: 0 })
  .from(button2, 1.5, { x: 200, opacity: 0 }, "-=1.5")
  .from(button3, 1.5, { x: -200, opacity: 0 }, "-=1.5");

TL1.play();

const all_card = document.querySelector(".card");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navigation.classList.add("card2");
  } else {
    navigation.classList.remove("card2");
  }
});
