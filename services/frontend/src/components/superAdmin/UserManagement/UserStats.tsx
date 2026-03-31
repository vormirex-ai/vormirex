import "./UserStats.css";
import { Users, UserCheck, Shield, Activity } from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12%", icon: Users },
  { label: "Active Users", value: "9,312", change: "+8%", icon: UserCheck },
  { label: "Admins", value: "2", change: "+2", icon: Shield },
  { label: "Total Activity", value: "34,521", change: "+18%", icon: Activity },
];

const UserStats = () => {
  return (
    <div className="user-stats-grid">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="user-stat-card">
            <div>
              <p className="stat-label">{item.label}</p>
              <h2>{item.value}</h2>
              <span className="stat-change">{item.change}</span>
            </div>

            <div className="stat-icon">
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;