import "./RecentLogs.css";

const logs = [
  {
    title: "Admin user created",
    meta: "User: Sarah Johnson",
    time: "2 minutes ago",
  },
  {
    title: "Permission role updated",
    meta: "User: Mike Chen",
    time: "15 minutes ago",
  },
  {
    title: "Payment processed",
    meta: "Amount: $5,200",
    time: "1 hour ago",
  },
];

const RecentLogs = () => {
  return (
    <section className="recent-logs-card">
      <h3 className="recent-logs-title">RECENT LOGS</h3>

      <div className="recent-logs-list">
        {logs.map((log, index) => (
          <div
            key={log.title}
            className={`recent-logs-item ${index !== logs.length - 1 ? "with-border" : ""
              }`}
          >
            <div>
              <p className="recent-logs-item-title">{log.title}</p>
              <p className="recent-logs-item-meta">{log.meta}</p>
            </div>

            <span className="recent-logs-item-time">{log.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentLogs;
