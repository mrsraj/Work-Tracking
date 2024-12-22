import { useState } from "react";
import style from './DragDrop.module.css';
import TaskAddForm from "../components/Form";
import RouterPage from "../RouterComponent/Router";

function DragDrop() {
    const [showTaskForm, setShowTaskForm] = useState(false);

    const [columns, setColumns] = useState({
        column1: [{ id: 1, title: 'item1' }, { id: 2, title: 'item2' }],
        column2: [],
        column3: []
    });

    console.log("Columns = ", columns);

    function onDragStart(event, item, fromColumn) {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('fromColumn', fromColumn);

        console.log("item = ", item);
        console.log('fromColumn', fromColumn);
    }

    function onDrop(event, toColumn) {
        event.preventDefault();
        const item = JSON.parse(event.dataTransfer.getData('item'));
        const fromColumn = event.dataTransfer.getData('fromColumn');

        if (toColumn === fromColumn) return;

        setColumns((prev) => {
            const fromData = prev[fromColumn].filter((older) => older.id !== item.id);
            const toData = [...prev[toColumn], item];

            return {
                ...prev,
                [fromColumn]: fromData,
                [toColumn]: toData
            };
        });
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    const handleShowForm = () => {
        setShowTaskForm(true);
    };

    function createNewItem(newItem) {
        console.log('New item to add:', newItem);

        setColumns((prev) => ({
            ...prev,
            column1: [...prev.column1, newItem] // Add the new item to column1
        }));

        setShowTaskForm(false); // Close the form after adding the item
    }

    function HandleHide() {
        setShowTaskForm(false);
    }

    console.log("Object keys = ", Object.keys(columns));


    return (
        <>
            <div className={style.container}>
                {
                    Object.keys(columns).map((column) => (
                        <div className={style.column} key={column} onDrop={(event) => onDrop(event, column)} onDragOver={onDragOver}>

                            <div className={style.taskButton} id="b">
                                {column === "column1" && (
                                    <button id="b" onClick={handleShowForm} className={style.addButton}>Add New Task</button>
                                )}
                                {showTaskForm && column === "column1" && (
                                    <>
                                        <button onClick={HandleHide}>X</button>
                                        <TaskAddForm createNewItem={createNewItem} />
                                    </>
                                )}
                            </div>

                            {
                                columns[column].map((item, index) => (
                                    <div
                                        draggable
                                        onDragStart={(event) => onDragStart(event, item, column)}
                                        className={style.item}
                                        key={index}
                                    >
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                        <p>{item.date}</p>
                                    </div>
                                ))
                            }

                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default DragDrop;