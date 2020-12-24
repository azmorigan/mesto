//----------------------Элементы DOM-----------------------//

// Все попапы
const popups = document.querySelectorAll('.popup')

// Попап редактирования профиля
const popupChangeProfile = document.querySelector('.popup_type_edit-profile')
const editPopupChangeProfileButton = document.querySelector('.profile__edit-button')
const closePopupChangeProfileButton = document.querySelector('.close-button')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const formChangeProfile = popupChangeProfile.querySelector('.form')
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
const picturePopupImage = popupImage.querySelector('.modal__image')
const namePopupImage = popupImage.querySelector('.modal__title')

// Список карточек
const listCards = document.querySelector('.elements__list')

// Шаблон карточки
const templateCard = document.querySelector('#template-card')

//----------------------Функции-----------------------//

// Открыть любой попап
function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupWithEsc)
}

// Закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupWithEsc)
}

// Закрыть попап с помощью Esc
function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
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
  picturePopupImage.src = img
  picturePopupImage.alt = name
  namePopupImage.textContent = name
  openPopup(popupImage)
}

// Составить элемент используя свойства объектов
function createCard(item) {
  const card = templateCard.content.cloneNode(true)
  const cardImage = card.querySelector('.element__img')
  cardImage.src = item.link
  cardImage.alt = item.name
  const cardPlaceName = card.querySelector('.element__title')
  cardPlaceName.textContent = item.name
  const removeCardButton = card.querySelector('.element__remove')
  removeCardButton.addEventListener('click', removeItem)
  const cardlikeButton = card.querySelector('.element__like')
  cardlikeButton.addEventListener('click', likeCard)
  cardImage.addEventListener('click', () => openPopupImage(item.link, item.name))
  return card
}

// Отрисовать исходные карточки
function renderList(arrayOfCards, listOfCards) {
  const defaultList = arrayOfCards.map(createCard)
  listOfCards.append(...defaultList)
}

// Открыть попап для редактирования профиля
function openPopupChangeProfile(config) {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  const submitButton = formChangeProfile.querySelector(config.submitButtonSelector)
  setButtonState(submitButton, formChangeProfile.checkValidity(), config)
  openPopup(popupChangeProfile)
}

// Открыть попап для добавления карточки
function openPopupAddCard(config) {
  const submitButton = formAddCard.querySelector(config.submitButtonSelector)
  setButtonState(submitButton, formAddCard.checkValidity(), config)
  openPopup(popupAddCard)
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
editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile(validationConfig))
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard(validationConfig))
formChangeProfile.addEventListener('submit', handleProfileSubmit)
formAddCard.addEventListener('submit', handleCardSubmit)

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    // Закрыть попап кликом по оверлэю
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
    // Закрыть попап кликом на крестик
    if (evt.target.classList.contains('close-button')) {
      closePopup(popup)
    }
  })
})