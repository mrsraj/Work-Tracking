import { useEffect, useState } from "react";
import style from './Showgroup.module.css';
import GroupAddForm from "./GroupForm";
import { useMyContext } from "../ContextAPIs/ContextApi";
import { useNavigate } from "react-router-dom";



function ShowGroup() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const { formShow, setFormShow, formStatus } = useMyContext()

    function FormShowHide() {
        setFormShow(!formShow);
    }

    useEffect(() => {
        async function fetchBoardData() {
            let user_id = localStorage.getItem('user_id');
            try {
                let response = await fetch(`http://127.0.0.1:8000/api/getboard/${user_id}/`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let data = await response.json();

                setData(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchBoardData();
    }, [formStatus]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    function AddMember(e) {
        e.stopPropagation()
        alert("No Functionality")
    }

    function Getgrpid(id) {
        localStorage.setItem("grp_id", id);
        console.log("Set");
        navigate('/workpage');
    }

    return (
        <div className={style.group_container}>

            <div onClick={FormShowHide} className={style.createbutton} title="Create Group">
                <span className={style.plussign}>+</span>
            </div>
            {
                formShow && <div className={style.GroupAddForm}>
                    <GroupAddForm />
                </div>
            }

            {data ? (
                data.boards
                    .map((item, id) => (
                        <div className={style.card} key={id} onClick={() => Getgrpid(item.id)}>
                            <span onClick={AddMember} className={style.icon}>...</span>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Created by: {item.created_by}</p>
                        </div>
                    ))
            ) : (
                <p>No groups available.</p>
            )}

        </div>
    )
}

export default ShowGroup;