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
  priceSwitcherIcon: document.querySelector(".window__toggl-icon"),
  sortForMinPrice() {
    this.readyToMarkUp = _.sortBy(
      this.readyToMarkUp,
      (product) => product.price
    );
    this.priceSwitcher.dataset.status = "max";
    return this.createMarkUp(this.readyToMarkUp);
  },
  sortForMaxPrice() {
    this.readyToMarkUp = _.sortBy(
      this.readyToMarkUp,
      (product) => product.price
    ).reverse();
    this.priceSwitcher.dataset.status = "min";
    return this.createMarkUp(this.readyToMarkUp);
  },
  onpriceSwitcher() {
    // this.readyToMarkUp = this.readyToMarkUp.sort((a, b) => a - b);
    // _.sortBy(this.readyToMarkUp, this.readyToMarkUp.price);
    // this.readyToMarkUp = _.sortBy(
    //   this.readyToMarkUp,
    //   (product) => product.price
    // );

    const minPrice = this.priceSwitcher.dataset.status === "min";
    const maxPrice = this.priceSwitcher.dataset.status === "max";

    if (maxPrice) {
      this.sortForMaxPrice();
      this.priceSwitcherIcon.style = "transform: rotate(360deg)";
    }
    if (minPrice) {
      this.sortForMinPrice();
      this.priceSwitcherIcon.style = "";
    }
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
    this.filter();
  },
  onSearchInput(event) {
    const onSearchInput = event.target.value.toLowerCase();

    const filterFind = products.filter((item) =>
      item.name.toLocaleLowerCase().includes(onSearchInput.trim())
    );
    if (filterFind.length === 0 || onSearchInput.length === 0) {
      return this.createMarkUp(this.readyToMarkUp);
    }
    this.createMarkUp(this.readyToMarkUp);
    this.createMarkUp(filterFind);
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

    this.filter();
  },
  filter() {
    const categoryActive = Object.values(forFilter.category).includes("on");
    const sizesActive = Object.values(forFilter.sizes).includes("on");
    if (categoryActive) {
      this.readyToMarkUp = products.filter((product) => {
        for (let [name, value] of Object.entries(forFilter.category)) {
          // console.log(product.category, name, value);
          if (product.category === name && value === "on") {
            return true;
          }
        }
      });
      if (sizesActive) {
        this.readyToMarkUp = this.readyToMarkUp.filter((product) => {
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
      this.readyToMarkUp = products;
    }
    if (sizesActive) {
      this.readyToMarkUp = this.readyToMarkUp.filter((product) => {
        for (let size of product.sizes) {
          for (let [name, value] of Object.entries(forFilter.sizes)) {
            if (size === name && value === "on") {
              return true;
            }
          }
        }
      });
    }

    this.readyToMarkUp = this.readyToMarkUp.filter((product) => {
      if (
        product.price >= forFilter.price.from &&
        product.price <= forFilter.price.to
      ) {
        return true;
      }
    });
    return this.createMarkUp(this.readyToMarkUp);
  },

  createMarkUp(filtered) {
    const cardsEl = template(filtered);

    this.catalog.innerHTML = "";
    this.catalog.insertAdjacentHTML("beforeend", cardsEl);
  },
  changeStatusCatCheckboxes(event) {
    if (event.target.checked) {
      // console.log("Checkbox is checked..");
      event.target.dataset.status = "on";
    } else if (!event.target.checked) {
      event.target.dataset.status = "off";
      // console.log("Checkbox is not checked..");
    }
    this.categoryCheckboxes.forEach((name) => {
      forFilter.category[name.dataset.category] = name.dataset.status;
      // console.log(
      //   `имя категории:`,
      //   name.dataset.category,
      //   `статус:`,
      //   name.dataset.status
      // );
    });

    this.createItemsList();
  },
  changeStatusSizesCheckboxes(event) {
    if (event.target.checked) {
      // console.log("Checkbox is checked..");
      event.target.dataset.status = "on";
    } else if (!event.target.checked) {
      event.target.dataset.status = "off";
      // console.log("Checkbox is not checked..");
    }
    this.sizesCheckboxes.forEach((name) => {
      forFilter.sizes[name.dataset.size] = name.dataset.status;
      // console.log(
      //   `имя категории:`,
      //   name.dataset.size,
      //   `статус:`,
      //   name.dataset.status
      // );
    });

    this.createItemsList();
  },
};

filters.category.addEventListener(
  "change",
  filters.changeStatusCatCheckboxes.bind(filters)
);
filters.sizes.addEventListener(
  "change",
  filters.changeStatusSizesCheckboxes.bind(filters)
);
filters.searchInput.addEventListener(
  "input",
  _.throttle(filters.onSearchInput.bind(filters), 500)
);
filters.priceForm.addEventListener(
  "input",
  _.throttle(filters.onPriceFormInput.bind(filters), 500)
);
filters.priceSwitcher.addEventListener(
  "change",
  filters.onpriceSwitcher.bind(filters)
);

const currentSearch = JSON.parse(localStorage.getItem("inputLocallStorageKey"));
// переменная с сохраненым ключем с главной страницы (когда мы кликнули на главной на какую категорию мы хотим попасть)
if (currentSearch) {
  const selected = document.querySelector(`[data-category=${currentSearch}]`);
  selected.click();
  localStorage.removeItem("inputLocallStorageKey");
}
