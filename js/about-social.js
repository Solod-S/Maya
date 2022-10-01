import social from "./about-social-data.js";
const source = document.getElementById("entry-template-about-solial").innerHTML;
const template = Handlebars.compile(source);

const feedbackRefs = {
  lodeMoreBtn: document.querySelector(".about-social__btn"),
  feedbacksCatalog: document.querySelector(".about-social__list"),
  feedBackStartFrom: 4,
  onLodeMoreBtn() {
    const showFeedBacks = [];
    for (
      let i = feedbackRefs.feedBackStartFrom;
      i < feedbackRefs.feedBackStartFrom + 4;
      i += 1
    ) {
      showFeedBacks.push(social[i]);
    }
    console.log(showFeedBacks);
    const cardsEl = template(showFeedBacks);
    this.feedBackStartFrom += 4;
    this.feedbacksCatalog.insertAdjacentHTML("beforeend", cardsEl);
    if (social.length <= this.feedBackStartFrom) {
      this.lodeMoreBtn.disabled = true;
      this.lodeMoreBtn.classList.add("disabled");
    }
  },
};
feedbackRefs.lodeMoreBtn.addEventListener(
  "click",
  feedbackRefs.onLodeMoreBtn.bind(feedbackRefs)
);
