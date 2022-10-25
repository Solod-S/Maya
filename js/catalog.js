import products from "./services/data/catalog_data.js";
const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);
const currentSearch = JSON.parse(localStorage.getItem("inputLocallStorageKey"));
// переменная с сохраненым ключем с главной страницы (когда мы кликнули на главной на какую категорию мы хотим попасть)
const currentSearchNewProducts = JSON.parse(
  localStorage.getItem("inputLocallStorageKeyForNewProducts")
);
// переменная с сохраненым ключем с главной страницы (когда мы кликнули на главной на какую категорию мы хотим попасть)
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
  showNewProductEL: document.querySelector(".window__price-checkbox-new"),
  checkingActiveCategoryForFilter() {
    this.readyToMarkUp = products.filter((product) => {
      for (let [name, value] of Object.entries(forFilter.category)) {
        if (product.category === name && value === "on") {
          return true;
        }
      }
    });
  },
  checkingActiveSizesForFilter() {
    this.readyToMarkUp = this.readyToMarkUp.filter((product) => {
      for (let size of product.sizes) {
        for (let [name, value] of Object.entries(forFilter.sizes)) {
          if (size === name && value === "on") {
            return true;
          }
        }
      }
    });
  },
  checkingActivePriceDiapasons() {
    this.readyToMarkUp = this.readyToMarkUp.filter(
      (product) =>
        product.price >= forFilter.price.from &&
        product.price <= forFilter.price.to
    );
  },
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
  sortForNewProducts() {
    const ready = this.readyToMarkUp.filter((product) => product.new === true);

    return this.createMarkUp(ready);
  },
  onshowNewProduct() {
    const { dataset, readyToMarkUp } = this.showNewProductEL;
    dataset.status === "on"
      ? (dataset.status = "off")
      : (dataset.status = "on");
    const showNewProduct = dataset.status === "on";
    const doNotShowNewProduct = dataset.status === "off";
    if (showNewProduct) {
      this.sortForNewProducts();
    }
    if (doNotShowNewProduct) {
      (readyToMarkUp = products), this.createMarkUp(readyToMarkUp);
    }
  },
  onpriceSwitcher() {
    const minPrice = this.priceSwitcher.dataset.status === "min";
    const maxPrice = this.priceSwitcher.dataset.status === "max";
    const { sortForMaxPrice } = this;
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
    this.filter();
  },
  onSearchInput(event) {
    const { readyToMarkUp } = this;
    const onSearchInput = event.target.value.toLowerCase();

    const filterFind = products.filter((item) =>
      item.name.toLocaleLowerCase().includes(onSearchInput.trim())
    );
    if (filterFind.length === 0 || onSearchInput.length === 0) {
      return this.createMarkUp(readyToMarkUp);
    }
    this.createMarkUp(readyToMarkUp);
    this.createMarkUp(filterFind);
  },
  createItemsList() {
    const entriesCategory = Object.entries(forFilter.category);
    const entriesSizes = Object.entries(forFilter.sizes);

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
      this.checkingActiveCategoryForFilter();
      if (sizesActive) {
        this.checkingActiveSizesForFilter();
      }
    }
    if (!categoryActive) {
      this.readyToMarkUp = products;
    }
    if (sizesActive) {
      this.checkingActiveSizesForFilter();
    }
    this.checkingActivePriceDiapasons();
    return this.createMarkUp(this.readyToMarkUp);
  },

  createMarkUp(filtered) {
    const cardsEl = template(filtered);

    this.catalog.innerHTML = "";
    this.catalog.insertAdjacentHTML("beforeend", cardsEl);
  },
  changeStatusCatCheckboxes(event) {
    const { checked, dataset } = event.target;
    const { categoryCheckboxes } = this;
    if (checked) {
      dataset.status = "on";
    } else if (!checked) {
      dataset.status = "off";
    }
    categoryCheckboxes.forEach((name) => {
      forFilter.category[name.dataset.category] = name.dataset.status;
    });

    this.createItemsList();
  },
  changeStatusSizesCheckboxes(event) {
    const { target } = event;
    if (target.checked) {
      target.dataset.status = "on";
    } else if (!target.checked) {
      target.dataset.status = "off";
    }
    this.sizesCheckboxes.forEach((name) => {
      forFilter.sizes[name.dataset.size] = name.dataset.status;
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
filters.showNewProductEL.addEventListener(
  "change",
  filters.onshowNewProduct.bind(filters)
);

if (currentSearch) {
  const selected = document.querySelector(`[data-category=${currentSearch}]`);
  selected.click();

  localStorage.removeItem("inputLocallStorageKey");
}

if (currentSearchNewProducts) {
  const selected = document.querySelector(
    `[data-category=${currentSearchNewProducts}]`
  );
  selected.click();
  filters.showNewProductEL.click();
  localStorage.removeItem("inputLocallStorageKeyForNewProducts");
}
