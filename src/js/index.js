"use strict";
import { references, projects } from "./constants";
import { state } from "./state";

// DOM SELECTIONS
// NUMBERS STACK
const stackElements = document.querySelectorAll(".numbers__item");

// REFERENCES SLIDER
const sliderContainer = document.querySelector(".references__container");
const sliderArrows = document.querySelectorAll(".arrow");
const leftArrow = document.querySelector("#arrow-left");
const rightArrow = document.querySelector("#arrow-right");
const sliderDotsContainer = document.querySelector(".dots__container");

// PORTFOLIO SLIDER
const portfolioContainer = document.querySelector(
  ".portfolio__examples-container"
);
// const portfolioOuter = document.querySelector(".portfolio__outer-container");

// NAVIGATION
const hamburger = document.querySelector(".hamburger");
const navigationMenu = document.querySelector(".navigation__list");

// GENERATE SLIDER
references.forEach((reference, i) => {
  const slidesMarkup = `<div class="references__item ${
    i === state.activeSlide && "references__item-active"
  }" style="transform: translateX(${(i - state.activeSlide) * 100}%)">
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
  }" data-order="${i}"></span>
  `;

  sliderContainer.innerHTML += slidesMarkup;
  sliderDotsContainer.innerHTML += dostMarkup;
});

// GENERATE PROJECTS SLIDER
projects.forEach((project) => {
  const markup = `<div class="portfolio__item">
  <img src="${project.imageURL}" alt="Portfolio work" />
  <div class="portfolio__item-content">
    <div class="portfolio__item-heading">
      <h4>${project.name}</h4>

      <div class="portfolio__item-links">
        ${project.links
          .map(
            (
              l
            ) => `<a href="${l.linkURL}" target="_blank" class="portfolio__item-link">
        <span
          class="iconify"
          data-icon="${l.iconName}"
          data-width="16"
        ></span>
      </a>`
          )
          .join("")}
      </div>
    </div>

    <div class="portfolio__item-tags">
      ${project.tags
        .map(
          (tag) => `
      <span class="portfolio__item-tag">${tag}</span>
      `
        )
        .join("")}
    </div>
  </div>
</div>`;
  portfolioContainer.innerHTML += markup;
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

// CONTROL SLIDER
const slides = document.querySelectorAll(".references__item");
const dots = document.querySelectorAll(".dots__item");
const maxSlide = slides.length;
const touchThreshold = 50; // Adjust this value to set the swipe sensitivity
let touchStartX = 0;
let touchEndX = 0;

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

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const touchDiff = touchEndX - touchStartX;
  if (touchDiff > touchThreshold) {
    prevSlide();
  } else if (touchDiff < -touchThreshold) {
    nextSlide();
  }
}

// EVENT LISTENERS
leftArrow.addEventListener("click", prevSlide);
rightArrow.addEventListener("click", nextSlide);
sliderContainer.addEventListener("touchstart", handleTouchStart);
sliderContainer.addEventListener("touchmove", handleTouchMove);
sliderContainer.addEventListener("touchend", handleTouchEnd);

sliderDotsContainer.addEventListener("click", (e) => {
  // Guard clause
  const target = e.target.closest(".dots__item");
  if (!target) return;

  const slideToGo = +target.dataset.order;
  goToSlide(slideToGo);
});

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  hamburger.classList.toggle("hamburger-active");
  navigationMenu.classList.toggle("navigation__list-active");
});

navigationMenu.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target.closest(".navigation__list-link");
  if (!target) return;

  hamburger.classList.remove("hamburger-active");
  navigationMenu.classList.remove("navigation__list-active");

  const id = target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});
