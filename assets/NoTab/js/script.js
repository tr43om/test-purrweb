"use strict";

// FORM VALIDATION
const form = document.querySelector(".form");
const inputs = form.querySelectorAll("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  [...inputs].forEach((input) => {
    if (input.value.trim() === "") {
      setErrorFor(input, `${input.placeholder} cannot be blank`);
      input.style.marginBottom = "2.5rem";
    } else {
      setSuccessFor(input);
    }
  });
}

function setErrorFor(input, message) {
  if (input.classList.contains("form__submit")) return;
  const formControl = input.parentElement; // .form__control
  const small = formControl.querySelector("small");
  // add error message inside small
  small.innerText = message;
  // add error class for element
  formControl.className = "form__control error";
}

function setSuccessFor(input) {
  if (input.classList.contains("form__submit")) return;
  const formControl = input.parentElement; // .form__control

  // add error class for element
  formControl.className = "form__control success";
}

// COOKIE FUNCTIONALITY
const cookieContainer = document.querySelector(".cookie");
const cookieButton = document.querySelector(".cookie__btn");

cookieButton.addEventListener("click", (_) => {
  cookieContainer.classList.remove("active");
});

setTimeout(() => {
  cookieContainer.classList.add("active");
}, 2000);

// Reveal sections
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Phone animation
const section = document.querySelector(".about");
const img = document.querySelector(".about__image");
const revealImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  img.classList.add("about__image--slide");
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0.75,
});

imgObserver.observe(section);
