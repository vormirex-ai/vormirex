import "./UserStats.css";
import { Users, UserCheck, Shield, Activity } from "lucide-react";

interface UserStatsProps {
  total: number;
  active: number;
  admins: number;
}

const UserStats = ({ total, active, admins }: UserStatsProps) => {
  const stats = [
    { label: "Total Users", value: total.toLocaleString(), change: "", icon: Users },
    { label: "Active Users", value: active.toLocaleString(), change: "", icon: UserCheck },
    { label: "Admins", value: admins.toString(), change: "", icon: Shield },
    { label: "Platform Health", value: "Optimal", change: "", icon: Activity },
  ];

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