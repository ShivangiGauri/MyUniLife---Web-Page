// src/pages/admin/CreateEvent.jsx

import { useState } from "react";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", event);
    alert("Event Created Successfully!");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}