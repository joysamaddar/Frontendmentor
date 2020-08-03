const curve = document.querySelector(".curve");

window.addEventListener("resize", (e) => {
  if (e.currentTarget.screen.width <= 375) {
    curve.src = "./img/bg-curvy-mobile.svg";
  } else {
    curve.src = "./img/bg-curvy-desktop.svg";
  }
});
