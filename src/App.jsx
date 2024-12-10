import { useState } from "react";
import './App.css'



function App() {

  const [columns, setColumns] = useState({
    column1: ['item1', 'item2'],
    column2: ['item3', 'item4'],
    column3: []
  });

  console.log("Columns = ",columns);
  

  function onDragStart(event, item, fromColumn) {
    event.dataTransfer.setData('item', item)
    event.dataTransfer.setData('fromColumn', fromColumn)


    console.log("item = ", item);
    console.log('fromColumn', fromColumn);
  }

  function onDrop(event, toColumn) {
    const item = event.dataTransfer.getData('item')
    const fromColumn = event.dataTransfer.getData('fromColumn')

    if (toColumn === fromColumn) return;

    setColumns((prev) => {
      const fromData = prev[fromColumn].filter((older) => older != item);
      const toData = [...prev[toColumn], item];

      return {
        ...prev, [fromColumn]: fromData, [toColumn]: toData
      }

    }
    )
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function createNewitem(e, column) {

    e.preventDefault();
    const data = Object.fromEntries(new FormData(event.target))
    setColumns((prev) => (
      { ...prev, [column]: [...prev[column], data[column]] }
    ))

  }

  console.log("Object = ", Object.keys(columns));


  return (
    <div className="container">
      {
        Object.keys(columns).map((column) => (

          <div className="column" key={column}
            onDrop={(event) => onDrop(event, column)} onDragOver={onDragOver}>

            {
              columns[column].map((item) => (

                <div draggable
                  onDragStart={(event) => onDragStart(event, item, column)}
                  className="item" key={item}>

                  {item}

                </div>

              ))
            }

            {column === "column1" && (
              <form onSubmit={(event) => createNewitem(event, column)}>
                <input type="text" placeholder="create new" name={column} />
              </form>
            )}

          </div>
        ))
      }



    </div>
  )
}

export default App;