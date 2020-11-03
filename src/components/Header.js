import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/logo.png';
function Header() {
    return (

        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип Mestro" />
            <Link to="sign-in" className="header__link">Войти</Link>
        </header>


    );
}

export default Header;