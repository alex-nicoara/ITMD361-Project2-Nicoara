$.noConflict();

// Re-introduce the dollar sign scope to self executing function
(function($) {
  // variables
  var menuToggle = document.getElementById("menu-btn");
  var jumboImgIndex = -1;
  var bannerImages =
    [{alt: "Giant Beach Chair",
     src: "img/beach-chair.png",
     title: "Welcome!",
     par: "My name is Alexander Nicoara. I am a passionate and creative " +
          "web developer who enjoys coding, technology, and " +
          "computers."
     },
     {alt: "Jedi knight with a lightsaber",
     src: "img/jedi-knight.png",
     title: "Work Portfolio",
     par: "On my website, you can browse some of the work I've done in " +
          "both coding and design. I'm very experienced in Photoshop & " +
          "HTML, CSS, and JavaScript. I've also worked with SQL databases " +
          "and Java."
     },
     {alt: "Fraternity Group Photo",
     src: "img/fraternity.png",
     title: "Fraternity",
     par: "Aside from school, I am very involved with my Fraternity. This " +
          "a group picture of all the current brothers and new members in " +
          "our chapter."
     },
     {alt: "Campus Cru Group Photo",
     src: "img/cru.png",
     title: "Campus Cru",
     par: "Cru is a Christian faith based organization I've been involved with " + 
          "during my 4 1/2 years at Illinois Tech. I've experienced a lot of " +
          "personal growth while in Cru and made lots of great friends."
     }];

  // functions
  function rotateJumboImg() {
    jumboImgIndex++;
    if(jumboImgIndex>=bannerImages.length) {
      jumboImgIndex = 0;
    }

    fadeOut();
    setTimeout(function(){jumbo_setFig(jumboImgIndex)}, 550);
    return;
  }

  // sets figure/image properties
  function jumbo_setFig(index) {
    $('#jsmall-image').attr('src', bannerImages[index].src);
    $('#jsmall-image').attr('alt', bannerImages[index].alt);
    $('#jumbo-title').html(bannerImages[index].title);
    $('#jumbo-par').html(bannerImages[index].par);

    fadeIn();
    return;
  }

  // applies fade in/out states
  function fadeIn() {
    $('#jsmall-image').removeClass("fadeOut").addClass("fadeIn");
    return;
  }

  function fadeOut() {
    $('#jsmall-image').removeClass("fadeIn").addClass("fadeOut");
    return;
  }

  // Toggles Menu in Mobile
  function toggleNav() {
    var currentClass = $('#nav').attr('class');

    if(currentClass === "closed-nav") {
      $('#nav').removeClass("closed-nav").addClass("opened-nav");
    } else {
      $('#nav').removeClass("opened-nav").addClass("closed-nav");
    }
  }

  // load first carousel image
  rotateJumboImg();

  // set interval of carousel rotation (every 10 seconds)
  setInterval(rotateJumboImg, 12000);

  // event listeners
  menuToggle.addEventListener("click", toggleNav, false);
})(jQuery);
