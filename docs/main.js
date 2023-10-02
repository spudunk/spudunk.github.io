var hero = document.getElementById("hero");
var heroDown = document.getElementById("hero-down");
var heroButton = document.getElementById("hero-button-primary");
var about = document.getElementById("about");
// var contact = document.getElementById("contact");
var navbar = document.getElementById("navbar");
var toggle = document.getElementById("menu-toggle");

navbar.style.display = "none";
toggle.onclick = function (e) {
  // console.log(e);
  if (navbar.style.display == "none") {
    navbar.style.display = "flex";
  } else {
    navbar.style.display = "none";
  }
  return;
};
navbar.onclick = function (e) {
  navbar.style.display = "none";
  return;
};

// function fadeOutOnScroll(element) {
//   // FADE OUT HERO DOWN ARROW ON SCROLL DOWN
//   if (!element) {
//     return;
//   }
//   var scrollTop = document.documentElement.scrollTop;
//   var opacity = 1;
//   if (scrollTop > 0) {
//     opacity = Math.max(1 - scrollTop / 100, 0);
//   }
//   element.style.opacity = opacity;
// }

// function scrollHandler() {
// fadeOutOnScroll(heroDown);
// shrinkOnScroll(hero);
// }

// window.addEventListener("scroll", scrollHandler);

// heroDown.addEventListener("click", (e) => {
//   about.scrollIntoView();
// });

// heroButton.addEventListener("click", (e) => {
//   contact.scrollIntoView();
// });
