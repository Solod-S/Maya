const question = {
  btnElts: document.querySelectorAll(".main-questions__btn"),

  toggleMsg(event) {
    const { currentTarget } = event;
    const activeEl = document.querySelector(".active");
    const iconEl = currentTarget.firstElementChild;
    const openedIconEl = document.querySelector(".opened");

    if (currentTarget.nodeName !== "BUTTON") {
      return;
    }

    if (openedIconEl) {
      openedIconEl.classList.toggle("opened");
      openedIconEl.textContent = "+";
    }
    iconEl.classList.toggle("opened");
    iconEl.textContent = "-";

    const currentTargetIsActive =
      currentTarget.nextElementSibling.classList.value ===
      "main-questions__context-msg active";
    if (currentTargetIsActive) {
      activeEl.classList.remove("active");
      return;
    }

    if (activeEl) {
      activeEl.classList.remove("active");
      currentTarget.nextElementSibling.classList.toggle("active");
    } else {
      currentTarget.nextElementSibling.classList.toggle("active");
    }
  },
};
question.btnElts.forEach((el) =>
  el.addEventListener("click", question.toggleMsg.bind(question))
);
