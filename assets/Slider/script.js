"use strict";

const slider = () => {
  const items = document.getElementById("slides");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotContainer = document.querySelector(".dots");
  const slides = document.querySelectorAll(".slide");
  const slidesLength = slides.length;
  const slideSize = items.querySelectorAll(".slide")[0].offsetWidth;
  const firstSlide = slides[0];
  const lastSlide = slides[slidesLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let posInitial;
  let allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  const shiftDot = (e) => {
    items.classList.add("shifting");
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      index = Number(slide) - 1;
      goToSlide(Number(slide));
      activateDot(Number(slide) - 1);
    }
  };

  const nextSlide = () => {
    items.classList.add("shifting");
    if (allowShift) {
      posInitial = items.offsetLeft;
      items.style.left = `${posInitial - slideSize}px`;
      index++;
    }
    allowShift = false;
  };

  const prevSlide = () => {
    items.classList.add("shifting");
    if (allowShift) {
      posInitial = items.offsetLeft;
      items.style.left = `${posInitial + slideSize}px`;
      index--;
    }
    allowShift = false;
  };

  // functions

  function checkIndex() {
    items.classList.remove("shifting");
    if (index === -1) {
      items.style.left = `-${slidesLength * slideSize}px`;
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      items.style.left = `-${slideSize}px`;
      index = 0;
    }
    console.log(index);
    activateDot(index);
    allowShift = true;
  }

  const createDots = function () {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(function (_, i) {
      if (i !== 0 && i !== slides.length - 1) {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      }
    });
  };

  function activateDot(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide + 1}"]`)
      .classList.add("dots__dot--active");
  }

  function goToSlide(slide) {
    items.style.left = `-${slideSize * slide}px`;
  }

  const init = function () {
    createDots();
    goToSlide(1);
    activateDot(index);
  };
  init();

  // CLick events
  prev.addEventListener("click", prevSlide);
  next.addEventListener("click", nextSlide);
  dotContainer.addEventListener("click", shiftDot);

  // Transition event
  items.addEventListener("transitionend", checkIndex);
};

slider();
