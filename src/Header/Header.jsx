
import { useState } from 'react';
import style from './Header.module.css'
import { useMyContext } from '../ContextAPIs/ContextApi';

function Header() {

    console.log('PostContext = ', useMyContext());

    let { logIn, setLogin } = useMyContext()
    console.log("logIn = ", logIn);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setLogin();
        alert("Logout Successful.");
        window.location.href = '/'; // Redirects to the home page
    }

    return (
        <>
            <div className={style.header}>
                <div className={style.logo}>Task Management App</div>
                <div className={style.btn_container}>
                    <div className={style.login} ><a href="/showgroup" className={style.login_btn}>TeamSpace</a></div>
                    <div className={style.login} ><a href="/workpage" className={style.login_btn}>WorkPage</a></div>
                    {logIn ?
                        <div className={style.logout} onClick={handleLogout}>LogOut</div>
                        :
                        <div className={style.login} ><a href="/login" className={style.login_btn}>LogIn</a></div>
                    }
                </div>

            </div>
        </>
    )
}

export default Header;