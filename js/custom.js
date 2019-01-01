/*/*------------------
		Preloder
	--------------------*/
	$(window).on('load', function() {
		$('#preloader').delay(200).fadeOut('slow');
		$('body').delay(200).css({
			'overflow': 'visible'
		});
	});

$(function() {
  $(".secretpopout").delay(1000).fadeIn();
});

$(document).ready(function(){
        // Navigation active state

        var sidenav = $('.side-nav a');
        $(sidenav).on('click', function() {
            $(sidenav).removeClass('active');
            $(this).addClass('active');
        });

        $(window).on('scroll', function() {
            $('section').each(function() {
                if ($(window).scrollTop() >= $(this).position().top - 50) {
                    var id = $(this).attr('id');
                    $('.side-nav a').removeClass('active');
                    $('.side-nav a[href*=\\#' + id + ']').addClass('active');
                }
            });
        });


        // Navigation expand and collapse
        var toggleBtn = $(".toggle-btn");
        $(toggleBtn).on("click", function() {
            $("header").toggleClass("expand");
        })


        // Smooth scroll function
        $('a.smooth-scroll').on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });


        // Magnific Popup Gallary Init
        var gallary = $('.popupgallery');
        gallary.magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            fixedContentPos: false,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Devesh Singh</small>';
                }
            }
        });


        // Call Isotope
        function callisotope() {
            var grid = $('.grid');
            grid.isotope({
                // options
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
                masonry: {
                    // use element for option
                    columnWidth: 250,
                    gutter: 10,
                }
            });
        }
        callisotope();
        $(window).resize(function() {
            callisotope();
        });


        // Portfolio Navigation
        var filterList = $(".filter-navigation li");
        filterList.click(function() {
            filterList.removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: selector
            });
            return false;
        });


        // CSS3 Animation initialization
        AOS.init({
            duration: 1200
        });

        // Typed js
        $(function() {
            var specialities = $(".specialities");
            specialities.typed({
                strings: ["Designer", "Developer", "Coder", "Front-end Developer","Visualizer", "Web Developer", "Student", "Freelancer"],
                typeSpeed: 0,
                loop: true,
                typeSpeed: 100
            });
        });

        // Particle animation
        (function() {

            var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

            // Main
            initHeader();
            initAnimation();
            addListeners();

            function initHeader() {
                width = window.innerWidth;
                height = window.innerHeight;
                target = {
                    x: width / 2,
                    y: height / 2
                };

                largeHeader = document.getElementById('banner');
                // largeHeader.style.height = height + 'px';

                canvas = document.getElementById('demo-canvas');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');

                // create points
                points = [];
                for (var x = 0; x < width; x = x + width / 20) {
                    for (var y = 0; y < height; y = y + height / 20) {
                        var px = x + Math.random() * width / 20;
                        var py = y + Math.random() * height / 20;
                        var p = {
                            x: px,
                            originX: px,
                            y: py,
                            originY: py
                        };
                        points.push(p);
                    }
                }

                // for each point find the 5 closest points
                for (var i = 0; i < points.length; i++) {
                    var closest = [];
                    var p1 = points[i];
                    for (var j = 0; j < points.length; j++) {
                        var p2 = points[j]
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
                    var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,1)');
                    points[i].circle = c;
                }
            }

            // Event handling
            function addListeners() {
                if (!('ontouchstart' in window)) {
                    window.addEventListener('mousemove', mouseMove);
                }
                window.addEventListener('scroll', scrollCheck);
                window.addEventListener('resize', resize);
            }

            function mouseMove(e) {
                var posx = 0,
                    posy = 0;
                if (e.pageX || e.pageY) {
                    posx = e.pageX -300;
                    posy = e.pageY -100;
                } else if (e.clientX || e.clientY) {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
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
                largeHeader.style.height = height + 'px';
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
                    onComplete: function() {
                        shiftPoint(p);
                    }
                });
            }

            // Canvas manipulation
            function drawLines(p) {
                if (!p.active) return;
                for (var i in p.closest) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.closest[i].x, p.closest[i].y);
                    ctx.strokeStyle = 'rgba(132,149,169,' + p.active + ')';
                    ctx.stroke();
                }
            }

            function Circle(pos, rad, color) {
                var _this = this;

                // constructor
                (function() {
                    _this.pos = pos || null;
                    _this.radius = rad || null;
                    _this.color = color || null;
                })();

                this.draw = function() {
                    if (!_this.active) return;
                    ctx.beginPath();
                    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(132,149,169,' + _this.active + ')';
                    ctx.fill();
                };
            }

            // Util
            function getDistance(p1, p2) {
                return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
            }

        })();
});