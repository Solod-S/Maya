const productGalery = {
  lightbox: "",
  productImagesEl: document.querySelector(".product-card__list"),
  mainImageEl: document.querySelector(".product-card__main-img"),
  mainLinkEl: document.querySelector(".product-card__main-img-link"),
  // btn: document.querySelector(".sl-close"),
  selectMainImage(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
      return;
    }
    productGalery.mainImageEl.src = event.target.src;
    productGalery.mainLinkEl.href = event.target.src;
    console.log(event.target.src);
  },
  select() {
    productGalery.lightbox = new SimpleLightbox(".gallery a", {
      // captionType: "alt",
      // captionsData: "alt",
      captionDelay: 200,
      showCounter: false,
      maxZoom: 2,
      scrollZoomFactor: 0.1,
    });
  },
};
console.log(productGalery.mainImageEl);
productGalery.productImagesEl.addEventListener(
  "click",
  productGalery.selectMainImage
);
productGalery.mainImageEl.addEventListener("click", productGalery.select);
