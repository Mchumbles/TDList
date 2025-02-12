import { useEffect, useState } from "react";
import ItemAdder from "./ItemAdder";

function ToDoList() {
  const [currentList, setCurrentList] = useState<string[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    setCurrentList(items);
  };

  function handleDeleteItem(index: number) {
    const updatedList = currentList.filter((_, i) => i !== index);
    localStorage.setItem("items", JSON.stringify(updatedList));
    setCurrentList(updatedList);
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <ItemAdder onItemAdded={loadItems} />
      <ul>
        {currentList.map((item, index) => (
          <div>
            <li key={index}>{item}</li>
            <button
              className="deleteItemBtn"
              onClick={() => handleDeleteItem(index)}
            >
              x
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
