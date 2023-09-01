import optionsForNotiflix from "./services/notiflix-options.js";
Notiflix.Notify.init(optionsForNotiflix);
(() => {
  const subscribeForm = {
    form: document.querySelector(".subscribe-form"),
    subscribeBtn: document.querySelector(".subscribe-form__btn"),
    onSubscribeForm(event) {
      event.preventDefault();
      if (event.target.elements.email.value === "") {
        Notiflix.Notify.failure("Attention! Fill in the input field....");
        console.log(`Attention! Fill in the input field....`);
        return;
      }
      const capturedData = new FormData(event.currentTarget);
      const saveData = {};
      capturedData.forEach((value, key) => {
        saveData[key] = value;
      });

      Notiflix.Notify.info("Thanks for subscribing =)");
      console.log("Мы собрали данные ==>", saveData);
      event.currentTarget.reset();
      console.log(event.target.elements.email.value);
    },
  };
  subscribeForm.form.addEventListener(
    "submit",
    subscribeForm.onSubscribeForm.bind(subscribeForm)
  );
})();
