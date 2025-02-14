import { useState } from "react";
import "../styles/itemAdder.css";

interface Item {
  title: string;
  description: string;
}

function ItemAdder({ onItemAdded }: { onItemAdded: () => void }) {
  const [item, setItem] = useState("");

  const handleAddItem = () => {
    if (!item.trim()) return;

    try {
      const existingItems: Item[] = JSON.parse(
        localStorage.getItem("items") || "[]"
      );

      const newTask: Item = { title: item, description: "" };
      const updatedItems = [newTask, ...existingItems];

      localStorage.setItem("items", JSON.stringify(updatedItems));
      onItemAdded();
      setItem("");
    } catch (error) {
      console.error("Failed to add item:", error);
      localStorage.setItem("items", JSON.stringify([]));
    }
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
