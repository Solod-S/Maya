import products from "./catalog_data.js";
const source = document.getElementById("entry-template").innerHTML;

const template = Handlebars.compile(source);
const forFilter = {
  category: {},
  sizes: {},
};
const forMarkUp = [];
const filters = {
  category: document.querySelector(".catloog__category-list"),
  categoryCheckboxes: document.querySelectorAll(".catloog__category-checkbox"),
  sizes: document.querySelector(".catloog__sizes-list"),
  sizesCheckboxes: document.querySelectorAll(".catloog__sizes-checkbox"),
  catalog: document.querySelector(".cards_list"),
  strat() {
    const entriesCategory = Object.entries(forFilter.category);
    // forFilter.category {bandage: 'on'} => [['bandage', 'on']]
    entriesCategory.forEach(([key, value]) => {
      if (value === "off" && forMarkUp.includes(key)) {
        const indexForRemove = forMarkUp.indexOf(key);
        forMarkUp.splice(indexForRemove, 1);
        // console.log(forMarkUp);
      } else if (value === "on" && !forMarkUp.includes(key)) {
        forMarkUp.push(key);
      }
    });
    console.log(forMarkUp);
  },
  filter() {
    // const filtered = products.filter((product) =>
    //   product.category.includes("bra")
    // );
    // filters.createMarkUp(filtered);
    // console.log(filtered);

    const filteredByCategory = products.filter((product) =>
      product.category.includes("bandage")
    );
    filters.createMarkUp(filteredByCategory);
    // console.log(filteredByCategory);
  },
  createMarkUp(filtered) {
    // const filteredArrays = products.filter((product) =>
    //   product.filter.includes(selectedFilter)
    // );
    // console.log(template(filteredArrays));
    const cardsEl = template(filtered);

    filters.catalog.innerHTML = "";
    filters.catalog.insertAdjacentHTML("beforeend", cardsEl);
  },
  onCategoryChange(event) {
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
    // console.log(forFilter);
    filters.strat();
  },
  onSizesChange(event) {
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
    console.log(forFilter);
    filters.strat;
  },
};

filters.category.addEventListener("change", filters.onCategoryChange);
filters.sizes.addEventListener("change", filters.onSizesChange);
filters.filter();
// console.log(products.filter((i) => i.name === "bra"));
