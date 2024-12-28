
import { useState } from 'react';
import style from './Header.module.css'
import { useMyContext } from '../ContextAPIs/ContextApi';

function Header() {

    const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('token'))
    console.log('PostContext = ',useMyContext());

    let {logIn, setLogin} = useMyContext()
    console.log("logIn = ", logIn);
    
    
    function handleLogout() {
        localStorage.removeItem('token');
        setLogin();
        alert("LogOut Successfull.")
    }

    return (
        <>
            <div className={style.header}>
                <div>Task Management App</div>
                <div className={style.login} ><a href="/showgroup" className={style.login_btn}>Group</a></div>
                {logIn ?
                    <div className={style.logout} onClick={handleLogout}>LogOut</div>
                    :
                    <div className={style.login} ><a href="/login" className={style.login_btn}>LogIn</a></div>
                }

            </div>
        </>
    )
}

export default Header;