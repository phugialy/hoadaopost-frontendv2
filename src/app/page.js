"use client";

import { useState, useEffect } from "react";
import NextEvent from "@/app/components/NextEvent";
import TopFilters from "@/app/components/LocalData";
import Schedule from "@/app/components/Schedule";
import { fetchEvents } from "@/api/eventsApi"; // Adjust path if necessary
import Head from "next/head";

export default function Home() {
  const [events, setEvents] = useState([]); // Store all events
  const [nextEvent, setNextEvent] = useState(null); // Store the next upcoming event
  const [error, setError] = useState(null); // Error state for API call

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(); // Fetch data from API

        // Transform API response to fit the expected format
        const transformedEvents = data.map((event) => ({
          Location: event.location,
          Day: event.dateTime.split(" ")[0].slice(5), // Extract "MM/DD" from "YYYY-MM-DD"
          Time: event.dateTime.split(" ")[1], // Extract time "HH:MM:SS"
          Address: event.address,
          Details: event.details,
        }));

        setEvents(transformedEvents); // Set events for the schedule

        // Determine the next event based on the current date and time
        const now = new Date();
        const upcomingEvent = transformedEvents.find((event) => {
          const [month, day] = event.Day.split("/");
          const [hour, minute] = event.Time.split(":");
          const eventDate = new Date(now.getFullYear(), month - 1, day, hour, minute);
          return eventDate > now;
        });

        setNextEvent(upcomingEvent || transformedEvents[0]); // Default to the first event if no upcoming
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      }
    };

    loadEvents();
  }, []);

  return (
    <>
      {/* Head: Add favicon and page title */}
      <Head>
        <title>2025 HOA DAO Official </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 space-y-6">
        {/* Top Filters */}
        <div>
          <TopFilters />
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-4 h-screen">
          {/* Sticky NextEvent Box */}
          <div className="w-full md:w-1/3 sticky top-4">
            {nextEvent ? (
              <NextEvent event={nextEvent} />
            ) : (
              <div className="text-gray-500 p-4">No upcoming events.</div>
            )}
          </div>

          {/* Scrollable Schedule */}
          <div className="flex-1 overflow-y-scroll">
            {events.length > 0 ? (
              <Schedule schedules={events} />
            ) : (
              <div className="text-gray-500 p-4">Loading events...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
