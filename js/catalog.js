import products from "./catalog_data.js";
const source = document.getElementById("entry-template").innerHTML;

const template = Handlebars.compile(source);
const forFilter = {
  category: {},
  sizes: {},
  price: { from: 1, to: 9999 },
};

const itemsList = [];
const filters = {
  readyToMarkUp: products,
  searchInput: document.querySelector(".window__search"),
  category: document.querySelector(".catloog__category-list"),
  categoryCheckboxes: document.querySelectorAll(".catloog__category-checkbox"),
  sizes: document.querySelector(".catloog__sizes-list"),
  sizesCheckboxes: document.querySelectorAll(".catloog__sizes-checkbox"),
  catalog: document.querySelector(".cards_list"),
  priceForm: document.querySelector(".catloog__price-form"),
  priceSwitcher: document.querySelector(`.window__price-checkbox`),
  onpriceSwitcher() {
    // filters.readyToMarkUp = filters.readyToMarkUp.sort((a, b) => a - b);
    // _.sortBy(filters.readyToMarkUp, filters.readyToMarkUp.price);
    filters.readyToMarkUp = _.sortBy(
      filters.readyToMarkUp,
      (product) => product.price
    );
    // filters.readyToMarkUp = _.sortBy(
    //   filters.readyToMarkUp,
    //   (product) => product.price
    // ).reverse();
    console.log(filters.readyToMarkUp);
    filters.filter();
  },
  onPriceFormInput(event) {
    forFilter.price[event.target.name] = Number(event.target.value);
    if (forFilter.price.to === 0) {
      forFilter.price.to = 9999;
    }
    if (forFilter.price.from === 0) {
      forFilter.price.from = 1;
    }
    console.log(forFilter.price);
    filters.filter();
  },
  onSearchInput(event) {
    const onSearchInput = event.target.value.toLowerCase();

    const filterFind = products.filter((item) =>
      item.name.toLocaleLowerCase().includes(onSearchInput)
    );
    if (filterFind.length === 0 || onSearchInput.length === 0) {
      return filters.createMarkUp(filters.readyToMarkUp);
    }
    filters.createMarkUp(filters.readyToMarkUp);
    filters.createMarkUp(filterFind);
  },
  createItemsList() {
    const entriesCategory = Object.entries(forFilter.category);
    const entriesSizes = Object.entries(forFilter.sizes);
    // forFilter.category {bandage: 'on'} => [['bandage', 'on']]
    entriesCategory.forEach(([key, value]) => {
      if (value === "off" && itemsList.includes(key)) {
        const indexForRemove = itemsList.indexOf(key);
        itemsList.splice(indexForRemove, 1);
      } else if (value === "on" && !itemsList.includes(key)) {
        itemsList.push(key);
      }
    });
    entriesSizes.forEach(([key, value]) => {
      if (value === "off" && itemsList.includes(key)) {
        const indexForRemove = itemsList.indexOf(key);
        itemsList.splice(indexForRemove, 1);
        console.log(`!`);
      } else if (value === "on" && !itemsList.includes(key)) {
        itemsList.push(key);
      }
    });

    filters.filter();
  },
  filter() {
    const categoryActive = Object.values(forFilter.category).includes("on");
    const sizesActive = Object.values(forFilter.sizes).includes("on");
    if (categoryActive) {
      filters.readyToMarkUp = products.filter((product) => {
        for (let [name, value] of Object.entries(forFilter.category)) {
          // console.log(product.category, name, value);
          if (product.category === name && value === "on") {
            return true;
          }
        }
      });
      if (sizesActive) {
        filters.readyToMarkUp = filters.readyToMarkUp.filter((product) => {
          for (let size of product.sizes) {
            for (let [name, value] of Object.entries(forFilter.sizes)) {
              if (size === name && value === "on") {
                return true;
              }
            }
          }
        });
      }
    }
    if (!categoryActive) {
      filters.readyToMarkUp = products;
    }
    if (sizesActive) {
      filters.readyToMarkUp = filters.readyToMarkUp.filter((product) => {
        for (let size of product.sizes) {
          for (let [name, value] of Object.entries(forFilter.sizes)) {
            if (size === name && value === "on") {
              return true;
            }
          }
        }
      });
    }

    filters.readyToMarkUp = filters.readyToMarkUp.filter((product) => {
      if (
        product.price >= forFilter.price.from &&
        product.price <= forFilter.price.to
      ) {
        return true;
      }
    });
    return filters.createMarkUp(filters.readyToMarkUp);
  },

  createMarkUp(filtered) {
    const cardsEl = template(filtered);

    filters.catalog.innerHTML = "";
    filters.catalog.insertAdjacentHTML("beforeend", cardsEl);
  },
  changeStatusCatCheckboxes(event) {
    if (event.target.checked) {
      // console.log("Checkbox is checked..");
      event.target.dataset.status = "on";
    } else if (!event.target.checked) {
      event.target.dataset.status = "off";
      // console.log("Checkbox is not checked..");
    }
    filters.categoryCheckboxes.forEach((name) => {
      forFilter.category[name.dataset.category] = name.dataset.status;
      // console.log(
      //   `имя категории:`,
      //   name.dataset.category,
      //   `статус:`,
      //   name.dataset.status
      // );
    });

    filters.createItemsList();
  },
  changeStatusSizesCheckboxes(event) {
    if (event.target.checked) {
      // console.log("Checkbox is checked..");
      event.target.dataset.status = "on";
    } else if (!event.target.checked) {
      event.target.dataset.status = "off";
      // console.log("Checkbox is not checked..");
    }
    filters.sizesCheckboxes.forEach((name) => {
      forFilter.sizes[name.dataset.size] = name.dataset.status;
      // console.log(
      //   `имя категории:`,
      //   name.dataset.size,
      //   `статус:`,
      //   name.dataset.status
      // );
    });

    filters.createItemsList();
  },
};

