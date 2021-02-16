import FormValidator from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'
import {editPopupChangeProfileButton,
  formChangeProfile,
  popupImageSelector,
  openPopupAddCardButton,
  formAddCard,
  initialCardList,
  listCards,
  validationConfig} from '../scripts/utils/constants.js'
import './index.css'


//-------------Определение классов---------------//

const imagePopup = new PopupWithImage(popupImageSelector)
imagePopup.setEventListeners()

//--------------Функции---------------//

// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}

// Удалить карту
function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}

// Открыть попап с картинкой
function handleCardClick(img, name) {
  imagePopup.open(img, name)
}

// Создать карточку
function createCard(data) {
  const card = new Card(data, "#template-card", likeCard, removeItem, handleCardClick)
  const cardElement = card.createCard()
  return cardElement
}

//--------------Отрытие и закрытие попапов---------------//

function openPopupChangeProfile() {
  profileValidator.setButtonState(formChangeProfile.checkValidity())
  profileValidator.resetValidation()
  popupFormEditProfile.open()
}

function openPopupAddCard() {
  addCardValidator.setButtonState(formAddCard.checkValidity())
  addCardValidator.resetValidation()
  popupFormAddCard.open()
}

editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile())
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard())
//-----------------------------------------------//

//----------------Отправка форм-------------//

const popupFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (data) => {
    const cardElement = createCard(data)
    initialCardList.addItem(cardElement)
  }
})
popupFormAddCard.setEventListeners()

const popupFormEditProfile = new PopupWithForm('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  infoProfile.setUserInfo(data)
}})
popupFormEditProfile.setEventListeners()

//-----------------Валидация----------------//
const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()

//---------Работа с сервером-------------//


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/cards/",
  headers: {
    'content-type': 'application/json',
  }
})

const cards = api.getInfo()
cards.then(data=>{
  //---------Отрисовка карточек-----------//
  const initialCardList = new Section({
    items: data,
    renderer: (item)=>{
      const cardElement = createCard(item)
      initialCardList.addItem(cardElement)
    }}, listCards)
  initialCardList.renderItems()
})



const api2 = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/users/me/",
  headers: {
    'content-type': 'application/json',
  }
})

api2.getInfo()
  .then(({name, about, avatar}) => {
    const infoProfile = new UserInfo({
      nameProfileSelector: '.profile__title',
      jobProfileSelector: '.profile__subtitle',
      avatarProfileSelector: '.profile__avatar'
    },
    {
      nameProfile: name,
      aboutProfile: about,
      avatarProfile: avatar
    })
  infoProfile.setInitialInfo()
})