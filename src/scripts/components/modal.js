const closePopupWhenPressEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};

export const openPopup = (popup) => {
  document.addEventListener("keydown", closePopupWhenPressEsc);
  popup.classList.add("popup_is-opened");
};
export const closePopup = (popup) => {
  document.removeEventListener("keydown", closePopupWhenPressEsc);
  popup.classList.remove("popup_is-opened");
};
export const addEventListenerFunction = (popupElement) => {
  // ищем кнопку крестик в попапе
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupElement);
  });
  popupElement.addEventListener("mousedown", (evt) => {
    // если event.target содержит класс "popup", то закрываем
    const hasClass = evt.target.classList.contains("popup");
    if (hasClass) {
      closePopup(popupElement);
    }
  });
};
