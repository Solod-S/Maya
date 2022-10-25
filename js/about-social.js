import social from "./services/data/about-social-data.js";
const source = document.getElementById("entry-template-about-solial").innerHTML;
const template = Handlebars.compile(source);

const custumersInstagramFeedBacks = {
  lodeMoreBtn: document.querySelector(".about-social__btn"),
  feedbacksCatalog: document.querySelector(".about-social__list"),
  feedBackStartFrom: 4,
  onLodeMoreBtn() {
    let { feedBackStartFrom, feedbacksCatalog } = this;
    const feedBacksToShow = [];
    for (let i = feedBackStartFrom; i < feedBackStartFrom + 4; i += 1) {
      feedBacksToShow.push(social[i]);
    }

    const cardsEl = template(feedBacksToShow);
    this.feedBackStartFrom += 4;
    feedbacksCatalog.insertAdjacentHTML("beforeend", cardsEl);
    if (social.length <= this.feedBackStartFrom) {
      this.lodeMoreBtn.disabled = true;
      this.lodeMoreBtn.classList.add("disabled");
    }
  },
};
custumersInstagramFeedBacks.lodeMoreBtn.addEventListener(
  "click",
  custumersInstagramFeedBacks.onLodeMoreBtn.bind(custumersInstagramFeedBacks)
);
