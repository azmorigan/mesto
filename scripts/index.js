import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'
import {initialCards} from './initial-cards.js'

//----------------------Элементы DOM-----------------------//

// Все попапы
const popups = document.querySelectorAll('.popup')

// Попап редактирования профиля
const popupChangeProfile = document.querySelector('.popup_type_edit-profile')
const editPopupChangeProfileButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const formChangeProfile = popupChangeProfile.querySelector('.form_type_change-profile')
const nameInputChangeProfile = formChangeProfile.name
const jobInputChangeProfile = formChangeProfile.job

// Попап добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card')
const openPopupAddCardButton = document.querySelector('.profile__add-button')
const formAddCard = document.querySelector('.form_type_add-card')
const placeInputAddCard = formAddCard.place
const linkInputAddCard = formAddCard.link

// Список карточек
const listCards = document.querySelector('.elements__list')

// Попап изображения
const popupImage = document.querySelector('.popup_type_modal')
const picturePopupImage = popupImage.querySelector('.modal__image')
const namePopupImage = popupImage.querySelector('.modal__title')

//----------------------Функции-----------------------//


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

// Открыть попап для редактирования профиля
function openPopupChangeProfile() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  profileValidator.setButtonState(formChangeProfile.checkValidity())
  profileValidator.resetValidation()
  openPopup(popupChangeProfile)
}

// Открыть попап для добавления карточки
function openPopupAddCard() {
  addCardValidator.setButtonState(formAddCard.checkValidity())
  addCardValidator.resetValidation()
  openPopup(popupAddCard)
}

// Добавить новую карту
function addNewCard() {
  const newCard = new Card({ name: placeInputAddCard.value, link: linkInputAddCard.value }, "#template-card", likeCard, removeItem, openPopupImage)
  const newCardElement = newCard.createCard()
  listCards.prepend(newCardElement)
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

editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile())
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard())
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

const validationConfig = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_state_invalid'
})

function buildCard(item) {
  const card = new Card(item, "#template-card", likeCard, removeItem, openPopupImage)
  return card.createCard() 
}

initialCards.forEach(item => {
  listCards.append(buildCard(item))
})

const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()
