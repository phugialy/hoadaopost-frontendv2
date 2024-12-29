"use client";

const NextEvent = ({ event }) => {
  const getEventStatus = () => {
    const now = new Date();
    const [month, day] = event.Day.split("/");
    const [hour, minute] = event.Time.split(":");
    const eventDate = new Date(now.getFullYear(), month - 1, day, hour, minute);

    const diffInMinutes = (eventDate - now) / (1000 * 60); // Difference in minutes

    if (diffInMinutes > 0 && diffInMinutes <= 30) {
      return "yellow"; // Event is within 30 minutes
    } else if (diffInMinutes >= -30 && diffInMinutes <= 0) {
      return "green"; // Event is happening within 30 minutes
    }

    return "default"; // Default styling for future events
  };

  const eventStatus = getEventStatus();
  
  return (
    <div
      className={`p-6 border rounded-md flex flex-col nextevent ${
        eventStatus === "yellow"
          ? "bg-yellow-500"
          : eventStatus === "green"
          ? "bg-green-500"
          : "bg-gray-100"
      }`}
      style={{
        backgroundColor: "var(--nextevent-bg)",
        color: "var(--nextevent-text)",
        borderColor: "var(--nextevent-border)",
      }}
    >
      <h2 className="text-xl font-bold mb-6">Next Event</h2>

      {/* Location (Place of Performance) */}
      <div className="mb-4">
        <p className="text-sm font-semibold">Place of Performance:</p>
        <p className="text-lg">{event.Location || "TBA"}</p>
      </div>

      {/* Date */}
      <div className="mb-4">
        <p className="text-sm font-semibold">Date:</p>
        <p className="text-lg">{event.Day || "TBA"}</p>
      </div>

      {/* Time */}
      <div className="mb-4">
        <p className="text-sm font-semibold">Time:</p>
        <p className="text-lg">{event.Time || "TBA"}</p>
      </div>

      {/* Address */}
      <div className="mb-4">
        <p className="text-sm font-semibold">Location:</p>
        <p className="text-lg">{event.Address || "TBA"}</p>
      </div>

      {/* Navigate Button */}
      <button
        onClick={() => window.open(`https://maps.google.com?q=${event.Address}`, "_blank")}
        className="button NavNextevent bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Navigate
      </button>
    </div>
  );
};

export default NextEvent;
