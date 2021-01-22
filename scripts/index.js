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
const formChangeProfile = popupChangeProfile.querySelector('.form')
const nameInputChangeProfile = formChangeProfile.name
const jobInputChangeProfile = formChangeProfile.job

// Попап добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card')
const openPopupAddCardButton = document.querySelector('.profile__add-button')
const formAddCard = document.querySelector('.form_type_add-card')
const placeInputAddCard = formAddCard.place
const linkInputAddCard = formAddCard.link

// Попап изображения
const popupImage = document.querySelector('.popup_type_modal')
const picturePopupImage = popupImage.querySelector('.modal__image')
const namePopupImage = popupImage.querySelector('.modal__title')

// Список карточек
const listCards = document.querySelector('.elements__list')

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

// Открыть попап для редактирования профиля
function openPopupChangeProfile(config) {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  const submitButton = formChangeProfile.querySelector(config.submitButtonSelector)
  const validFormWithOpenPopup = new FormValidator(validationConfig, config.formSelector)
  validFormWithOpenPopup.setButtonState(submitButton, formChangeProfile.checkValidity())
  openPopup(popupChangeProfile)
}

// Открыть попап для добавления карточки
function openPopupAddCard(config) {
  const submitButton = formAddCard.querySelector(config.submitButtonSelector)
  const validFormWithOpenPopup = new FormValidator(validationConfig, config.formSelector)
  validFormWithOpenPopup.setButtonState(submitButton, formAddCard.checkValidity())
  openPopup(popupAddCard)
}

// Добавить новую карту
function addNewCard() {
  const newCard = new Card({ name: placeInputAddCard.value, link: linkInputAddCard.value }, "#template-card")
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

// Правильно ли, что validationConfig хранится в этом файле? 
// Или лучше в отдельный файл?
const validationConfig = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_state_invalid'
})

initialCards.forEach(item => {
  const card = new Card(item, "#template-card")
  const cardElement = card.createCard()
  listCards.append(cardElement)
})

const forms = document.querySelectorAll('.form')
    forms.forEach(form => {
      const validForm = new FormValidator(validationConfig, form)
      validForm.enableValidation()
    })
