$(function () {
  $(".banner").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,

    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //       autoplay: true,
    //       autoplaySpeed: 5000,
    //       speed: 1000,
    //     },
    //   },
    //   {
    //     breakpoint: 767,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       dots: false,
    //       fade: true,
    //       autoplay: true,
    //       autoplaySpeed: 5000,
    //       speed: 1000,
    //     },
    //   },
    // ],
  });
});

// $(document).ready(function () {
//   $('.your-class').slick({
//     setting-name: setting-value
//   });
// });
