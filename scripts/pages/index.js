import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import {initialCards} from '../utils/initial-cards.js'
import {popups,
  popupChangeProfile,
  editPopupChangeProfileButton,
  profileName,
  profileJob,
  formChangeProfile,
  nameInputChangeProfile,
  jobInputChangeProfile,
  popupAddCard,
  openPopupAddCardButton,
  formAddCard,
  placeInputAddCard,
  linkInputAddCard,
  listCards,
  validationConfig} from '../utils/constants.js'

import {likeCard,
removeItem,
openPopupImage,
closePopup,
handleProfileSubmit,
openPopup
} from '../utils/utils.js'


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
  const newCard = buildCard({ name: placeInputAddCard.value, link: linkInputAddCard.value })
  listCards.prepend(newCard)
}


// Добавить карту
function handleCardSubmit(evt) {
  evt.preventDefault()
  addNewCard()
  closePopup(popupAddCard)
  formAddCard.reset()
}