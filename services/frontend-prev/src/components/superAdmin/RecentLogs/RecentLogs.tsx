import React, { useState, useEffect } from 'react';
import "./RecentLogs.css";
import { fetchAuditLogs } from "../../../api/admin";

const RecentLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. On Mount, Grab the data
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const data = await fetchAuditLogs(token);
        setLogs(data);
      } catch (err: any) {
        setError(err.message || "Failed to load recent logs");
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  // 2. A JS utility to calculate dynamic strings like "5 minutes ago"
  const formatTimeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="recent-logs-card" style={{ padding: "20px", color: "white" }}>Loading logs...</div>;
  if (error) return <div className="recent-logs-card" style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <section className="recent-logs-card">
      <h3 className="recent-logs-title">RECENT LOGS</h3>
      <div className="recent-logs-list">
        {logs.map((log, index) => (
          <div
            key={log._id || index}
            className={`recent-logs-item ${index !== logs.length - 1 ? "with-border" : ""}`}
          >
            <div>
              <p className="recent-logs-item-title">{log.actionType}</p>
              
              {/* Uses the Mongoose .populate() we wrote earlier to grab the Name! */}
              <p className="recent-logs-item-meta">
                {log.adminId ? `Admin: ${log.adminId.name}` : "System Automated Event"}
              </p>
            </div>
            <span className="recent-logs-item-time">{formatTimeAgo(log.createdAt)}</span>
          </div>
        ))}
        {logs.length === 0 && (
           <div style={{ color: "#9ca3af", padding: "20px", fontSize: "14px", fontStyle: "italic" }}>
             No logs recorded yet. Go change a setting or toggle an account to see an action appear here!
           </div>
        )}
      </div>
    </section>
  );
};

export default RecentLogs;
