// Настройка валидации

const validationStructure = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Валидация
const enableValidation = (validationStructure) => {
  const formList = Array.from(
    document.querySelectorAll(validationStructure.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationStructure);
  });
};

// Показать сообщение об ошибке
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationStructure
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement && errorElement) {
    inputElement.classList.add(validationStructure.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationStructure.errorClass);
  }
};

// Скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, validationStructure) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationStructure.inputErrorClass);
    errorElement.classList.remove(validationStructure.errorClass);
    errorElement.textContent = "";
  }
};

// Проверка инпута на валидность
const checkValid = (formElement, inputElement, validationStructure) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationStructure
    );
  } else {
    hideInputError(formElement, inputElement, validationStructure);
  }
};

// Проверка на отсутствие невалидных полей
const invalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Обработчик событий
const setEventListeners = (formElement, validationStructure) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationStructure.inputSelector)
  );

  const submitButton = formElement.querySelector(
    validationStructure.submitButtonSelector
  );

  buttonState(inputList, submitButton, validationStructure);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValid(formElement, inputElement, validationStructure);
      buttonState(inputList, submitButton, validationStructure);
    });
  });
};

// Переключение активности кнопки
const buttonState = (inputList, submitButton, validationStructure) => {
  if (invalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(validationStructure.inactiveButtonClass);
  } else if (submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove(validationStructure.inactiveButtonClass);
  }
};

// Удаление ошибок валидации и дизактивация кнопки
const clearValidation = (formElement, validationStructure) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationStructure.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationStructure.submitButtonSelector
  );

  buttonState(inputList, submitButton, validationStructure);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationStructure);
  });
};

export { validationStructure, enableValidation, clearValidation };
