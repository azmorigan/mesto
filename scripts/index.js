// Попап редактирования профиля
const popupChangeProfile = document.querySelector('.popup')
const editPopupChangeProfileButton = document.querySelector('.profile__edit-button')
const closePopupChangeProfileButton = document.querySelector('.close-button')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const formChangeProfile = document.querySelector('.form')
const nameInputChangeProfile = formChangeProfile.name
const jobInputChangeProfile = formChangeProfile.job
// Попап добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card')
const closePopupAddCardButton = document.querySelector('.close-button_type_add-card')
const openPopupAddCardButton = document.querySelector('.profile__add-button')
const formAddCard = document.querySelector('.form_type_add-card')
const placeInputAddCard = formAddCard.place
const linkInputAddCard = formAddCard.link
// Попап изображения
const popupImage = document.querySelector('.popup_type_modal')
// Список карточек
const listCards = document.querySelector('.elements__list')
// Шаблон карточки
const templateCard = document.querySelector('#template-card')

// Составить элемент используя свойства объектов
function createCard(item) {
  const newCard = templateCard.content.cloneNode(true)
  const cardSrc = newCard.querySelector('.element__img')
  cardSrc.setAttribute('src', `${item.link}`)
  cardSrc.setAttribute('alt', `${item.name}`)
  const cardPlaceName = newCard.querySelector('.element__title')
  cardPlaceName.textContent = item.name
  const removeCardButton = newCard.querySelector('.element__remove')
  removeCardButton.addEventListener('click', removeItem)
  const cardlikeButton = newCard.querySelector('.element__like')
  cardlikeButton.addEventListener('click', likeCard)
  const cardImage = newCard.querySelector('.element__img')
  cardImage.addEventListener('click', () => {
    openPopupImage(item.link, item.name)
  })
  const closePopupImageButton = document.querySelector('.modal__close-button')
  closePopupImageButton.addEventListener('click', closePopupImage)
  return newCard
}
// Закрыть модальное окно
function closePopupImage() {
  popupImage.classList.remove('popup_opened')
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
// Открыть модальное окно
function openPopupImage(img, name) {
  const imageModal = popupImage.querySelector('.modal__image')
  const nameModal = popupImage.querySelector('.modal__title')
  imageModal.src = img
  imageModal.alt = name
  nameModal.textContent = name
  popupImage.classList.add('popup_opened')
}
// Отрисовать 6 карточек
function renderList() {
  const defaultList = initialCards.map(createCard)
  listCards.append(...defaultList)
}
// Добавить новую карту
function addNewItem() {
  const newItem = createCard({ name: placeInputAddCard.value, link: linkInputAddCard.value })
  listCards.prepend(newItem)
}
// Открыть или закрыть попап для редактирования профиля
function togglePopup() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  popupChangeProfile.classList.toggle('popup_opened')
}
// Открыть попап для добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened')
}
// Закрыть попап для добавления карточки
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened')
}
// Замена имени и деятельности
function handleProfileSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = nameInputChangeProfile.value
  profileJob.textContent = jobInputChangeProfile.value
  togglePopup()
}
// Добавить карту
function handleCardSubmit(evt) {
  evt.preventDefault()
  addNewItem()
  closePopupAddCard()
  formAddCard.reset()
}
// Основные события
renderList()
editPopupChangeProfileButton.addEventListener('click', togglePopup)
closePopupChangeProfileButton.addEventListener('click', togglePopup)
openPopupAddCardButton.addEventListener('click', openPopupAddCard)
closePopupAddCardButton.addEventListener('click', closePopupAddCard)
formChangeProfile.addEventListener('submit', handleProfileSubmit)
formAddCard.addEventListener('submit', handleCardSubmit)

