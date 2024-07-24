import './pages/index.css';
import { initialCards } from './components/cards.js';
import { placesList, createCard, delCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modals.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close');

const typeEdit = document.querySelector('.popup_type_edit');
const typeNewCard = document.querySelector('.popup_type_new-card');
const popupForm = document.querySelector('.popup_type_edit .popup__form[name="edit-profile"]');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_description');
const newCard = document.querySelector('.popup_type_new-card .popup__form[name="new-place"]');

const cardName = newCard.querySelector(".popup__input_type_card-name");
const typeUrl = newCard.querySelector(".popup__input_type_url");

const typeImage = document.querySelector('.popup_type_image');
const popupImage = typeImage.querySelector('.popup__image');
const popupCaption = typeImage.querySelector('.popup__caption');



// @todo: Вывести карточки на страницу
initialCards.forEach(function(data) {
placesList.append(createCard(data, delCard, likeCard, clickImage))
});

//Редактирование


editButton.addEventListener('click', function() {
    openModal(typeEdit);
    setValues();
  });


  function setValues () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
  
  addButton.addEventListener('click', function() {
    openModal(typeNewCard);
  });

  function clickImage(data) {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
  
    openModal(typeImage)
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(typeEdit);
    popupForm.reset();
  }
  
  popupForm.addEventListener("submit", handleFormSubmit);

  function addCard(event) {
    event.preventDefault();
  
    const newCardData = {
      name: cardName.value,
      link: typeUrl.value,
    };

    const cardData = createCard(newCardData, delCard, likeCard, clickImage);
    placesList.prepend(cardData);
  
    closeModal(typeNewCard);
    newCard.reset();
  }
  newCard.addEventListener("submit", addCard);
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popupOpened = document.querySelector('.popup_is-opened');
      if (popupOpened) {
        closeModal(popupOpened);
      }
    });
  });