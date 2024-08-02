import { delCardServer, addLike, removeLike } from "./api.js";

export const createCard = (myId, cardData, delCard, onLike, clickImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDelButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeScore = cardElement.querySelector('.card__like-score');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeScore.textContent = cardData.likes.length;
  
  if (cardData.owner._id === myId) {
    cardDelButton.style.display = "block";
  } else {
    cardDelButton.style.display = "none";
  } 

  const dataLikeCard = (cardData) => {
    return cardData.likes.some((like) => {
      return like._id === myId;
    });
  };

  if (dataLikeCard(cardData)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else { 
    cardLikeButton.classList.remove('card__like-button_is-active');
  }
  
  cardDelButton.addEventListener('click', () => delCard(cardData, cardElement));
  cardLikeButton.addEventListener('click', () => onLike(cardData, cardElement));
  cardImage.addEventListener('click', () => clickImage(cardData.link, cardData.name));

  return cardElement;
}

// @todo: Функция удаления карточки
export const delCard = (cardData, cardElement) => {
  delCardServer(cardData._id)
    .then(() => cardElement.remove())
    .catch((err) => console.log(err));
}

// @todo: Функция лайка карточки
export const onLike = (cardData, cardElement) => {
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeScore = cardElement.querySelector('.card__like-score');
  
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardData._id)
      .then((likesData) => {
        likeScore.textContent = likesData.likes.length;
        cardLikeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardData._id)
      .then((likesData) => {
        likeScore.textContent = likesData.likes.length;
        cardLikeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  }
}
