import { useEffect, useState } from "react";

function ToDoList() {
  const [currentList, setCurrentList] = useState<string[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    setCurrentList(items);
  }, []);

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {currentList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
