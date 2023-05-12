"use strict";
import { references } from "./constants";
import { state } from "./state";

// DOM SELECTIONS
const stackElements = document.querySelectorAll(".numbers__item");
const sliderContainer = document.querySelector(".references__container");
const sliderArrows = document.querySelectorAll(".arrow");
const leftArrow = document.querySelector("#arrow-left");
const rightArrow = document.querySelector("#arrow-right");
const sliderDotsContainer = document.querySelector(".dots__container");

// GENERATE SLIDER
references.forEach((reference, i) => {
  const slidesMarkup = `<div class="references__item ${
    i === state.activeSlide && "references__item-active"
  }" style="transform: translateX(${i - state.activeSlide * 100}%)">
    <div class="references__name-container">
      <p class="references__name">${reference.name}</p>
      <a class="references__social-link" target="_blank" href="${
        reference.socialUrl
      }">
        <span
          class="iconify"
          data-icon="mdi:linkedin"
          data-width="16"
        ></span>
      </a>
    </div>
    <span class="references__position">${reference.positionName}</span>
    <p class="references__text">
    ${
      reference.text.length > 345
        ? reference.text.slice(0, 345) + "..."
        : reference.text
    }
    </p>
  </div>`;

  const dostMarkup = `
  <span class="dots__item ${
    i === state.activeSlide && "dots__item-active"
  }"></span>
  `;

  sliderContainer.innerHTML += slidesMarkup;
  sliderDotsContainer.innerHTML += dostMarkup;
});

// OBSERVER FOR STACK ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

// OBSERVER SETUP
stackElements.forEach((element) => observer.observe(element));
sliderArrows.forEach((arrow) => observer.observe(arrow));
observer.observe(sliderContainer);
observer.observe(sliderDotsContainer);

// CONTROL SLIDER
const slides = document.querySelectorAll(".references__item");
const dots = document.querySelectorAll(".dots__item");
const maxSlide = slides.length;

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
    s.classList.remove("references__item-active");
    if (i === slide) s.classList.add("references__item-active");
  });
  dots.forEach((d, i) => {
    d.classList.remove("dots__item-active");
    if (i === slide) d.classList.add("dots__item-active");
  });
}

function nextSlide() {
  if (state.activeSlide === maxSlide - 1) state.activeSlide = 0;
  else state.activeSlide++;
  goToSlide(state.activeSlide);
}

function prevSlide() {
  if (state.activeSlide === 0) state.activeSlide = maxSlide - 1;
  else state.activeSlide--;
  goToSlide(state.activeSlide);
}

// EVENT LISTENERS
leftArrow.addEventListener("click", prevSlide);
rightArrow.addEventListener("click", nextSlide);
