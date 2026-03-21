const SAVED_KEY = "myunilife_saved_events";
const REGISTERED_KEY = "myunilife_registered_events";

/* ---------- Safe JSON Read ---------- */

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/* ---------- Saved Events ---------- */

export const getSavedEvents = () => {
  return readStorage(SAVED_KEY).map(Number);
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
  return readStorage(REGISTERED_KEY).map(Number);
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

/* ---------- Unregister Event ---------- */

export const unregisterEvent = (eventId) => {
  const id = Number(eventId);

  const registered = getRegisteredEvents().filter(
    (event) => event !== id
  );

  localStorage.setItem(
    REGISTERED_KEY,
    JSON.stringify(registered)
  );
};