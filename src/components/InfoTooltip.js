import React from 'react';
import closeIcon from '../images/Close_Icon.svg';
import imgSuccess from '../images/Union_success.png'
import imgFail from '../images/Union_fail.png';

function InfoTooltip({ onClose, isOpen, loggedIn, image, message }) { // hasError 
   
    return (
        <section className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                {/* <img className="popup__info-image" alt="Картинка" src={loggedIn ? imgSuccess : imgFail} /> */}
                <img className="popup__info-image" alt="Картинка" src={image} />
                {/* <p className="popup__info-text">{loggedIn ? 'Вы успешно зарегистировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p> */}
                <p className="popup__info-text">{message}</p>
                <button type="button" className="popup__close" onClick={onClose}><img className="popup__close-icon" src={closeIcon} alt="закрыть" /></button>
            </div>
        </section>

    );
}

export default InfoTooltip;