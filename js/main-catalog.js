const CATALOG_KEY = "inputLocallStorageKey";
const NOVELTIES_KEY = "inputLocallStorageKeyForNewProducts";
const catalogRefs = {
  // catalog: document.querySelector(".main-catalog__list"),
  linkElements: document.querySelectorAll(".main-catalog__link"),
  onLink(event) {
    console.log(event.currentTarget.dataset.name);
    localStorage.setItem(
      CATALOG_KEY,
      JSON.stringify(event.currentTarget.dataset.name)
    );
  },
};
// console.log(catalogRefs.linkElements);
catalogRefs.linkElements.forEach((el) =>
  el.addEventListener("click", catalogRefs.onLink)
);

const mainNovelties = {
  linkElements: document.querySelectorAll(".main-novelties__link"),
  onLink(event) {
    console.log(event.currentTarget.dataset.name);
    localStorage.setItem(
      NOVELTIES_KEY,
      JSON.stringify(event.currentTarget.dataset.name)
    );
  },
};
mainNovelties.linkElements.forEach((el) =>
  el.addEventListener("click", catalogRefs.onLink)
);
