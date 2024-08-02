import { delCardServer, addLike, removeLike } from "./api.js";


export const createCard = (myId, data, delCard, addRemoveCard, clickImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardData = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardImage = cardData.querySelector('.card__image');
  const cardTitle = cardData.querySelector('.card__title');
  const cardDelButton = cardData.querySelector('.card__delete-button');
  const cardLikeButton = cardData.querySelector('.card__like-button');
  const likeScore = cardData.querySelector('.card__like-score');
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeScore.textContent = data.likes.lenght;

  if (data.owner._id === myId) {
    cardDelButton.style.display = "block";
  } else {
    cardDelButton.style.display = "none";
  } 

  const dataLikeCard = (data) => {
    return data.likes.some((like) => {
      return like._id === myId;
    });
  };

  if (dataLikeCard(data)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else { 
    cardLikeButton.classList.remove('card__like-button_is-active');
  }
  
  cardDelButton.addEventListener('click', () => delCard(data, cardData));
  cardLikeButton.addEventListener('click', () => addRemoveCard(data, cardData));
  cardImage.addEventListener('click', () => clickImage(data.link, data.name));

  return cardData;
}

// @todo: Функция удаления карточки
export const delCard = (data, cardData) => {
  delCardServer(data._id)
    .then(() => cardData.remove())
    .catch((err) => console.log(err));
}


// @todo: Функция лайка карточки
export const addRemoveCard = (data, cardData) => {

  const cardLikeButton = cardData.querySelector('.card__like-button');
  const likeScore = cardData.querySelector('.card__like-score');
  
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    removeLike(data._id)
      .then((likesData) => {
        likeScore.textContent = likesData.likes.length;
        cardLikeButton.classList.remove('card__like-button_is-active');
      })

      .catch((err) => console.log(err));

  } else {
    addLike(data._id)
      .then((likesData) => {
        likeScore.textContent = likesData.likes.length;
        cardLikeButton.classList.add('card__like-button_is-active');
      })

      .catch((err) => console.log(err));
  }
}

