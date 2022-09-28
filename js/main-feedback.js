import feedbacks from "./main-feedback-data.js";
const source = document.getElementById("entry-template-feedback").innerHTML;
const template = Handlebars.compile(source);

const feedbackRefs = {
  lodeMoreBtn: document.querySelector(".main-feedback__btn"),
  feedbacksCatalog: document.querySelector(".main-feedback__list"),
  feedBackStartFrom: 4,
  onLodeMoreBtn() {
    const showFeedBacks = [];
    for (
      let i = feedbackRefs.feedBackStartFrom;
      i < feedbackRefs.feedBackStartFrom + 4;
      i += 1
    ) {
      showFeedBacks.push(feedbacks[i]);
    }
    console.log(showFeedBacks);
    const cardsEl = template(showFeedBacks);
    this.feedBackStartFrom += 4;
    this.feedbacksCatalog.insertAdjacentHTML("beforeend", cardsEl);
    if (feedbacks.length <= this.feedBackStartFrom) {
      this.lodeMoreBtn.disabled = true;
      this.lodeMoreBtn.classList.add("disabled");
    }
  },
};
feedbackRefs.lodeMoreBtn.addEventListener(
  "click",
  feedbackRefs.onLodeMoreBtn.bind(feedbackRefs)
);
