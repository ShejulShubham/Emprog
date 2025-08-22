import React, { useState } from "react";

const AddItemForm = ({ onSubmit }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !price.trim()) return;
    onSubmit({ name: itemName, description, price: parseFloat(price) });
    setItemName("");
    setDescription("");
    setPrice("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add New Item
      </h2>

      {/* Item Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Item Name
        </label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Price */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Price ($)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;