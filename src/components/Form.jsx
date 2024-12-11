import { useState } from "react";
import style from './Form.module.css';

function TaskAddForm({ createNewItem }) {
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');

    function handleTitleChange(e) {
        setNewItemName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setNewItemDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (newItemName.trim() === '' || newItemDescription.trim() === '') {
            alert('Task name and description cannot be empty');
            return;
        }

        // Create a new item object
        const newItem = {
            id: Date.now(), // Generates a unique timestamp-based ID
            name: newItemName,
            description: newItemDescription,
            date: new Date().toLocaleDateString()
          };

        createNewItem(newItem);
        setNewItemName('');
        setNewItemDescription('');
    }

    return (
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <input
                className={style.nameInput}
                type="text"
                name="title"
                value={newItemName}
                onChange={handleTitleChange}
                placeholder="Work Title"
                required
            />
            <input
                className={style.description}
                type="text"
                name="description"
                value={newItemDescription}
                onChange={handleDescriptionChange}
                placeholder="Descriptions"
                required
            />
            <button type="submit" className={style.submitButton}>Add Task</button>
        </form>
    );
}

export default TaskAddForm;