// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(data, delCard) {
  const cardData = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardDelButton = cardData.querySelector('.card__delete-button');
  const cardImage = cardData.querySelector('.card__image');
  cardData.querySelector('.card__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = 'Пейзажи и здания';

  cardDelButton.addEventListener('click', function () {
    delCard(cardDelButton);
  });

  return cardData;
}
// @todo: Функция удаления карточки
function delCard(cardDelButton) {
    const cardDelete = cardDelButton.closest('.card');
    cardDelete.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(data) {
placesList.append(createCard(data, delCard))
});