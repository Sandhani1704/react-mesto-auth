import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import * as auth from '../utils/auth';

function Register({ onRegister }) {

    const [userData, setUserData] = React.useState({ password: '', email: '' });
    // const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData, [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // auth.register(userData.password, userData.email).then((res) => {
        //     // console.log(res)
        //     if (res.status !== 400) {
        //         history.push('/signin');

        //         return;
        //     }

        // });
        onRegister(userData.password, userData.email)

    }

    return (
        <>
            <section className="login">
                <div className="login__container">
                    <h3 className="login__title">Регистрация</h3>
                    <form className="login__form" name="login" onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={userData.email} id="email" type="email" name="email" className="login__input-email" placeholder="Email" />
                        <input onChange={handleChange} value={userData.password} id="password" type="password" name="password" className="login__input-password" placeholder="Пароль" />
                        <button type="submit" className="login__button-submit">Зарегистрироваться</button>
                        <div className="login__block-signup">
                            <p>Уже зарегистрированы? <Link to="signin" className="login__signup">Войти</Link></p>
                        </div>
                    </form>
                </div>

            </section>
        </>

    );
}

export default Register;