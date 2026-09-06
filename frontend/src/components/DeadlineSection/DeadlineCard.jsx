import { getDeadlineStatus } from "../../utils/deadline";

const DeadlineCard = ({
  deadline,
  onEdit,
  onComplete,
  onDelete,
}) => {
  const status = getDeadlineStatus(deadline.dueDate);

  const dueDate = new Date(deadline.dueDate);

  const formattedDate = dueDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dueDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const courseName =
    deadline.course?.code && deadline.course?.name
      ? `${deadline.course.code} — ${deadline.course.name}`
      : deadline.course?.name || "Unknown course";

  return (
    <article className="deadline-card">
      <div className="deadline-card-main">
        <div className="deadline-card-title-row">
          <h3>{deadline.title}</h3>

          <span className={`deadline-status-badge ${status.level}`}>
            {status.label}
          </span>
        </div>

        <div className="deadline-card-info">
          <span>{courseName}</span>
          <span>{deadline.type}</span>
          <span>{deadline.priority} priority</span>
        </div>

        <div className="deadline-card-due">
          <strong>Due:</strong> {formattedDate} at {formattedTime}
        </div>
      </div>

      <div className="deadline-card-actions">
        <button
          type="button"
          onClick={() => onComplete(deadline)}
        >
          Complete
        </button>

        <button
          type="button"
          onClick={() => onEdit(deadline)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(deadline._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default DeadlineCard;