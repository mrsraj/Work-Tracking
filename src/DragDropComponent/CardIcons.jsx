
import style from './CardIcons.module.css';

function CardIcon() {

    return (
        <div className={style.icon_container}>
            <button className={style.edit}>Edit</button>
            <button className={style.delete}>delete</button>
        </div>
    )

}

export default CardIcon;