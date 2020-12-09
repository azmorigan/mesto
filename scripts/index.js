// Попап редактирования профиля
let popup = document.querySelector('.popup')
let editPopup = document.querySelector('.profile__edit-button')
let closePopup = document.querySelector('.popup__close')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
// Форма
let formElement = document.querySelector('.form')
let popupAddCard = document.querySelector('.popup_type_add-card')
// Попап добавления карточек
let buttonClosePopupAddCard = document.querySelector('.popup__close_type_add-card')
// Имя и деятельность в input
let nameInput = formElement.name
let jobInput = formElement.job
// template карточки
const templateCard = document.querySelector('#template-card')
// Список карточек
const listCards = document.querySelector('.elements__list')
// Кнопка открытия формы добавления карточки
const editPopupAddCardButton = document.querySelector('.profile__add-button')
// Форма добавления карточек
const formAddCard = document.querySelector('.form_type_add-card')
// Название карточки и ссылка на картинку через input
const placeInput = formAddCard.place
const linkInput = formAddCard.link
// 6 карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  },
  {
    name: 'Петропавловск-Камчатский',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Новороссийск',
    link: './images/novorossiysk.jpg'
  }
]
// Отрисовать 6 карточек
function renderList() {
  const defaultList = initialCards.map(composeItem)
  listCards.append(...defaultList)
}
// Составить элемент используя свойства объектов
function composeItem(item) {
  const newItem = templateCard.content.cloneNode(true)
  const itemSrc = newItem.querySelector('.element__img')
  itemSrc.setAttribute('src', `${item.link}`)
  itemSrc.setAttribute('alt', `${item.name}`)
  const itemPlace = newItem.querySelector('.element__title')
  itemPlace.textContent = item.name
  const removeCardButton = newItem.querySelector('.element__remove')
  removeCardButton.addEventListener('click', removeItem)
  const likeButton = newItem.querySelector('.element__like')
  likeButton.addEventListener('click', likeCard)
  return newItem
}
// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}
// Удалить карту
function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}
// Добавить новую карту
function addNewItem() {
  const newItem = composeItem({ name: placeInput.value, link: linkInput.value })
  listCards.prepend(newItem)
}
// Открыть или закрыть попап для редактирования профиля
function togglePopup() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  popup.classList.toggle('popup_opened')
}
// Открыть попап для добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened')
}
// Закрыть попап для добавления карточки
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened')
}
// Замена имени и деятельности с помощью формы
function formSubmitHandler(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value
  togglePopup()
}
// Добавить карту по клику
function formSubmitHandlerAddNewItem(evt) {
  evt.preventDefault()
  addNewItem()
  closePopupAddCard()
  placeInput.value = ""
  linkInput.value = ""
}
// Основные события
renderList()
editPopup.addEventListener('click', togglePopup)
closePopup.addEventListener('click', togglePopup)
editPopupAddCardButton.addEventListener('click', openPopupAddCard)
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard)
formElement.addEventListener('submit', formSubmitHandler)
formAddCard.addEventListener('submit', formSubmitHandlerAddNewItem)
