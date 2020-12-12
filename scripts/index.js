//----------------------Элементы DOM-----------------------//
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
const closePopupImageButton = document.querySelector('.close-button_type_modal')
// Список карточек
const listCards = document.querySelector('.elements__list')
// Шаблон карточки
const templateCard = document.querySelector('#template-card')
//----------------------Функции-----------------------//
// Открыть любой попап
function openPopup(popup) {
  popup.classList.add('popup_opened')
}
// Закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened')
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
// Открыть попап изображения
function openPopupImage(img, name) {
  const imageModal = popupImage.querySelector('.modal__image')
  const nameModal = popupImage.querySelector('.modal__title')
  imageModal.src = img
  imageModal.alt = name
  nameModal.textContent = name
  openPopup(popupImage)
}
// Составить элемент используя свойства объектов
function createCard(item) {
  const card = templateCard.content.cloneNode(true)
  const cardImage = card.querySelector('.element__img')
  cardImage.setAttribute('src', `${item.link}`)
  cardImage.setAttribute('alt', `${item.name}`)
  const cardPlaceName = card.querySelector('.element__title')
  cardPlaceName.textContent = item.name
  /*Правильно ли, что события: лайк, удаление, открытие и закрытие карточки
  находятся в функции создания карточки? Ведь имя функции createCard подразумевает только
  создание карточки. Или их надо переместить в конец кода
  или в отдельные функции?*/
  const removeCardButton = card.querySelector('.element__remove')
  removeCardButton.addEventListener('click', removeItem)
  const cardlikeButton = card.querySelector('.element__like')
  cardlikeButton.addEventListener('click', likeCard)
  cardImage.addEventListener('click', () => openPopupImage(item.link, item.name))
  closePopupImageButton.addEventListener('click', () => closePopup(popupImage))
  return card
}
// Отрисовать исходные карточки
function renderList(arrayOfCards, listOfCards) {
  const defaultList = arrayOfCards.map(createCard)
  listOfCards.append(...defaultList)
}
// Открыть попап для редактирования профиля
function openPopupChangeProfile() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  openPopup(popupChangeProfile)
}
// Добавить новую карту
function addNewCard() {
  const newCard = createCard({ name: placeInputAddCard.value, link: linkInputAddCard.value })
  listCards.prepend(newCard)
}
// Замена имени и деятельности
function handleProfileSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = nameInputChangeProfile.value
  profileJob.textContent = jobInputChangeProfile.value
  closePopup(popupChangeProfile)
}
// Добавить карту
function handleCardSubmit(evt) {
  evt.preventDefault()
  addNewCard()
  closePopup(popupAddCard)
  formAddCard.reset()
}
//----------------------События-----------------------//
renderList(initialCards, listCards)
editPopupChangeProfileButton.addEventListener('click', openPopupChangeProfile)
closePopupChangeProfileButton.addEventListener('click', () => closePopup(popupChangeProfile))
openPopupAddCardButton.addEventListener('click', () => openPopup(popupAddCard))
closePopupAddCardButton.addEventListener('click', () => closePopup(popupAddCard))
formChangeProfile.addEventListener('submit', handleProfileSubmit)
formAddCard.addEventListener('submit', handleCardSubmit)

