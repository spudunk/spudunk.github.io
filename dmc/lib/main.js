'use strict';

document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello Bulma!');
});

// Initialize all elements with carousel class.
var carousels = bulmaCarousel.attach('#carousel1', {});

// // To access to bulmaCarousel instance of an element
// const element = document.querySelector('#carousel1');
// if (element && element.bulmaCarousel) {
// 	// bulmaCarousel instance is available as element.bulmaCarousel
// }