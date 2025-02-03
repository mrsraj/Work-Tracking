import React, { useState } from 'react';
import style from './GroupForm.module.css'; // Import the CSS file
import { useMyContext } from '../ContextAPIs/ContextApi';

const GroupAddForm = () => {
    const { formShow, setFormShow ,formStatus, setFormStatus} = useMyContext()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        created_by: localStorage.getItem('user_id')
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

    async function handleRegister(e) {
        e.preventDefault();

        let res = await fetch('http://127.0.0.1:8000/api/addboard/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (res.statusText === "OK") {
            setFormStatus(true)
        }

        setTimeout(() => {
            setFormStatus(false)
        }, 2000);


        setFormData({
            name: "",
            description: "",
            created_by: localStorage.getItem('user_id'),
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
                    name="name"
                    onChange={handleChanges}
                    required
                />

                <input
                    type="text"
                    placeholder="Work"
                    value={formData.work}
                    name="description"
                    onChange={handleChanges}
                    required
                />
                {formStatus ? <div className={style.message}>Successfully Added</div> : ""}
                <button type="submit">Add Group</button>

            </form>
        </div>
    );
};

export default GroupAddForm;