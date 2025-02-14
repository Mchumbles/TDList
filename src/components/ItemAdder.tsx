import { useState } from "react";

function ItemAdder({ onItemAdded }: { onItemAdded: () => void }) {
  const [item, setItem] = useState("");

  const handleAddItem = () => {
    if (!item.trim()) return;

    const existingItems: { title: string; description: string }[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );

    const newItem = { title: item, description: "" };
    const updatedItems = [...existingItems, newItem].reverse();

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
        onChange={(e) => setItem(e.target.value)}
      />
      <button className="saveItemBtn" onClick={handleAddItem}>
        Save ToDo
      </button>
    </div>
  );
}

export default ItemAdder;
