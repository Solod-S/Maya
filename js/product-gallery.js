// const productGalery = {
//   lightbox: "",
//   productImagesEl: document.querySelector(".product-card__list"),
//   mainImageEl: document.querySelector(".product-card__main-img"),
//   mainLinkEl: document.querySelector(".product-card__main-img-link"),
//   // btn: document.querySelector(".sl-close"),
//   selectMainImage(event) {
//     event.preventDefault();
//     if (event.target.nodeName !== "IMG") {
//       return;
//     }
//     productGalery.mainImageEl.src = event.target.src;
//     productGalery.mainLinkEl.href = event.target.src;
//     console.log(event.target.src);
//     productGalery.select();
//   },
//   select() {
//     productGalery.lightbox = new SimpleLightbox(".gallery a", {
//       captionType: "alt",
//       captionsData: "alt",
//       captionDelay: 200,
//       showCounter: false,
//       maxZoom: 2,
//       scrollZoomFactor: 0.1,
//     });
//   },
// };

// productGalery.productImagesEl.addEventListener(
//   "click",
//   productGalery.selectMainImage
// );
// productGalery.mainImageEl.addEventListener("click", productGalery.select);

const sizesCheckbox = {
  checkboxForm: document.querySelector(`.product-card__size-form`),
  onCheckbox(event) {
    const active = sizesCheckbox.checkboxForm.querySelector(".active");
    if (active) {
      active.classList.remove("active");
      active.previousElementSibling.dataset.status = "off";
    }
    if (event.target.nextElementSibling === active) {
      event.target.nextElementSibling.classList.remove(`active`);
      event.target.dataset.status = "off";
      return;
    }
    event.target.nextElementSibling.classList.add("active");
    event.target.dataset.status = "on";
  },
};
sizesCheckbox.checkboxForm.addEventListener("change", sizesCheckbox.onCheckbox);
console.log(sizesCheckbox.checkboxForm);

const colorCheckbox = {
  checkboxForm: document.querySelector(`.product-card__color-form`),
  onCheckbox(event) {
    const active = colorCheckbox.checkboxForm.querySelector(".active");
    if (active) {
      active.classList.remove("active");
      active.previousElementSibling.dataset.status = "off";
    }
    if (event.target.nextElementSibling === active) {
      event.target.nextElementSibling.classList.remove(`active`);
      event.target.dataset.status = "off";
      return;
    }
    event.target.nextElementSibling.classList.add("active");
    event.target.dataset.status = "on";
  },
};
colorCheckbox.checkboxForm.addEventListener("change", colorCheckbox.onCheckbox);
console.log(colorCheckbox.checkboxForm);
