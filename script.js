var view = document.getElementsByClassName("view")[0];
// view.id = "view"
view.innerHTML = `
  &bull; <a href="https://www.facebook.com/hickscme" target="_blank">Facebook</a><br>
  &bull; <a href="https://github.com/spudunk" target="_blank">GitHub</a><br>
  &bull; <a href="https://twitter.com/HicksCME" target="_blank">Twitter</a><br>
`;
view.style.visibility = "visible";
contact = document.getElementById("contact");
contact.innerHTML = `
  <p>Contact me at: <br>
  <a href="tel:+13608272736">(360) 827-2736</a><br>
  <a href="mailto:hickscme@gmail.com">hickscme@gmail.com</a></p>
`


// add jquery
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://code.jquery.com/jquery-3.4.1.slim.min.js');
jQueryScript.setAttribute('integrity','sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=');
jQueryScript.setAttribute('crossorigin','anonymous');
document.head.appendChild(jQueryScript);
