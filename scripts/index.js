// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(data, delCard) {
  const cardData = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardDelButton = cardData.querySelector('.card__delete-button');
  cardData.querySelector('.card__title').textContent = data.name;
  cardData.querySelector('.card__image').src = data.link;
  cardData.querySelector('.card__image').alt = data.name;

  cardDelButton.addEventListener('click', function () {
    delCard(cardDelButton);
  });

  return cardData;
}
// @todo: Функция удаления карточки
function delCard(cardDelButton) {
    const CardDelete = cardDelButton.closest('.card');
    CardDelete.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(data) {
placesList.append(createCard(data, delCard))
});