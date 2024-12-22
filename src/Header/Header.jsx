
import style from './Header.module.css'

function Header() {

    return (
        <>
            <div className={style.header}>
                <div>Task Management App</div>
                <div className={style.login} ><a href="/" className={style.login_btn}>Group</a></div>
                <div className={style.login} ><a href="/login" className={style.login_btn}>LogIn</a></div>

            </div>
        </>
    )
}

export default Header;