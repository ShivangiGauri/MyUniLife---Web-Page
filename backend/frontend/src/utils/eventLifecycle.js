export function updateEventLifecycle(events) {
  const now = new Date();

  return events.map((event) => {
    const start = event.startDate ? new Date(event.startDate) : null;
    const end = event.endDate ? new Date(event.endDate) : null;
    const completed = event.completedAt ? new Date(event.completedAt) : null;

    if (start && now < start) {
      event.lifecycle = "upcoming";
    }

    if (start && end && now >= start && now <= end) {
      event.lifecycle = "ongoing";
    }

    if (end && now > end) {
      event.lifecycle = "completed";
      event.completedAt = end;
    }

    if (completed) {
      const diffDays =
        (now - completed) / (1000 * 60 * 60 * 24);

      if (diffDays > 7) {
        event.lifecycle = "archived";
      }
    }

    return event;
  });
}