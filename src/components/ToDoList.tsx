import { useEffect, useState } from "react";
import ItemAdder from "./ItemAdder";

function ToDoList() {
  const [currentList, setCurrentList] = useState<string[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  function loadItems() {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    setCurrentList(items);
  }

  function handleDeleteItem(index: number) {
    const updatedList = currentList.filter((_, i) => i !== index);
    localStorage.setItem("items", JSON.stringify(updatedList));
    setCurrentList(updatedList);
  }

  function handleMoveUp(index: number) {
    if (index > 0) {
      const updatedList = [...currentList];
      [updatedList[index], updatedList[index - 1]] = [
        updatedList[index - 1],
        updatedList[index],
      ];
      setCurrentList(updatedList);
    }
  }

  function handleMoveDown(index: number) {
    if (index < currentList.length - 1) {
      const updatedList = [...currentList];
      [updatedList[index], updatedList[index + 1]] = [
        updatedList[index + 1],
        updatedList[index],
      ];
      setCurrentList(updatedList);
    }
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <ItemAdder onItemAdded={loadItems} />
      <ul>
        {currentList.map((item, index) => (
          <div key={index}>
            <li>{item}</li>
            <button className="upItemBtn" onClick={() => handleMoveUp(index)}>
              👆
            </button>
            <button
              className="downItemBtn"
              onClick={() => handleMoveDown(index)}
            >
              👇
            </button>
            <button
              className="deleteItemBtn"
              onClick={() => handleDeleteItem(index)}
            >
              🗑️
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
