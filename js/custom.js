/*/*------------------
		Preloder
	--------------------*/
$(window).on("load", function () {
  $("#preloader").delay(200).fadeOut("slow");
  $("body").delay(200).css({
    overflow: "visible",
  });
});

$(function () {
  $(".secretpopout").delay(1000).fadeIn();
});

$(document).ready(function () {
  // Navigation active state

  var sidenav = $(".side-nav a");
  $(sidenav).on("click", function () {
    $(sidenav).removeClass("active");
    $(this).addClass("active");
  });

  $(window).on("scroll", function () {
    $("section").each(function () {
      if ($(window).scrollTop() >= $(this).position().top - 50) {
        var id = $(this).attr("id");
        $(".side-nav a").removeClass("active");
        $(".side-nav a[href*=\\#" + id + "]").addClass("active");
      }
    });
  });

  // Navigation expand and collapse
  var toggleBtn = $(".toggle-btn");
  $(toggleBtn).on("click", function () {
    $("header").toggleClass("expand");
  });

  // Smooth scroll function
  $("a.smooth-scroll").on("click", function (e) {
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top,
        },
        1000
      );
    e.preventDefault();
  });

  // Magnific Popup Gallary Init
  var gallary = $(".popupgallery");
  gallary.magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    fixedContentPos: false,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr("title") + "<small>by Devesh Singh</small>";
      },
    },
  });

  // Call Isotope
  function callisotope() {
    var grid = $(".grid");
    grid.isotope({
      // options
      itemSelector: ".grid-item",
      layoutMode: "fitRows",
      masonry: {
        // use element for option
        columnWidth: 250,
        gutter: 10,
      },
    });
  }
  callisotope();
  $(window).resize(function () {
    callisotope();
  });

  // Portfolio Navigation
  var filterList = $(".filter-navigation li");
  filterList.click(function () {
    filterList.removeClass("active");
    $(this).addClass("active");

    var selector = $(this).attr("data-filter");
    $(".grid").isotope({
      filter: selector,
    });
    return false;
  });

  // CSS3 Animation initialization
  AOS.init({
    duration: 1200,
  });

  // Typed js
  $(function () {
    var specialities = $(".specialities");
    specialities.typed({
      strings: [
        "Data scientist",
        "Developer",
        "Coder",
        "back-end Developer",
        "Data engineer",
        "Web Developer",
        "Student",
        "Freelancer",
      ],
      typeSpeed: 0,
      loop: true,
      typeSpeed: 100,
    });
  });

  // Particle animation
  (function () {
    var width,
      height,
      largeHeader,
      canvas,
      ctx,
      points,
      target,
      animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = {
        x: width / 2,
        y: height / 2,
      };

      largeHeader = document.getElementById("banner");
      // largeHeader.style.height = height + 'px';

      canvas = document.getElementById("demo-canvas");
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");

      // create points
      points = [];
      for (var x = 0; x < width; x = x + width / 20) {
        for (var y = 0; y < height; y = y + height / 20) {
          var px = x + (Math.random() * width) / 20;
          var py = y + (Math.random() * height) / 20;
          var p = {
            x: px,
            originX: px,
            y: py,
            originY: py,
          };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
          var p2 = points[j];
          if (!(p1 == p2)) {
            var placed = false;
            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (var i in points) {
        var c = new Circle(
          points[i],
          2 + Math.random() * 2,
          "rgba(255,255,255,1)"
        );
        points[i].circle = c;
      }
    }

    // Event handling
    function addListeners() {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    }

    function mouseMove(e) {
      var posx = 0,
        posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX - 300;
        posy = e.pageY - 100;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + "px";
      canvas.width = width;
      canvas.height = height;
    }

    // animation
    function initAnimation() {
      animate();
      for (var i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
          shiftPoint(p);
        },
      });
    }

    // Canvas manipulation
    function drawLines(p) {
      if (!p.active) return;
      for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = "rgba(132,149,169," + p.active + ")";
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      var _this = this;

      // constructor
      (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
      })();

      this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(132,149,169," + _this.active + ")";
        ctx.fill();
      };
    }

    // Util
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
  })();
});

// WordShuffler

