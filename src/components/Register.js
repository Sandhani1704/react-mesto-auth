import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register() {
    return (
        <>
            <Header>
                {/* <Link to="/sign-in" className="login__signup-header">Войти</Link> */}
            </Header>
            <section className="login">
                <div className="login__container">
                    <h3 className="login__title">Регистрация</h3>
                    <form className="login__form" name="login">
                        <input id="email" type="email" name="email" className="login__input-email" placeholder="Email" />
                        <input id="password" type="password" name="password" className="login__input-password" placeholder="Пароль" />
                        <button type="submit" className="login__button-submit">Зарегистрироваться</button>
                        <div className="login__block-signup">
                            <p>Уже зарегистрированы? <Link to="sign-in" className="login__signup">Войти</Link></p>
                        </div>
                    </form>
                </div>

            </section>
        </>

    );
}

export default Register;