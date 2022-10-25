$(function () {
  $(".banner").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    pauseOnHover: false,
    pauseOnFocus: false,
    
  });
});


$(function () {
  $(".card").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 1000,
    pauseOnHover: false,
    pauseOnFocus: false,
    
  });
});
