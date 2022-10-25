import feedbacks from "./services/data/main-feedback-data.js";
const source = document.getElementById("entry-template-feedback").innerHTML;
const template = Handlebars.compile(source);

const custumersFeedBacks = {
  lodeMoreBtn: document.querySelector(".main-feedback__btn"),
  feedbacksCatalog: document.querySelector(".main-feedback__list"),
  feedBackStartFrom: 4,
  onLodeMoreBtn() {
    let { feedBackStartFrom, feedbacksCatalog } = this;
    const feedBacksToShow = [];
    for (let i = feedBackStartFrom; i < feedBackStartFrom + 4; i += 1) {
      feedBacksToShow.push(feedbacks[i]);
    }
    const cardsEl = template(feedBacksToShow);
    this.feedBackStartFrom += 4;
    feedbacksCatalog.insertAdjacentHTML("beforeend", cardsEl);
    if (feedbacks.length <= this.feedBackStartFrom) {
      let { lodeMoreBtn } = this;
      lodeMoreBtn.disabled = true;
      lodeMoreBtn.classList.add("disabled");
    }
  },
};
custumersFeedBacks.lodeMoreBtn.addEventListener(
  "click",
  custumersFeedBacks.onLodeMoreBtn.bind(custumersFeedBacks)
);
