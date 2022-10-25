const CATALOG_KEY = "inputLocallStorageKey";
const NOVELTIES_KEY = "inputLocallStorageKeyForNewProducts";
const showProductFromLink = {
  linkElements: document.querySelectorAll(".main-catalog__link"),
  onLink(event) {
    localStorage.setItem(
      CATALOG_KEY,
      JSON.stringify(event.currentTarget.dataset.name)
    );
  },
};

showProductFromLink.linkElements.forEach((el) =>
  el.addEventListener("click", showProductFromLink.onLink)
);

const showNewProductFromLink = {
  linkElements: document.querySelectorAll(".main-novelties__link"),
  onLink(event) {
    localStorage.setItem(
      NOVELTIES_KEY,
      JSON.stringify(event.currentTarget.dataset.name)
    );
  },
};
showNewProductFromLink.linkElements.forEach((el) =>
  el.addEventListener("click", showNewProductFromLink.onLink)
);
