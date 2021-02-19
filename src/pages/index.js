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
  validationConfig,
  profileName,
  profileJob,
  nameInputChangeProfile,
  jobInputChangeProfile} from '../scripts/utils/constants.js'
import './index.css'


//-------------Определение классов---------------//

const imagePopup = new PopupWithImage(popupImageSelector)
imagePopup.setEventListeners()

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: 'afa481ae-bc0e-4856-9ec0-3e79ade90f5a',
    'Content-Type': 'application/json',
  }
})

const infoProfile = new UserInfo({
  nameProfileSelector: '.profile__title',
  jobProfileSelector: '.profile__subtitle',
  avatarProfileSelector: '.profile__avatar'
}, api)




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
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
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


//----------------Отправка форм-------------//
const popupFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (data) => {
    console.log(data)
    api
      .addCard(data)
      .then(res=>{
        console.log(res)
        const cardElement = createCard({
          name: res.name,
          link: res.link
        })
        listCards.prepend(cardElement)
      })
      .catch(err=>console.log(err))
  }
})
popupFormAddCard.setEventListeners()

const popupFormEditProfile = new PopupWithForm('.popup_type_edit-profile',
 {handleFormSubmit: (data) => {
  infoProfile.setUserInfo(data)

  api
  .uploadProfileInfo(
    profileName.textContent,
    profileJob.textContent)
  .then(res=>res)
  .catch(err=>err) 
}})
popupFormEditProfile.setEventListeners()


//-----------------Валидация----------------//
const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()


//------------Загрузка карточек--------------//
api
  .getInitialCards()
  .then(data=>{
    const initialCardList = new Section({
      items: data,
      renderer: (item)=>{
        const cardElement = createCard(item)
        initialCardList.addItem(cardElement)
      }}, listCards)
    initialCardList.renderItems()
  })
  .catch(err=>console.log(err))


//------------Загрузка профиля--------------//
api
  .getProfileInfo()
  .then(({name, about, avatar}) => {
    infoProfile.setInitialInfo({
      name,
      job: about,
      img: avatar
    })
  })
  .catch(err=>console.log(err))

//------------Сохранение профиля--------------//

// api
//   .uploadProfileInfo(
//     profileName.textContent,
//     profileJob.textContent)
//   .then(res=>console.log(res))
//   .catch(err=>console.log(err))

// infoProfile
//   .saveProfileInfo({
//     name: profileName.textContent,
//     about: profileJob.textContent
//   })
//   .then(res=>console.log(res))