// Nav bar responsive mode

const nav_burger = document.getElementById("nav_burger");
const nav_link_equipe = document.getElementById("nav_link_equipe");
const nav_link_reglement = document.getElementById("nav_link_reglement");
const nav_link_home = document.getElementById("nav_link_home");
const nav_link_join = document.getElementById("nav_link_join");

nav_burger.onclick = function () {
    
  "use strict";
  
  nav_link_equipe.classList.toggle("show_list");
  nav_link_reglement.classList.toggle("show_list");
  nav_link_home.classList.toggle("show_list");
  nav_link_join.classList.toggle("show_list");
  
};