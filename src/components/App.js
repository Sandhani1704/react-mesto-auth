import React from 'react';
import { api } from '../utils/Api'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import { register, authorize, getContent } from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);


  const history = useHistory();
  const location = useLocation();

  const handleLogin = (password, email) => {
    authorize(password, email)
      .then(() => {
        setloggedIn(true);
        history.push('/');
        return;
      })
      .catch(() => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');

      })
  }

  function handleRegisterSubmit(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setMessage('Вы успешно зарегистрировались!');
          setIsInfoTooltipPopupOpen(true);
          history.push('/signin');
          return;
        }
      })
      .catch(() => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipPopupOpen(true);
      })
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      Promise.all([getContent(), api.getInitialCards()])
        .then(([user, cards]) => {
          if (user) {
            setСurrentUser(user);
            setCards(cards);
            setloggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          if (err === 400) {
            console.error('Токен не передан или передан не в том формате');
          }
          if (err === 401) {
            console.error('Переданный токен некорректен');
          }
        });
    }
  }, [location.pathname]);


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setСurrentUser(userInfo)
        setCards(initialCards);
      })
      .catch((error) => console.log('Ошибка запроса - ' + error))

  }, []);

  function handleUpdateUser({ name, about }) {
    setIsLoading(true)
    api.setUserInfo({ name, about })
      .then((userInfo) => {
        setСurrentUser(userInfo);
        closeAllPopups()
      })
      .catch(err => console.error(err))


  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true)
    api.setUserAvatar({ avatar })
      .then((userInfo) => {
        setСurrentUser(userInfo);
        closeAllPopups()
      }
      )
      .catch(err => console.error(err))


  }


  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.putLike(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch(err => console.error(err));

    api.removeLike(card._id, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch(err => console.error(err));
  }


  const handleCardDelete = () => {
    //setIsLoading(true)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== selectedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка удаления карточки : ', error))

  }

  function handleAddPlaceSubmit({ name, link, alt }) {
    setIsLoading(true)
    api.addCard({ name, link, alt })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка запроса - ' + error))
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsLoading(false);
    setIsInfoTooltipPopupOpen(false);
  }

  const handleCardConfirm = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);

  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {/* {currentUser && cards && <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardConfirm}

        />} */}
        <Switch>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegisterSubmit} />
          </Route>

          <ProtectedRoute path='/'
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardConfirm}
            loggedIn={loggedIn}
            value={currentUser}
          />

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

          <Footer />

          {currentUser && <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} />}

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCards={handleAddPlaceSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Создать'} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups} />

          <ConfirmPopup
            onConfirm={handleCardDelete}
            onClose={closeAllPopups}
            isOpen={isConfirmPopupOpen}
            buttonText={isLoading ? 'Сохранение...' : 'Да'}
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipPopupOpen} />

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;