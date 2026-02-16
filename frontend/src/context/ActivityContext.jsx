import { createContext, useState } from "react";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const registerEvent = (eventId) => {
    const id = Number(eventId);

    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  const isRegistered = (eventId) => {
    return registeredEvents.includes(Number(eventId));
  };

  return (
    <ActivityContext.Provider
      value={{
        registeredEvents,
        registerEvent,
        isRegistered
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
