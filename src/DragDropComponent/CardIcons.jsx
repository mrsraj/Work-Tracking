import { useMyContext } from '../ContextAPIs/ContextApi';
import style from './CardIcons.module.css';

function CardIcon() {

    const { idForDelete } = useMyContext();
    // Handle the edit action
    const handleEdit = () => {
        alert("There is no API ")
    };

    // Handle the delete action
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/task/delete/${idForDelete}/`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                alert('Task deleted successfully');
            } else if (response.status === 404) {
                alert('Task not found');
            } else {
                alert('An error occurred while deleting the task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An unexpected error occurred');
        }
    };

    return (
        <div className={style.icon_container}>
            <div className={style.edit} onClick={handleEdit}>Edit</div>
            <div className={style.delete} onClick={handleDelete}>Delete</div>
        </div>
    );
}

export default CardIcon;