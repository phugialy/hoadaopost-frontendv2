"use client";

import { useState, useEffect } from "react";

const Schedule = ({ schedules }) => {
  const [filter, setFilter] = useState("All");
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which schedule is expanded
  const [copiedAddress, setCopiedAddress] = useState(null); // Store the copied address for feedback

  // Extract unique days from the schedule and include "All"
  const days = ["All", ...new Set(schedules.map((event) => event.Day))];

  useEffect(() => {
    // Filter schedules based on the selected filter
    const validSchedules = schedules || [];
    const newFilteredSchedule =
      filter === "All" ? validSchedules : validSchedules.filter((event) => event.Day === filter);
    setFilteredSchedule(newFilteredSchedule);
  }, [filter, schedules]);

  const toggleDetails = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle expand/collapse
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address); // Copy address to clipboard
    setCopiedAddress(address); // Update feedback to persist
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Sticky Filter Section */}
      <div className="schedule-day-outer sticky top-0 z-10 p-4 w-full bg-white schedule-scroll">
        {/* Feedback Area */}
        {copiedAddress && (
          <div className="bg-green-500 text-white p-2 rounded-lg mb-4 text-center">
            Address copied: {copiedAddress}
          </div>
        )}

        {/* Day Filter Buttons */}
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setFilter(day)}
              className={`schedule-day ${filter === day ? "selected" : "unselected"}`}
            >
              {day === "All" ? "ALL" : day}
            </button>
          ))}
        </div>
      </div>

      {/* Event List */}
      <div className="flex-1 space-y-6 overflow-y-auto schedule-scroll p-4">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((event, index) => (
            <div
              key={index}
              onClick={() => handleCopy(event.Address)}
              className={`schedule-data relative p-6 rounded-lg shadow-md flex flex-col space-y-4  cursor-pointer`}
            >
              {/* Event Info */}
              <h3 className="schedule-data-location text-2xl font-bold text-gray-800">{event.Location}</h3>
              <p className="text-lg">
                <strong>Date:</strong> {event.Day}
              </p>
              <p className="text-lg">
                <strong>Time:</strong> {event.Time}
              </p>
              <p className="text-lg">
                <strong>Address:</strong> {event.Address}
              </p>

              {/* Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-4">
                <button
                  onClick={() => window.open(`https://maps.google.com?q=${event.Address}`, "_blank")}
                  className="button navigate bg-blue-500 text-white w-40 h-12 rounded-lg font-semibold text-lg"
                >
                  Directions
                </button>
                <button
                  onClick={() => toggleDetails(index)}
                  className={`button details w-40 h-12 rounded-lg font-semibold text-lg ${
                    expandedIndex === index ? "bg-gray-700 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {expandedIndex === index ? "Hide Details" : "Details"}
                </button>
              </div>

              {/* Details Section */}
              {expandedIndex === index && (
                <div className="mt-4">
                  <p className="text-lg">
                    <strong>Details:</strong> {event.Details}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No events found for the selected day.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
