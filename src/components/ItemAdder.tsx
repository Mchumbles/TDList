import { useState } from "react";

interface item {
  title: string;
  description: string;
}

function ItemAdder({ onItemAdded }: { onItemAdded: () => void }) {
  const [item, setItem] = useState("");

  const handleAddItem = () => {
    if (!item.trim()) return;

    const existingItems: item[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );

    const newTask = { title: item, description: "" };
    const updatedItems = [newTask, ...existingItems];

    localStorage.setItem("items", JSON.stringify(updatedItems));
    onItemAdded();
    setItem("");
  };

  return (
    <div>
      <input
        type="text"
        className="item"
        placeholder="Enter new ToDo here"
        value={item}
        maxLength={100}
        onChange={(e) => setItem(e.target.value)}
      />
      <button className="saveItemBtn" onClick={handleAddItem}>
        Save ToDo
      </button>
    </div>
  );
}

export default ItemAdder;
