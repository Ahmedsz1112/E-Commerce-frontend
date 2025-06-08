"use client"; // إذا كنت تستخدم بنية app في Next.js

import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);

    console.log(query);
    
  };

  return (
    <div className="flex items-center max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold me-3.5">Search</h1>

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
