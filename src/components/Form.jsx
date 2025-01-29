import { useState } from "react";
import style from './Form.module.css';

function TaskAddForm({ createNewItem }) {
    // Manage new task state
    const [newItem, setNewItem] = useState({
        title: "",
        desc: "",
        column: "column1",
        user: localStorage.getItem('user_id')
    });

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        if (newItem.title.trim() === '' || newItem.desc.trim() === '') {
            alert('Task name and description cannot be empty');
            return;
        }

        // Call parent function to handle the new task
        createNewItem(newItem);

        // Reset form
        setNewItem({
            title: "",
            desc: "",
        });
    }

    return (
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <input
                className={style.nameInput}
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleChange}
                placeholder="Work Title"
                required
            />
            <input
                className={style.description}
                type="text"
                name="desc"
                value={newItem.desc}
                onChange={handleChange}
                placeholder="Descriptions"
                required
            />
            <button type="submit" className={style.submitButton}>
                Add Task
            </button>
        </form>
    );
}

export default TaskAddForm;