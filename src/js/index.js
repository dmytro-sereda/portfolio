"use strict";

// DOM SELECTIONS
const stackElements = document.querySelectorAll(".numbers__item");

// OBSERVER FOR STACK ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("numbers-show");
    } else {
      entry.target.classList.remove("numbers-show");
    }
  });
});

stackElements.forEach((element) => observer.observe(element));
