const burger = document.querySelector(".burger");
const mobilenav = document.querySelector(".nav-right");
const inputbox = document.querySelector(".shortner input");
const submit = document.querySelector(".shortner a");
const container = document.querySelector(".container");
const messageel = document.querySelector(".message");
let links = [];

document.addEventListener("DOMContentLoaded", () => {
  links = JSON.parse(localStorage.getItem("links"));
  links.forEach((savedlink) => {
    container.innerHTML += `<div class="link">
          <div class="originallink">${savedlink.original}</div>
          <div class="shortened">
            <a href="${savedlink.short}">${savedlink.short}</a>
            <button>Copy</button>
          </div>
        </div>`;
  });
  const copybtn = document.querySelectorAll(".link button");
  copybtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      copyfn(e);
    });
  });
});
burger.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
    mobilenav.style.display = "none";
  } else {
    burger.classList.add("active");
    mobilenav.style.display = "flex";
  }
});

inputbox.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    submit.click();
  }
});

submit.addEventListener("click", () => {
  let link = inputbox.value;
  if (link != "") {
    fetch("https://rel.ink/api/links/", {
      method: "POST",
      body: JSON.stringify({
        url: `${link}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.url[0] != "Enter a valid URL.") {
          container.innerHTML += `<div class="link">
          <div class="originallink">${link}</div>
          <div class="shortened">
            <a href="https://rel.ink/${json.hashid}">https://rel.ink/${json.hashid}</a>
            <button>Copy</button>
          </div>
        </div>`;
          links.push({
            original: `${link}`,
            short: `https://rel.ink/${json.hashid}`,
          });
          console.log(links);
          localStorage.setItem("links", JSON.stringify(links));
          const copybtn = document.querySelectorAll(".link button");
          copybtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              copyfn(e);
            });
          });
        } else {
          showError("Enter a valid URL.");
        }
      });
  } else {
    showError("Please add a link");
  }
});

function showError(message) {
  messageel.innerText = message;
  inputbox.style.border = "2px solid var(--secondary-red)";
  setTimeout(() => {
    messageel.innerText = "";
    inputbox.style.border = "none";
  }, 1500);
}

function copyfn(e) {
  const textarea = document.createElement("textarea");
  textarea.value = e.target.parentElement.querySelector("a").innerText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  e.target.style.background = "var(--primary-dark-violet)";
  e.target.innerText = "Copied!";
  setTimeout(() => {
    e.target.style.background = "var(--primary-cyan)";
    e.target.innerText = "Copy";
  }, 1500);
}