filters.category.addEventListener("change", filters.changeStatusCatCheckboxes);
filters.sizes.addEventListener("change", filters.changeStatusSizesCheckboxes);
filters.searchInput.addEventListener(
  "input",
  _.throttle(filters.onSearchInput, 500)
);
filters.priceForm.addEventListener(
  "input",
  _.throttle(filters.onPriceFormInput, 500)
);
console.log(filters.priceSwitcher);
filters.priceSwitcher.addEventListener("click", filters.onpriceSwitcher);

//
//
//
//
//=======================================
//
//
//
//

// import products from "./catalog_data.js";
// const source = document.getElementById("entry-template").innerHTML;

// const template = Handlebars.compile(source);
// const forFilter = {
//   category: {},
//   sizes: {},
//   price: {},
// };

// const itemsList = [];
// const filters = {
//   readyToMarkUp: products,
//   searchInput: document.querySelector(".window__search"),
//   category: document.querySelector(".catloog__category-list"),
//   categoryCheckboxes: document.querySelectorAll(".catloog__category-checkbox"),
//   sizes: document.querySelector(".catloog__sizes-list"),
//   sizesCheckboxes: document.querySelectorAll(".catloog__sizes-checkbox"),
//   catalog: document.querySelector(".cards_list"),
//   priceForm: document.querySelector(".catloog__price-form"),
//   onPriceFormInput(event) {
//     forFilter.price[event.target.name] = event.target.value;
//     console.log(forFilter.price);
//     // filters.filter(forFilter);
//   },
//   onSearchInput(event) {
//     const onSearchInput = event.target.value.toLowerCase();

