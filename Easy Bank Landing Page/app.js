const hamburger = document.querySelector(".hamburger");
const navlink = document.querySelector(".nav-link");
const overlay = document.querySelector(".overlay");
const body = document.querySelector;
hamburger.addEventListener("click", () => {
  if (navlink.style.display === "flex") {
    navlink.style.display = "none";
    overlay.style.opacity = "0";
  } else {
    navlink.style.display = "flex";
    overlay.style.opacity = "1";
  }
});

document.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.className != "nav-link" &&
    e.target.className != "hamburger" &&
    e.target.localName != "a" &&
    e.target.localName != "li"
  ) {
    navlink.style.display = "none";
    overlay.style.opacity = "0";
  }
});

window.addEventListener("resize", function (e) {
  if (window.innerWidth > 890) {
    navlink.style.display = "flex";
    overlay.style.opacity = "1";
  }
});
