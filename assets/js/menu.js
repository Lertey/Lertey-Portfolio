const menu = document.querySelector(".menu")
const navLinks = document.querySelector(".nav-links")
const body = document.querySelector("body")

menu.addEventListener('click', () => { navLinks.classList.toggle('mobile-menu'), body.classList.toggle('scr-n') })