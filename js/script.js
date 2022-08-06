const header = document.querySelector("header");
const nav = document.querySelector("nav");
const welcome = document.querySelectorAll("ul li");
const button1 = document.querySelector(".btn1");
const button2 = document.querySelector(".btn2");
const button3 = document.querySelector(".btn3");

const TL1 = new TimelineMax({ paused: true });
const TL2 = new TimelineMax({ paused: true });

TL1.from(header, 1, { y: -100, opacity: 0 })
  .from(nav, 1, { y: -100, opacity: 0 })
  .from(welcome, 1, { x: 1000, opacity: 0 })
  .from(button1, 1.5, { x: -200, opacity: 0 })
  .from(button2, 1.5, { x: 200, opacity: 0 }, "-=1.15")
  .from(button3, 1.5, { x: -200, opacity: 0 }, "-=1.15");

TL1.play();
