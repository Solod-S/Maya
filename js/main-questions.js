const question = {
  btnElts: document.querySelectorAll(".main-questions__btn"),

  toggleMsg(event) {
    if (event.currentTarget.nodeName !== "BUTTON") {
      return;
    }
    const activeEl = document.querySelector(".active");

    const currentTargetIsActive =
      event.currentTarget.nextElementSibling.classList.value ===
      "main-questions__context-msg active";
    if (currentTargetIsActive) {
      activeEl.classList.remove("active");
      return;
    }

    if (activeEl) {
      activeEl.classList.remove("active");
      event.currentTarget.nextElementSibling.classList.toggle("active");
    } else {
      event.currentTarget.nextElementSibling.classList.toggle("active");
    }
  },
};
question.btnElts.forEach((el) =>
  el.addEventListener("click", question.toggleMsg.bind(question))
);