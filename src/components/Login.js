import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login() {
    return (
        <>
            <Header>
                <Link to="/sign-up" className="login__signup-header">Регистрация</Link>
            </Header>
            <section className="login">
                <div className="login__container">
                    <h3 className="login__title">Вход</h3>
                    <form className="login__form" name="login">
                        <input id="email" type="email" name="email" className="login__input-email" placeholder="Email" />
                        <input id="password" type="password" name="password" className="login__input-password" placeholder="Пароль" />
                        <button type="submit" className="login__button-submit">Войти</button>
                    </form>
                </div>

            </section>
        </>

    );
}

export default Login;