$(function() {

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

  var mixer = mixitup('.products__content');

  var mixer2 = mixitup('.design__items');
  

});