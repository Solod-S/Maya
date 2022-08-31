const source = document.getElementById("entry-template").innerHTML;

const template = Handlebars.compile(source);

console.log(template);

const filters = {
  catalog: document.querySelector(".catalog__nav-panel"),
  onFilterClick(event) {
    console.log("click");
  },
};

console.log(filters.catalog);

filters.catalog.addEventListener("click", filters.onFilterClick());
