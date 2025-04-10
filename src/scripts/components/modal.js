// все попапы
const popups = document.querySelectorAll('.popup');

const closePopupWhenPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupWhenPressEsc);
  popup.classList.add('popup_is-opened');
}
export const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupWhenPressEsc);
  popup.classList.remove('popup_is-opened');
}
export const addEventListenerFunction = (popupElement) => {
 // ищем кнопку крестик в попапе
 const closeButton = popupElement.querySelector('.popup__close');
 closeButton.addEventListener("click", () => {
    closePopup(popupElement);
  });
  popupElement.addEventListener("mousedown", (evt) => {
    // если event.target содержит класс "popup", то закрываем
    const hasClass = evt.target.classList.contains('popup');
    if (hasClass) {
      closePopup(popupElement);
    } 
  });
}

const popupProfileEdit = document.querySelector('.popup_type_edit'); // попапРедактированияПрофия
const popupAddCard = document.querySelector('.popup_type_new-card'); // попапДобавленияКарточки
const popupImage = document.querySelector('.popup_type_image');// попапКартинки

addEventListenerFunction(popupProfileEdit);
addEventListenerFunction(popupAddCard);
addEventListenerFunction(popupImage);




// закрытие по клику на оверлей
popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  })
);


/*const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  // добавить класс открытия попапа
// добавить слушатель на кнопку Escape
  document.addEventListener('keydown', handleEscKeyUp);
  popup.classList.add('popup_opened');
};

export const closeModal= (modal) => {
  // удалить класс открытия попапа
 // удалить слушатель на кнопку Escape
  document.removeEventListener('keydown', handleEscKeyUp);
  popup.classList.remove('popup_opened');
 };
/*
export const функцияЧтобыПовеситьСлушатели = (элементПопапа) => {
 // ищем кнопку крестик в попапе
  крестик.addEventListener("click", () => {
    // closeModal(...)
  });

  элементПопапа.addEventListener("mousedown", (event) => {
    // если event.target содержит класс "popup", то закрываем
  });
}


const попапРедактированияПрофия = document.querySelector('...')
const попапДобавленияКарточки = document.querySelector('...')
const попапКартинки = document.querySelector('...')

функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия)
функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки )
функцияЧтобыПовеситьСлушатели(попапКартинки )
*/