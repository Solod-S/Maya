import products from "./catalog_data.js";
const source = document.getElementById("entry-template").innerHTML;

const template = Handlebars.compile(source);
const forFilter = {
  category: {},
  sizes: {},
};

const itemsList = [];
const filters = {
  category: document.querySelector(".catloog__category-list"),
  categoryCheckboxes: document.querySelectorAll(".catloog__category-checkbox"),
  sizes: document.querySelector(".catloog__sizes-list"),
  sizesCheckboxes: document.querySelectorAll(".catloog__sizes-checkbox"),
  catalog: document.querySelector(".cards_list"),
  createItemsList() {
    const entriesCategory = Object.entries(forFilter.category);
    // forFilter.category {bandage: 'on'} => [['bandage', 'on']]
    entriesCategory.forEach(([key, value]) => {
      if (value === "off" && itemsList.includes(key)) {
        const indexForRemove = itemsList.indexOf(key);
        itemsList.splice(indexForRemove, 1);
        console.log(`!`);
      } else if (value === "on" && !itemsList.includes(key)) {
        itemsList.push(key);
      }
    });
    filters.filterCatgory(itemsList);

    console.log(itemsList);
  },
  filterCatgory(income) {
    if (income.length === 0) {
      filters.createMarkUp(products);
    } else {
      const filteredByCategory = products.filter((product) => {
        return income.includes(product.category);
        // return product.category.includes(...income);
      });
      console.log(`я запустилась`);

      return filters.createMarkUp(filteredByCategory);
    }
  },
  // filterCatgory(income) {
  //   if (income.length === 0) {
  //     filters.createMarkUp(products);
  //   } else {
  //     const filteredByCategory = products.filter((product) => {
  //       return income.includes(product.category);
  //       // return product.category.includes(...income);
  //     });
  //     console.log(`я запустилась`);

  //     return filters.createMarkUp(filteredByCategory);
  //   }
  // },
  createMarkUp(filtered) {
    // const filteredArrays = products.filter((product) =>
    //   product.filter.includes(selectedFilter)
    // );
    // console.log(template(filteredArrays));
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
    // console.log(forFilter);
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
    console.log(forFilter.sizes);
    filters.createItemsList;
  },
};

filters.category.addEventListener("change", filters.changeStatusCatCheckboxes);
filters.sizes.addEventListener("change", filters.changeStatusSizesCheckboxes);
// filters.filter();
// console.log(products.filter((i) => i.name === "bra"));
