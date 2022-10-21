const STORAGE_KEY = "inputLocallStorageKey";
import optionsForNotiflix from "./services/notiflix-options.js";
Notiflix.Notify.init(optionsForNotiflix);

const modalWindow = {
  form: document.querySelector(".modal__form"),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  sendModalBtn: document.querySelector(".modal__button"),
  checkBox: document.querySelector(".modal__checkbox-input"),
  modal: document.querySelector("[data-modal]"),
  body: document.querySelector("body"),
  formData: { ...JSON.parse(localStorage.getItem(STORAGE_KEY)) },

  toggleModal() {
    const { modal, body, onKeyPresEsq } = this;
    window.addEventListener("keydown", onKeyPresEsq);
    modal.classList.toggle("bacdrop--is-hidden");
    body.classList.toggle("no-scroll");
  },

  onKeyPresEsq(event) {
    const { modal, body, onKeyPresEsq } = modalWindow;
    const { code } = event;
    if (code === "Escape") {
      modal.classList.toggle("bacdrop--is-hidden");
      body.classList.toggle("no-scroll");
      window.removeEventListener("keydown", onKeyPresEsq);
    }
  },

  closeOnTargetClick(event) {
    const { currentTarget, target } = event;

    if (currentTarget === target) {
      modalWindow.toggleModal();
    }
  },

  onSubmit(event) {
    const { mail, name, policy, feedback, pnone } =
      event.currentTarget.elements;
    const { modal, body } = this;
    event.preventDefault();
    if (
      mail.value === "" ||
      name.value === "" ||
      !policy.checked === true ||
      feedback.value === "" ||
      pnone.value === ""
    ) {
      Notiflix.Notify.failure("Внимание! Все поля должны быть заполнены.");
      console.log(`Внимание! Все поля должны быть заполнены`);
      return;
    }
    const capturedData = new FormData(event.currentTarget);
    const saveData = {};
    capturedData.forEach((value, key) => {
      saveData[key] = value;
      modal.classList.toggle("bacdrop--is-hidden");
      body.classList.toggle("no-scroll");
    });

    Notiflix.Notify.info(
      "Мы собрали данные, скоро с Вами свяжиться наш менеджер"
    );
    console.log(`Мы собрали данные, скоро с Вами свяжиться наш менеджер`);
    console.log("Мы собрали данные ==>", saveData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  },

  onFormInput(event) {
    const { formData, checkBox } = this;
    const { name, value } = event.target;
    formData[name] = value;
    console.log(formData);
    if (checkBox.checked) {
      formData.policy = "on";
    } else if (!checkBox.checked) {
      formData.policy = "off";
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.formData));
  },

  populateTextareaMulti() {
    const { form, checkBox } = this;
    const parsedDataFromLocalStorage = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );
    if (!parsedDataFromLocalStorage) {
      return;
    } else if (parsedDataFromLocalStorage) {
      for (let element of form.elements) {
        const entris = Object.entries(parsedDataFromLocalStorage);
        if (element.name === "policy") {
          entris.forEach(([name, value]) => {
            if (name === "policy" && value === "on") {
              checkBox.checked = true;
            }
          });
        }
        entris.forEach(([name, value]) => {
          if (element.name === name) {
            element.value = value;
          }
        });
      }
    }
  },
};
modalWindow.populateTextareaMulti();

modalWindow.openModalBtn.addEventListener(
  "click",
  modalWindow.toggleModal.bind(modalWindow)
);
modalWindow.closeModalBtn.addEventListener(
  "click",
  modalWindow.toggleModal.bind(modalWindow)
);
modalWindow.modal.addEventListener(
  "click",
  modalWindow.closeOnTargetClick.bind(modalWindow)
);
modalWindow.form.addEventListener(
  "submit",
  modalWindow.onSubmit.bind(modalWindow)
);
modalWindow.form.addEventListener(
  "input",
  _.throttle(modalWindow.onFormInput.bind(modalWindow), 500)
);

console.log(modalWindow.openModalBtn);
console.log(`aaaaa`);
