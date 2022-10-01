const STORAGE_KEY = "inputLocallStorageKey";
const catalogRefs = {
  // bandageEl: document.querySelector(".js-bandage"),
  // braEl: document.querySelector(".js-bra"),
  // pantiesEl: document.querySelector(".js-panties"),
  // othersEl: document.querySelector(".js-others"),
  catalog: document.querySelector(".main-catalog__list"),
  linkElements: document.querySelectorAll(".main-catalog__link"),
  onLink(event) {
    console.log(event.currentTarget.dataset.name);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(event.currentTarget.dataset.name)
    );
  },
};
// console.log(catalogRefs.linkElements);
catalogRefs.linkElements.forEach((el) =>
  el.addEventListener("click", catalogRefs.onLink)
);
