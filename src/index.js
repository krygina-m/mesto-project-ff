import "./pages/index.css";

import { initialCards } from "./scripts/cards.js";

import { addCard, deleteCard, likeCard } from "./scripts/components/card.js";

import { openPopup, closePopup } from "./scripts/components/modal.js";

import { addEventListenerFunction } from "./scripts/components/modal.js";

import { enableValidation, clearValidation } from "./scripts/components/validation";

import {
  getUserInfo,
  getInitialCards,
  editUserInfo,
  addNewCard,
  removeCard,
  checkLikeCard,
  removeLikeCard,
  changeAvatar,
} from "./scripts/components/api.js";

let profileId;

function renderLoading(isLoading, element) {
  element.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

const validationData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardsContainer = document.querySelector(".places__list");
// @todo: Вывести карточки на страницу
function addInitCards(initialCards) {
  initialCards
  .map((card) => addCard(card, deleteCard, likeCard, handleImageClick))
  .forEach((card) => cardsContainer.append(card));
}

addInitCards(initialCards);


function renderUser(userData) {
  formName.textContent = userData.name;
  formJob.textContent = userData.about;
  avatarImage.style.backgroundImage = `url(${userData.avatar})`;
  profileId = userData._id;
}


const editPopupButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit"); //попап редактировния профиля
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const formEditProfile = document.querySelector(".popup_type_edit .popup__form"); //форма редактировния профиля

const popupAddCard = document.querySelector(".popup_type_new-card"); //попап добавления карточки
const popupImage = document.querySelector(".popup_type_image"); //попап просмотра картинки

const nameInput = formEditProfile.querySelector(".popup__input_type_name"); //поле редактирования имени
const jobInput = formEditProfile.querySelector(".popup__input_type_description"); //поле редактирования описание

const popupAvatarEdit = document.querySelector(".popup_type_change-avatar");
// формы 
const formNewCard = document.forms["new-place"];
const formEditCard = document.forms["edit-profile"];
const formEditAvatar = document.forms["update-avatar"];

const placeNameInput = formNewCard.elements["place-name"];
const linkInput = formNewCard.elements.link;
// кнопки открытия формы
const formNewCardButton = formNewCard.querySelector(".popup__button");
const formEditCardButton = formEditCard.querySelector(".popup__button");
const formEditAvatarButton = formEditAvatar.querySelector(".popup__button");
// форма профиля
const formProfile = document.querySelector(".profile__info"); //информация о профиле
const formName = formProfile.querySelector(".profile__title"); //имя
const formJob = formProfile.querySelector(".profile__description"); //описание
const avatarImage = document.querySelector(".profile__image");
//смена аватара
const urlAvatar = document.querySelector(".popup__input_type_url");

editPopupButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);

  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

addEventListenerFunction(popupProfileEdit);
addEventListenerFunction(popupAddCard);
addEventListenerFunction(popupImage);


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    renderUser(userData);
    addInitCards(cardsData);
  })
  .catch((err) => {
    console.error(`Ошибка загрузки данных: ${err}`);
  });
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


enableValidation(validationData);