import React, { useState } from 'react';
import style from './GroupForm.module.css'; // Import the CSS file
import { useMyContext } from '../ContextAPIs/ContextApi';

const GroupAddForm = () => {

    const{formShow, setFormShow} = useMyContext()

    const [formData, setFormData] = useState({
        groupname: '',
        work: '',
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function FormShowHide() {
        setFormShow(!formShow);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);


        setFormData({
            groupname: '',
            work: '',
        });
    };

    return (
        <div className={style.register_container}>
            <button className={style.btn_close} onClick={FormShowHide}>X</button>
            <h2 className={style.header}>New Team</h2>
            <form className={style.register_form} onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={formData.groupname}
                    name="groupname"
                    onChange={handleChanges}
                    required
                />

                <input
                    type="text"
                    placeholder="Work"
                    value={formData.work}
                    name="work"
                    onChange={handleChanges}
                    required
                />

                <button type="submit">Add Group</button>

            </form>
        </div>
    );
};

export default GroupAddForm;