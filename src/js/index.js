"use strict";
import { references } from "./constants";

// DOM SELECTIONS
const stackElements = document.querySelectorAll(".numbers__item");
const sliderContainer = document.querySelector(".references__container");
const sliderArrows = document.querySelectorAll(".arrow");
const sliderDotsContainer = document.querySelector(".dots__container");

// GENERATE SLIDER
references.forEach((reference) => {
  const markup = `<div class="references__item">
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

  sliderContainer.innerHTML += markup;
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
