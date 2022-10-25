import products from "./services/data/catalog_data.js";
import optionsForLightbox from "./services/simpleLigthBox-options.js";
const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);
console.log(optionsForLightbox);
const lightbox = new SimpleLightbox(".product-card__item ", optionsForLightbox);
// const lightbox = new SimpleLightbox(".product-card__item ", {
//   captionDelay: 200,
//   showCounter: false,
//   maxZoom: 3,
//   scrollZoomFactor: 0.1,
// });

const currentPage = {
  productCard: document.querySelector(".product-card"),
};

function FindCurrentIndx() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const pageNumber = [];
  for (let i of page.split("")) {
    if (i === ".") {
      break;
    }
    pageNumber.push(i);
  }
  return Number(pageNumber.join("")) - 1;
}
currentPage.productCard.insertAdjacentHTML(
  "beforeend",
  template(products[FindCurrentIndx()])
);

const sizesCheckbox = {
  checkboxForm: document.querySelector(`.product-card__size-form`),
  onCheckbox(event) {
    const active = this.checkboxForm.querySelector(".active");
    if (active) {
      active.classList.remove("active");
      active.previousElementSibling.dataset.status = "off";
    }
    const { target } = event;
    if (target.nextElementSibling === active) {
      target.nextElementSibling.classList.remove(`active`);
      target.dataset.status = "off";
      return;
    }
    target.nextElementSibling.classList.add("active");
    target.dataset.status = "on";
  },
};
sizesCheckbox.checkboxForm.addEventListener(
  "change",
  sizesCheckbox.onCheckbox.bind(sizesCheckbox)
);

const colorCheck = {
  colorCheckElements: document.querySelectorAll(
    `.product-card__color-selector`
  ),
  oncolorCheck(event) {
    const { colorCheckElements } = this;
    colorCheckElements.forEach((name) => {
      const currentColor = products[FindCurrentIndx()].color;
      if (name.classList.contains(currentColor)) {
        name.classList.add("active");
      }
    });
  },
};
colorCheck.oncolorCheck.call(colorCheck);
