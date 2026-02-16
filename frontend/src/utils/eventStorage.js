const SAVED_KEY = "myunilife_saved_events";
const REGISTERED_KEY = "myunilife_registered_events";

/* ---------- Saved Events ---------- */

export const getSavedEvents = () => {
  const data = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  return data.map(Number); // always numbers
};

export const saveEvent = (eventId) => {
  const id = Number(eventId);
  const saved = getSavedEvents();

  if (!saved.includes(id)) {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify([...saved, id])
    );
  }
};

export const unsaveEvent = (eventId) => {
  const id = Number(eventId);
  const saved = getSavedEvents().filter(
    (savedId) => savedId !== id
  );
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
};

/* ---------- Registered Events ---------- */

export const getRegisteredEvents = () => {
  const data = JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];
  return data.map(Number); // always numbers
};

export const registerEvent = (eventId) => {
  const id = Number(eventId);
  const registered = getRegisteredEvents();

  if (!registered.includes(id)) {
    localStorage.setItem(
      REGISTERED_KEY,
      JSON.stringify([...registered, id])
    );
  }
};
