const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  const mainNav = document.querySelectorAll('.main-nav li');
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    mainNav.forEach((link, index) => {
      link.style.animation = `mainNavFade 0.5s ease forwards ${(index / 6) + 0.5}s`;
    });
    burger.classList.toggle('toggle');
  });
}

navSlide();


try {
  document.ready(function () {
    /* Navigation scroll */
    $(function () {
      $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
  });
} catch (e) { }
