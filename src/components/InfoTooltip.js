import React from 'react';
// import PopupWithForm from './PopupWithForm';
import imgSuccess from '../images/Union_success.png'
import closeIcon from '../images/Close_Icon.svg';
import imgFail from '../images/Union_fail.png';

function InfoTooltip({ onClose, isOpen, image, message }) { // hasError 
    // const [isOpenInfoTool, setIsOpenInfoTool] = React.useState(true);


    return (
        // <PopupWithForm
        //     isOpen={isOpen}
        //     onClose={onClose}
        //     name='popup-tool-tip'
        // >
        //     <img className="tool-tip__image" src={imgSuccess} alt='#' />
        //     <p className="tool-tip__title">Вы успешно зарегистировались!</p>
        // </PopupWithForm>

        <section className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                {/* <img className="tool-tip__image" alt="Картинка" src={loggedIn ? imgSuccess : imgFail} /> */}
                <img className="tool-tip__image" alt="Картинка" src={image} />
                {/* <p className="tool-tip__title">{loggedIn ? 'Вы успешно зарегистировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p> */}
                <p className="tool-tip__title">{message}</p>
                <button type="button" className="popup__close" onClick={onClose}><img className="popup__close-icon" src={closeIcon} alt="закрыть" /></button>
            </div>
        </section>

    );
}

export default InfoTooltip;