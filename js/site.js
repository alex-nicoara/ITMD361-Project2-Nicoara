// Toggles Menu in Mobile
function toggleNav() {
  var currentClass = $('#nav').attr('class');

  if(currentClass === "closed-nav") {
    $('#nav').removeClass("closed-nav").addClass("opened-nav");
  } else {
    $('#nav').removeClass("opened-nav").addClass("closed-nav");
  }
}

// Add Event Listener for Menu Button to toggle
var menuToggle = document.getElementById("menu-btn");
menuToggle.addEventListener("click", toggleNav, false);
