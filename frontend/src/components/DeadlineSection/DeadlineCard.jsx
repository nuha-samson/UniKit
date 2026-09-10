import { formatDateTime, getDeadlineUrgency } from "../../utils/deadline";

const DeadlineCard = ({ deadline, onEdit, onComplete, onDelete }) => {
  const urgency = getDeadlineUrgency(deadline.dueDate);
  const completed = Boolean(deadline.completedAt);

  const courseName = deadline.course?.code && deadline.course?.name
    ? `${deadline.course.code} — ${deadline.course.name}`
    : deadline.course?.name || "Unknown course";

  return (
    <article className={`deadline-card ${completed ? "is-completed" : ""}`}>
      <div className="deadline-content">
        <div className="deadline-top-line">
          <span className="deadline-course">{courseName}</span>
          <span className={`deadline-urgency ${urgency.level}`}>
            {completed ? "Completed" : urgency.label}
          </span>
        </div>
        <h3>{deadline.title}</h3>
        <div className="deadline-meta">
          <span>{deadline.type}</span>
          <span>{deadline.priority} priority</span>
        </div>
        <p className="deadline-due">Due {formatDateTime(deadline.dueDate)}</p>
      </div>

      <div className="deadline-actions">
        <button className="secondary-action" onClick={() => onComplete(deadline)}>
          {completed ? "Mark Active" : "Complete"}
        </button>
        <button className="secondary-action" onClick={() => onEdit(deadline)}>Edit</button>
        <button className="secondary-action" onClick={() => onDelete(deadline._id)}>Delete</button>
      </div>

      {deadline.description && <p className="deadline-description">{deadline.description}</p>}
    </article>
  );
};

export default DeadlineCard;