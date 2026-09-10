export const getDeadlineUrgency = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const difference = due.getTime() - now.getTime();

  if (difference < 0) {
    return { level: "urgent", label: "Overdue" };
  }

  const hours = difference / (1000 * 60 * 60);

  if (hours <= 24) {
    return { level: "urgent", label: "Urgent" };
  }
  if (hours <= 72) {
    return { level: "soon", label: "Due Soon" };
  }
  return { level: "safe", label: "On Track" };
};

export const formatDate = (value) => {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (value) => {
  return new Date(value).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatDateTime = (value) => {
  return `${formatDate(value)} · ${formatTime(value)}`;
};