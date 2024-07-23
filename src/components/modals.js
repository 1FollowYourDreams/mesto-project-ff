
//Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
  popupElement.addEventListener('click', closeModalOverlay);
  const popupClose = popupElement.querySelector('.popup__close');
  popupClose.addEventListener('click', () => closeModal(popupElement));
}

//Функция закрытие модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  popupElement.removeEventListener('click', closeModalOverlay);
  const popupClose = popupElement.querySelector('.popup__close');
  popupClose.removeEventListener('click', () => closeModal(popupElement));
}

//Закрытие попапа кликом на оверлей
function closeModalOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
} 
}


//Закрытие попапа нажатием на Esc
function closeModalEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}