//     const filterFind = products.filter((item) =>
//       item.name.toLocaleLowerCase().includes(onSearchInput)
//     );
//     if (filterFind.length === 0 || onSearchInput.length === 0) {
//       return filters.createMarkUp(filters.readyToMarkUp);
//     }
//     filters.createMarkUp(filters.readyToMarkUp);
//     filters.createMarkUp(filterFind);
//   },
//   createItemsList() {
//     const entriesCategory = Object.entries(forFilter.category);
//     const entriesSizes = Object.entries(forFilter.sizes);
//     // forFilter.category {bandage: 'on'} => [['bandage', 'on']]
//     entriesCategory.forEach(([key, value]) => {
//       if (value === "off" && itemsList.includes(key)) {
//         const indexForRemove = itemsList.indexOf(key);
//         itemsList.splice(indexForRemove, 1);
//       } else if (value === "on" && !itemsList.includes(key)) {
//         itemsList.push(key);
//       }
//     });
//     entriesSizes.forEach(([key, value]) => {
//       if (value === "off" && itemsList.includes(key)) {
//         const indexForRemove = itemsList.indexOf(key);
//         itemsList.splice(indexForRemove, 1);
//         console.log(`!`);
//       } else if (value === "on" && !itemsList.includes(key)) {
//         itemsList.push(key);
//       }
//     });

//     filters.filter(itemsList);
//   },
//   filter(income) {
//     console.log(products[2].sizes);
//     if (income.length === 0) {
//       filters.createMarkUp(products);
//       console.log(`createMarkUp`);
//     } else {
//       // const filteredByCategory = products.filter((product) => {
//       //   return income.includes(product.category);
//       //   // return product.category.includes(...income);
//       filters.readyToMarkUp = products.filter((product) => {
//         for (let size of product.sizes) {
//           if (income.includes(product.category) && income.includes(size)) {
//             return true;
//           } else if (income.includes(size)) {
//             return true;
//           } else if (income.includes(product.category)) {
//             return true;
//           }

//           // if (income.includes(size)) {
//           //   return true;
//           // }
//           // if (income.includes(product.category)) {
//           //   return true;
//           // }
//         }
//         // console.log(product.sizes);
//         return income.includes(product.sizes);
//       });
//       console.log(forFilter);
//       return filters.createMarkUp(filters.readyToMarkUp);
//     }
//   },

//   createMarkUp(filtered) {
//     const cardsEl = template(filtered);

//     filters.catalog.innerHTML = "";
//     filters.catalog.insertAdjacentHTML("beforeend", cardsEl);
//   },
//   changeStatusCatCheckboxes(event) {
//     if (event.target.checked) {
//       // console.log("Checkbox is checked..");
//       event.target.dataset.status = "on";
//     } else if (!event.target.checked) {
//       event.target.dataset.status = "off";
//       // console.log("Checkbox is not checked..");
//     }
//     filters.categoryCheckboxes.forEach((name) => {
//       forFilter.category[name.dataset.category] = name.dataset.status;
//       // console.log(
//       //   `имя категории:`,
//       //   name.dataset.category,
//       //   `статус:`,
//       //   name.dataset.status
//       // );
//     });
//     console.log(forFilter);
//     filters.createItemsList();
//   },
//   changeStatusSizesCheckboxes(event) {
//     if (event.target.checked) {
//       // console.log("Checkbox is checked..");
//       event.target.dataset.status = "on";
//     } else if (!event.target.checked) {
//       event.target.dataset.status = "off";
//       // console.log("Checkbox is not checked..");
//     }
//     filters.sizesCheckboxes.forEach((name) => {
//       forFilter.sizes[name.dataset.size] = name.dataset.status;
//       // console.log(
//       //   `имя категории:`,
//       //   name.dataset.size,
//       //   `статус:`,
//       //   name.dataset.status
//       // );
//     });

//     filters.createItemsList();
//   },
// };

// filters.category.addEventListener("change", filters.changeStatusCatCheckboxes);
// filters.sizes.addEventListener("change", filters.changeStatusSizesCheckboxes);
// filters.searchInput.addEventListener(
//   "input",
//   _.throttle(filters.onSearchInput, 500)
// );
// filters.priceForm.addEventListener(
//   "input",
//   _.throttle(filters.onPriceFormInput, 500)
// );
