import optionsForNotiflix from "./services/notiflix-options.js";
Notiflix.Notify.init(optionsForNotiflix);
(() => {
  const subscribeForm = {
    form: document.querySelector(".subscribe-form"),
    subscribeBtn: document.querySelector(".subscribe-form__btn"),
    onSubscribeForm(event) {
      event.preventDefault();
      if (event.target.elements.email.value === "") {
        Notiflix.Notify.failure("Внимание! Заполните поле ввода....");
        console.log(`Внимание! Заполните поле ввода...`);
        return;
      }
      const capturedData = new FormData(event.currentTarget);
      const saveData = {};
      capturedData.forEach((value, key) => {
        saveData[key] = value;
      });

      Notiflix.Notify.info("Спасибо за подписку =)");
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
