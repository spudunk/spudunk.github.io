var view = document.getElementsByClassName("view")[0];
// view.id = "view"
view.innerHTML = ' \
  &bull; <a href="https://www.facebook.com/hickscme" target="_blank">Facebook</a><br> \
  &bull; <a href="https://github.com/spudunk" target="blank">GitHub</a> \
';
view.style.visibility = "visible";
contact = document.getElementById("contact");
contact.innerHTML = `
  <p>Contact me at: </p>
  <a href="tel:+13608272736">(360) 827-2736</a><br>
  <a href="mailto:hickscme@gmail.com">hickscme@gmail.com</a>
`
