import React from 'react';
import PopupWithForm from './PopupWithForm';
import imgSuccess from '../images/Union_success.png'
// import imgFail from '../images/Union_fail.png'

function InfoTooltip({ onClose }) { // hasError 
    const [isOpenInfoTool, setIsOpenInfoTool] = React.useState(true);


    return (
        <PopupWithForm
            isOpen={isOpenInfoTool}
            onClose={onClose}
            name='popup-tool-tip'
        >

            <img className="tool-tip__image" src={imgSuccess} alt='#' />
            <p className="tool-tip__title">Вы успешно зарегистировались!</p>
        </PopupWithForm>

    );
}

export default InfoTooltip;