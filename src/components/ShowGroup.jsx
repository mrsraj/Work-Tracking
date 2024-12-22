import { useState } from "react";
import style from './Showgroup.module.css';
import GroupAddForm from "./GroupForm";


function ShowGroup() {

    const [formShow, setFormShow] = useState(false);

    function FormShowHide() {
        setFormShow(!formShow);
    }

    return (
        <div className={style.group_container}>

            <div onClick={FormShowHide} className={style.createbutton} title="create group">
                <span className={style.plussign}>+</span>
            </div>
            {
                formShow && <GroupAddForm />
            }

        </div>
    )
}

export default ShowGroup;