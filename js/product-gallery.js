import products from "./catalog_data.js";
const source = document.getElementById("entry-template").innerHTML;

function FindCurrentCard() {
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

const template = Handlebars.compile(source);

const sectionRefs = {
  productCard: document.querySelector(".product-card"),
};

// sectionRefs.productCard.innerHTML = "";
sectionRefs.productCard.insertAdjacentHTML(
  "beforeend",
  template(products[FindCurrentCard()])
);

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

// если через чек боксы
// const colorCheckbox = {
//   checkboxForm: document.querySelector(`.product-card__color-form`),
//   onCheckbox(event) {
//     const active = colorCheckbox.checkboxForm.querySelector(".active");
//     if (active) {
//       active.classList.remove("active");
//       active.previousElementSibling.dataset.status = "off";
//     }
//     if (event.target.nextElementSibling === active) {
//       event.target.nextElementSibling.classList.remove(`active`);
//       event.target.dataset.status = "off";
//       return;
//     }
//     event.target.nextElementSibling.classList.add("active");
//     event.target.dataset.status = "on";
//   },
// };
// colorCheckbox.checkboxForm.addEventListener("change", colorCheckbox.onCheckbox);
const colorCheck = {
  colorCheckElements: document.querySelectorAll(
    `.product-card__color-selector`
  ),
  oncolorCheck(event) {
    // const currentColor = colorCheck.colorCheckElements.classList.contains(products[FindCurrentCard().color)
    // if (currentColor) {
    //   currentColor.classList.add('active')
    // }
    colorCheck.colorCheckElements.forEach((name) => {
      const currentColor = products[FindCurrentCard()].color;
      console.log(currentColor);
      if (name.classList.contains(currentColor)) {
        name.classList.add("active");
      }
    });
  },
};
colorCheck.oncolorCheck();
