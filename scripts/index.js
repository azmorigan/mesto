// Попап редактирования профиля
const popup = document.querySelector('.popup')
const editPopup = document.querySelector('.profile__edit-button')
const closePopup = document.querySelector('.close-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
// Форма
const formElement = document.querySelector('.form')
const popupAddCard = document.querySelector('.popup_type_add-card')
// Попап добавления карточек
const buttonClosePopupAddCard = document.querySelector('.close-button_type_add-card')
// Имя и деятельность в input
let nameInput = formElement.name
let jobInput = formElement.job
// Список карточек
let listCards = document.querySelector('.elements__list')
// Кнопка открытия формы добавления карточки
const editPopupAddCardButton = document.querySelector('.profile__add-button')
// Форма добавления карточек
const formAddCard = document.querySelector('.form_type_add-card')
// Название карточки и ссылка на картинку через input
let placeInput = formAddCard.place
let linkInput = formAddCard.link
// 6 карточек
const initialCards = [
  {
    name: 'Улаганский район',
    link: './images/ulaganskiy-rayon.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinck.jpg'
  },
  {
    name: 'Москва',
    link: './images/moscow-city.jpg'
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
  const templateCard = document.querySelector('#template-card')
  const newItem = templateCard.content.cloneNode(true)
  const itemSrc = newItem.querySelector('.element__img')
  itemSrc.setAttribute('src', `${item.link}`)
  itemSrc.setAttribute('alt', `${item.name}`)
  const itemPlaceName = newItem.querySelector('.element__title')
  itemPlaceName.textContent = item.name
  const removeCardButton = newItem.querySelector('.element__remove')
  removeCardButton.addEventListener('click', removeItem)
  const likeButton = newItem.querySelector('.element__like')
  likeButton.addEventListener('click', likeCard)
  const itemImage = newItem.querySelector('.element__img')
  itemImage.addEventListener('click', () => {
    openModal(item.link, item.name)
  })
  const closeModalButton = document.querySelector('.modal__close-button')
  closeModalButton.addEventListener('click', closeModal)
  return newItem
}
// Открыть модальное окно

function openModal(img, name) {
  let modal = document.querySelector('.popup_type_modal')
  const imageModal = modal.querySelector('.modal__image')
  const nameModal = modal.querySelector('.modal__title')
  imageModal.src = img
  imageModal.alt = name
  nameModal.textContent = name
  // modal.classList.add('popup_opened')
  // - почему-то через добавление модификатора не срабатывает
  // хотя в девтулзах класс добавляется
  modal.style.opacity = '1'
  modal.style.visibility = 'visible'
}
// Закрыть модальное окно
function closeModal(event) {
  event.target.closest('.popup_type_modal').style.opacity = "0"
  event.target.closest('.popup_type_modal').style.visibility = "hidden"
  // modal.classList.remove('popup_opened')
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

