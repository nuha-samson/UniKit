export const getDeadlineStatus = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  const difference = due.getTime() - now.getTime();
  const hoursRemaining = difference / (1000 * 60 * 60);

  if (difference < 0) {
    return {
      level: "overdue",
      label: "Overdue",
    };
  }

  if (hoursRemaining <= 24) {
    return {
      level: "urgent",
      label: "Due today",
    };
  }

  if (hoursRemaining <= 72) {
    return {
      level: "soon",
      label: "Due soon",
    };
  }

  return {
    level: "safe",
    label: "On track",
  };
};