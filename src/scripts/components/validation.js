export function showInputError(
  validationData,
  formElement,
  inputElement,
  errorMessage
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationData.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationData.errorClass);
}

export function hideInputError(validationData, formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationData.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(validationData.errorClass);
}

function isValid(validationData, formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      validationData,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationData, formElement, inputElement);
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};
const enableSubmitButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

export function toggleButtonState(validationData, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationData);
  } else {
    enableSubmitButton(buttonElement, validationData);
  }
}

export function setEventListeners(validationData, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationData.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(validationData, formElement, inputElement);
      toggleButtonState(validationData, inputList, buttonElement);
    });
  });
}

export function enableValidation(validationData) {
  const formList = Array.from(
    document.querySelectorAll(validationData.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(validationData, formElement);
  });
}

export function clearValidation(formElement, validationData) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationData.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(validationData, formElement, inputElement);
    inputElement.setCustomValidity("");
  });
  disableSubmitButton(buttonElement, validationData);
}
