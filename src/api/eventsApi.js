const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://hoadaopost-production.up.railway.app";

export async function fetchEvents() {
  const endpoint = `${BACKEND_URL}/api/data`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // Validate and transform the data
    if (!Array.isArray(rawData.data)) {
      throw new Error("Unexpected data format");
    }

    const transformedData = rawData.data
      .filter((event) => event.length > 0) // Exclude empty rows
      .slice(1) // Skip the header row
      .map((event) => ({
        dateTime: `${event[0]} ${event[1]}` || "No DateTime", // Combine Date and Time
        location: event[2] || "No Location",
        duration: "1 hour", // Default Duration
        day: event[0] || "No Date", // Date
        address: event[3] || "No Address",
        details: event[4] || "No Details",
      }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
}