function WordShuffler(holder, opt) {
  var that = this;
  var time = 0;
  this.now;
  this.then = Date.now();

  this.delta;
  this.currentTimeOffset = 0;

  this.word = null;
  this.currentWord = null;
  this.currentCharacter = 0;
  this.currentWordLength = 0;

  var options = {
    fps: 60,
    timeOffset: 5,
    textColor: "#000",
    fontSize: "50px",
    useCanvas: false,
    mixCapital: false,
    mixSpecialCharacters: false,
    needUpdate: true,
    colors: [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#9e9e9e",
      "#607d8b",
    ],
  };

  if (typeof opt != "undefined") {
    for (key in opt) {
      options[key] = opt[key];
    }
  }

  this.needUpdate = true;
  this.fps = options.fps;
  this.interval = 100 / this.fps;
  this.timeOffset = options.timeOffset;
  this.textColor = options.textColor;
  this.fontSize = options.fontSize;
  this.mixCapital = options.mixCapital;
  this.mixSpecialCharacters = options.mixSpecialCharacters;
  this.colors = options.colors;

  this.useCanvas = options.useCanvas;

  this.chars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  this.specialCharacters = [
    "!",
    "§",
    "$",
    "%",
    "&",
    "/",
    "(",
    ")",
    "=",
    "?",
    "_",
    "<",
    ">",
    "^",
    "°",
    "*",
    "#",
    "-",
    ":",
    ";",
    "~",
  ];

  if (this.mixSpecialCharacters) {
    this.chars = this.chars.concat(this.specialCharacters);
  }

  this.getRandomColor = function () {
    var randNum = Math.floor(Math.random() * this.colors.length);
    return this.colors[randNum];
  };

  //if Canvas

  this.position = {
    x: 0,
    y: 50,
  };

  //if DOM
  if (typeof holder != "undefined") {
    this.holder = holder;
  }

  if (!this.useCanvas && typeof this.holder == "undefined") {
    console.warn(
      "Holder must be defined in DOM Mode. Use Canvas or define Holder"
    );
  }

  this.getRandCharacter = function (characterToReplace) {
    if (characterToReplace == " ") {
      return " ";
    }
    var randNum = Math.floor(Math.random() * this.chars.length);
    var lowChoice = -0.5 + Math.random();
    var picketCharacter = this.chars[randNum];
    var choosen = picketCharacter.toLowerCase();
    if (this.mixCapital) {
      choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
    }
    return choosen;
  };

  this.writeWord = function (word) {
    this.word = word;
    this.currentWord = word.split("");
    this.currentWordLength = this.currentWord.length;
  };

  this.generateSingleCharacter = function (color, character) {
    var span = document.createElement("span");
    span.style.color = color;
    span.innerHTML = character;
    return span;
  };

  this.updateCharacter = function (time) {
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval) {
      this.currentTimeOffset++;

      var word = [];

      if (
        this.currentTimeOffset === this.timeOffset &&
        this.currentCharacter !== this.currentWordLength
      ) {
        this.currentCharacter++;
        this.currentTimeOffset = 0;
      }
      for (var k = 0; k < this.currentCharacter; k++) {
        word.push(this.currentWord[k]);
      }

      for (var i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
        word.push(
          this.getRandCharacter(this.currentWord[this.currentCharacter + i])
        );
      }

      if (that.useCanvas) {
        c.clearRect(0, 0, stage.x * stage.dpr, stage.y * stage.dpr);
        c.font = that.fontSize + " sans-serif";
        var spacing = 0;
        word.forEach(function (w, index) {
          if (index > that.currentCharacter) {
            c.fillStyle = that.getRandomColor();
          } else {
            c.fillStyle = that.textColor;
          }
          c.fillText(w, that.position.x + spacing, that.position.y);
          spacing += c.measureText(w).width;
        });
      } else {
        if (that.currentCharacter === that.currentWordLength) {
          that.needUpdate = false;
        }
        this.holder.innerHTML = "";
        word.forEach(function (w, index) {
          var color = null;
          if (index > that.currentCharacter) {
            color = that.getRandomColor();
          } else {
            color = that.textColor;
          }
          that.holder.appendChild(that.generateSingleCharacter(color, w));
        });
      }
      this.then = this.now - (this.delta % this.interval);
    }
  };

  this.restart = function () {
    this.currentCharacter = 0;
    this.needUpdate = true;
  };

  function update(time) {
    time++;
    if (that.needUpdate) {
      that.updateCharacter(time);
    }
    requestAnimationFrame(update);
  }

  this.writeWord(this.holder.innerHTML);

  console.log(this.currentWord);
  update(time);
}

var headline = document.getElementById("headline");

var helloji = document.getElementById("helloji");
var text = document.getElementById("text");
var shuffler = document.getElementById("shuffler");
var done = false;
shuffler.addEventListener("click", function () {
  if (done === false) {
    helloji.style.display = "none";
    headline.style.display = "block";
    text.style.display = "block";
    var headText = new WordShuffler(headline, {
      textColor: "#fff",
      timeOffset: 18,
      mixCapital: true,
      mixSpecialCharacters: true,
    });

    // var pText = new WordShuffler(text, {
    //   textColor: "#fff",
    //   timeOffset: 100,
    // });

    var buttonText = new WordShuffler(shuffler, {
      textColor: "black",
      timeOffset: 10,
    });
    done = true;
  }
});
