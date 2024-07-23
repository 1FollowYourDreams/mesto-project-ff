// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(data, delCard, likeCard, clickImage) {
  const cardData = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardDelButton = cardData.querySelector('.card__delete-button');
  const cardImage = cardData.querySelector('.card__image');
  cardData.querySelector('.card__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardDelButton.addEventListener('click', function () {
    delCard(cardDelButton);
  });

  const cardLikeButton = cardData.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton);
  });

  cardImage.addEventListener('click', function () {
    clickImage(data);
  });

  return cardData;
}

// @todo: Функция удаления карточки
export function delCard(cardDelButton) {
  const cardDelete = cardDelButton.closest('.card');
  cardDelete.remove();
}

// @todo: Функция лайка карточки

export function likeCard(cardLikeButton ) {
 
  cardLikeButton.classList.toggle('card__like-button_is-active')

}