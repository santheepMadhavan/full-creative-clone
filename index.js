let TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(() => {
    this.tick();
  }, delta);
};

window.onload = () => {
  let elements = document.getElementsByClassName("typewriter");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  $(window)
    .scroll((event) => {
      const scroll = $(window).scrollTop();
      if (scroll > 700) {
        $(".black").css("background", "#333333d1");
      } else {
        $(".black").css("background", "none");
      }
      if (window.innerWidth >= 750) {
        console.log(window.innerWidth);
        const windowBottom =
          $(event.currentTarget).scrollTop() +
          $(event.currentTarget).innerHeight();
        $(".fade").each((index, element) => {
          /* Check the location of each desired element */
          const objectBottom =
            $(element).offset().top + $(element).outerHeight();

          /* If the element is completely within bounds of the window, fade it in */
          if (objectBottom < windowBottom) {
            //object comes into view (scrolling down)
            if ($(element).css("opacity") == 0) {
              $(element).fadeTo(500, 1);
            }
          } else {
            //object goes out of view (scrolling up)
            if ($(element).css("opacity") == 1) {
              $(element).fadeTo(500, 0);
            }
          }
        });
      }
    })
    .scroll(); //invoke scroll-handler on page-load
};

function scrollView() {
  $("html, body").animate({ scrollTop: "0px" }, 1500);
}
