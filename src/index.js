import './pages/index.css';
import { createCard, delCard, addRemoveCard } from './components/card.js';
import { openModal, closeModal, closeModalOverlay } from './components/modals.js';
import { getInfoUser, getInitialCards, editInfoUser, addCardServer, changeAvatar } from './components/api.js';
import { enableValidation, clearValidation  } from "./components/validation.js";


const container = document.querySelector('.places');
const placesList = container.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const typeEdit = document.querySelector('.popup_type_edit');
const popupForm = typeEdit.querySelector('.popup__form');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_description');
const popupButton = popupForm.querySelector('.popup__button');

const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addButton = document.querySelector('.profile__add-button');
const profileImageAvatar = document.querySelector('.profile__image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupFormAvatar = popupTypeAvatar.querySelector('.popup__form');
const typeUrlAvatar = popupFormAvatar.querySelector('.popup__input_type_url');
const popupButtonAvatar = popupFormAvatar.querySelector('.popup__button');

const typeNewCard = document.querySelector('.popup_type_new-card');
const popupFormCard = typeNewCard.querySelector('.popup__form');


const cardName = popupFormCard.querySelector(".popup__input_type_card-name");
const typeUrl = popupFormCard.querySelector(".popup__input_type_url");

const typeImage = document.querySelector('.popup_type_image');
const popupImage = typeImage.querySelector('.popup__image');
const popupCaption = typeImage.querySelector('.popup__caption');

const popupButtonCard = popupFormCard.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

let myId;

Promise.all([getInfoUser(), getInitialCards()])
.then(([userData, cardsAdd]) => {
  myId = userData._id;
  profileImageAvatar.style.backgroundImage = `url(\\${userData.avatar})`;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  cardsAdd.forEach((card) => {
    placesList.append(
      createCard(myId, card, delCard, addRemoveCard, clickImage)
    );
  });
})
.catch((err) => console.log(err));

function clickImage(imageLink, cardName) {
  popupImage.src = imageLink;
  popupImage.alt = cardName;
  popupCaption.textContent = cardName;
  openModal(typeImage);
  }


function addCardForm(evt) {
  evt.preventDefault();
  const saveButton = popupButtonCard.textContent;
  popupButtonCard.textContent = 'Сохранение...';
  addCardServer(cardName.value, typeUrl.value)
    .then((data) => {
      const newCard = createCard(myId, data, delCard, addRemoveCard, clickImage);
      placesList.prepend(newCard);
      closeModal(typeNewCard);
      popupFormCard.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => popupButtonCard.textContent = saveButton);
  }
  

function changeAvatarForm(evt) {
evt.preventDefault();
const saveButton = popupButtonAvatar.textContent;
popupButtonAvatar.textContent = 'Сохранение...';
changeAvatar (typeUrlAvatar.value)
  .then((avatarData) => {
    profileImageAvatar.style.backgroundImage = `url(${avatarData.avatar})`;
    closeModal(popupTypeAvatar);
  })
  .catch((err) => console.log(err))
  .finally(() => popupButtonAvatar.textContent = saveButton);
}


function editFormProfile(evt) {
evt.preventDefault();
const saveButton = popupButton.textContent;
popupButton.textContent = 'Сохранение...';
editInfoUser(nameInput.value, jobInput.value)
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(typeEdit);
  })
  .catch((err) => console.log(err))
  .finally(() => popupButton.textContent = saveButton);
}


popups.forEach(function(popup) {
const closeButton = popup.querySelector('.popup__close');
closeButton.addEventListener('click', function() {
  closeModal(popup);
});
popup.addEventListener('click', closeModalOverlay);
});


  popupFormAvatar.addEventListener('submit', changeAvatarForm);
  popupForm.addEventListener('submit', editFormProfile);
  popupFormCard.addEventListener('submit', addCardForm);

  
addButton.addEventListener('click', function() {
    popupFormCard.reset();
    clearValidation(popupFormCard, validationConfig);
    openModal(typeNewCard);
    });
    

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupForm, validationConfig);
  openModal(typeEdit);
  });


profileImageAvatar.addEventListener('click', function() {
popupFormAvatar.reset();
clearValidation(popupFormAvatar, validationConfig);
openModal(popupTypeAvatar);
});


enableValidation(validationConfig);
clearValidation(popupFormAvatar, validationConfig);
clearValidation(popupForm, validationConfig);
clearValidation(popupFormCard, validationConfig);