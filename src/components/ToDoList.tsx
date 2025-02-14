import { useEffect, useState } from "react";
import ItemAdder from "./ItemAdder";

interface item {
  title: string;
  description: string;
}

function ToDoList() {
  const [currentList, setCurrentList] = useState<item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadItems();
  }, []);

  function loadItems() {
    const storedItems = JSON.parse(localStorage.getItem("items") || "[]");

    if (storedItems.length === 0) {
      const defaultTasks = [
        { title: "Example task", description: "" },
        { title: "Read a book", description: "" },
        { title: "Exercise", description: "" },
      ];
      localStorage.setItem("items", JSON.stringify(defaultTasks));
      setCurrentList(defaultTasks);
    } else {
      setCurrentList(storedItems);
    }
  }

  function handleDeleteItem(indexInFilteredList: number) {
    const itemToDelete = filteredList[indexInFilteredList];
    const actualIndex = currentList.indexOf(itemToDelete);

    if (actualIndex !== -1) {
      const updatedList = currentList.filter((_, i) => i !== actualIndex);
      localStorage.setItem("items", JSON.stringify(updatedList));
      setCurrentList(updatedList);
    }
  }

  function handleMoveUp(index: number) {
    if (index > 0) {
      const updatedList = [...currentList];
      [updatedList[index], updatedList[index - 1]] = [
        updatedList[index - 1],
        updatedList[index],
      ];
      localStorage.setItem("items", JSON.stringify(updatedList));
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
      localStorage.setItem("items", JSON.stringify(updatedList));
      setCurrentList(updatedList);
    }
  }

  const filteredList = currentList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <ItemAdder onItemAdded={loadItems} />

      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul>
        {filteredList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="task-title">{item.title}</div>
            <div className="task-buttons">
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
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
