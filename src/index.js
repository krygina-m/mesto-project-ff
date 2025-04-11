import "./pages/index.css";

import { initialCards } from "./scripts/cards.js";

import { addCard, deleteCard, likeCard } from "./scripts/components/card.js";

import { openPopup, closePopup } from "./scripts/components/modal.js";

import { addEventListenerFunction } from "./scripts/components/modal.js";

const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards
  .map((card) => addCard(card, deleteCard, likeCard, handleImageClick))
  .forEach((card) => cardsContainer.append(card));

const editPopupButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit"); //попап редактировния профиля
const cardAddButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const formEditProfile = document.querySelector(".popup_type_edit .popup__form"); //форма редактировния профиля

const popupAddCard = document.querySelector(".popup_type_new-card"); //попап добавления карточки
const popupImage = document.querySelector(".popup_type_image"); //попап просмотра картинки

const nameInput = formEditProfile.querySelector(".popup__input_type_name"); //поле редактирования имени
const jobInput = formEditProfile.querySelector(".popup__input_type_description"); //поле редактирования описание

// форма профиля
const formProfile = document.querySelector(".profile__info"); //информация о профиле
const formName = formProfile.querySelector(".profile__title"); //имя
const formJob = formProfile.querySelector(".profile__description"); //описание

editPopupButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);

  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

addEventListenerFunction(popupProfileEdit);
addEventListenerFunction(popupAddCard);
addEventListenerFunction(popupImage);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  // Вставьте новые значения с помощью textContent\
  formName.textContent = name;
  formJob.textContent = job;

  closePopup(popupProfileEdit);
  formEditProfile.reset();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ЧЕРЕЗ ФОРМУ
const formCardAdd = popupAddCard.querySelector(".popup__form");
const nameCardInput = formCardAdd.querySelector(".popup__input_type_card-name");
const urlInput = formCardAdd.querySelector(".popup__input_type_url");

function handleFormAddCard(evt) {
  evt.preventDefault();

  const name = nameCardInput.value;
  const link = urlInput.value;

  const newCard = addCard(
    { name, link },
    deleteCard,
    likeCard,
    handleImageClick
  );
  cardsContainer.prepend(newCard);

  closePopup(popupAddCard);

  formCardAdd.reset();
}

formCardAdd.addEventListener("submit", handleFormAddCard);

//ОТКРЫТИЕ МОДАЛКИ С КАРТИНКОЙ
const imageInPopup = popupImage.querySelector(".popup__image");
const captionInPopup = popupImage.querySelector(".popup__caption");

export function handleImageClick(cardData) {
  imageInPopup.src = cardData.link;
  imageInPopup.alt = cardData.name;
  imageInPopup.textContent = cardData.name;
  captionInPopup.textContent = cardData.name;

  openPopup(popupImage);
}
