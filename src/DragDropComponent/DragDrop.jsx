import { useState, useEffect } from "react";
import axios from "axios";
import style from './DragDrop.module.css';
import TaskAddForm from "../components/Form";
import CardIcon from "./CardIcons";

function DragDrop() {

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [cardIcons, setCardIcons] = useState(false);
    const [clickedCardId, setClickedCardId] = useState(null);

    const [columns, setColumns] = useState({
        column1: [],
        column2: [],
        column3: [],
    });

    console.log("columns 2 = ", columns);


    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks/')
            .then((response) => {
                setColumns(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const handleShowForm = () => {
        setShowTaskForm(true);
    };

    const handleHideForm = () => {
        setShowTaskForm(false);
    };

    const createNewItem = (newItem) => {
        axios.post('http://localhost:8000/api/tasks/add/', newItem)

            .then((response) => {
                setColumns((prev) => ({
                    ...prev,
                    column1: [...prev.column1, response.data],
                }));
                setShowTaskForm(false); // Close the form
            })
            .catch((error) => {
                console.error('Error adding new task:', error);
            });
    };

    const onDragStart = (event, item, fromColumn) => {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('fromColumn', fromColumn);
    };

    const onDrop = (event, toColumn) => {
        event.preventDefault();
        const item = JSON.parse(event.dataTransfer.getData('item'));
        const fromColumn = event.dataTransfer.getData('fromColumn');

        if (toColumn === fromColumn) return;

        setColumns((prev) => {
            const fromData = prev[fromColumn].filter((task) => task.id !== item.id);
            const toData = [...prev[toColumn], item];

            const updatedColumns = {
                ...prev,
                [fromColumn]: fromData,
                [toColumn]: toData,
            };

            // Update the backend
            axios.post('http://localhost:8000/api/tasks/update/', { tasks: updatedColumns })
                .then(() => {
                    console.log('Tasks updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating tasks:', error);
                });

            return updatedColumns;

        });
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    function showCardDetails(id) {
        console.log("Card id = ", id);

    }

    const handleShowCardIcons = (itemId) => {
        setClickedCardId((prevId) => (prevId === itemId ? null : itemId)); // Toggle visibility
        setCardIcons(!cardIcons);
    };

    return (
        <div className={style.container}>

            {Object.keys(columns).map((column) => (
                <div
                    className={style.column}
                    key={column}
                    onDrop={(event) => onDrop(event, column)}
                    onDragOver={onDragOver}
                >
                    {
                        column === "column1" ? 'Do' :
                            column === "column2" ? 'Do_Ing' :
                                column === "column3" ? 'Done' :
                                    null
                    }
                    <div className={style.taskButton}>

                        {column === "column1" && (
                            <button
                                onClick={handleShowForm}
                                className={style.addButton}
                            >
                                Add New Task
                            </button>
                        )}
                        {showTaskForm && column === "column1" && (
                            <div className={style.formContainer}>
                                <button className={style.closeButton} onClick={handleHideForm}>
                                    X
                                </button>
                                <TaskAddForm createNewItem={createNewItem} />
                            </div>
                        )}
                    </div>

                    {columns[column].map((item, id) => (
                        <div
                            draggable
                            onDragStart={(event) => onDragStart(event, item, column)}
                            className={style.item}
                            key={id}
                            onClick={() => showCardDetails(item.id)}
                        >
                            <button className={style.Item_del} onClick={(e) => {
                                // e.stopPropagation(); // Prevent parent click handler
                                handleShowCardIcons(item.id);
                            }}>....</button>

                            {
                                cardIcons && clickedCardId === item.id &&
                                <CardIcon />
                            }

                            <h3>{item.title}</h3>
                            {item.desc && <p>{item.desc}</p>}
                            {item.date && <p>{item.date}</p>}

                        </div>
                    ))}

                </div>
            ))}

        </div>
    );
}

export default DragDrop;