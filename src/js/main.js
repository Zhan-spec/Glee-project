$(function() {

  $('.footer__title--nav').on('click', function() {
    $(this).siblings().slideToggle();
  });

  $('.menu__btn').on('click', function() {
    $('.menu__list').toggleClass('menu__list--active');
    $('.menu__btn').toggleClass('menu__btn--active');
  });

  $('.menu__link').on('click', function(e) {
    e.preventDefault();

    $('.menu__link').removeClass('menu__link--active');
    $(this).addClass('menu__link--active');

  });

  $('.top-slider__inner').slick({
    arrows: false,
    dots: true,
    fade: true
  });
  
  $('.partners-slider').slick({
    arrows: false,      
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  
  var containerEl1 = document.querySelector('[data-ref="products__mixitup"]');
  var containerEl2 = document.querySelector('[data-ref="design__mixitup"]');

  var config = {
    controls: {
      scope: 'local'
    }
  };
 
  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);

  
});