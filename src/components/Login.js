import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import * as auth from '../utils/auth';

function Login(props) {

    const [userData, setUserData] = React.useState({ password: '', email: '' });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData, [name]: value
        });
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!userData.email || !userData.password) {
    //         return;
    //     }

    //     auth.authorize(userData.password, userData.email)
    //         .then((data) => {
    //             console.log(data)
    //             if (data.jwt) {
    //                 setUserData({ password: '', email: '' }, () => {
    //                     handleLogin();
    //                     history.push('/');
    //                 })
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLogin(userData.password, userData.email);
        setUserData({ email: '', password: '' });

    }

    return (
        <>
            <section className="login">
                <div className="login__container">
                    <h3 className="login__title">Вход</h3>
                    <form onSubmit={handleSubmit} className="login__form" name="login">
                        <input onChange={handleChange} id="email" type="email" name="email" className="login__input-email" placeholder="Email" />
                        <input onChange={handleChange} id="password" type="password" name="password" className="login__input-password" placeholder="Пароль" />
                        <button type="submit" className="login__button-submit">Войти</button>
                        <p>Ещё не зарегистрированы? <Link to="signup" className="login__signup">Регистрация</Link></p>
                    </form>
                </div>

            </section>
        </>

    );
}

export default Login;