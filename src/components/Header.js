import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.png';


function Header() {

    const path = useLocation().pathname;

    return (

        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип Mestro" />
            <Link className="header__link" to={(path === '/sign-up') ? '/signin' : '/signup'}>
                {(path === '/signup') ? 'Войти' : 'Регистрация'}
            </Link>
        </header>


    );
}

export default Header;