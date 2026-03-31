import "./AdminManagement.css";
import { Shield, UserCheck, UserX, Users } from "lucide-react";

const stats = [
  {
    title: "TOTAL ADMINS",
    value: "6",
    icon: <Users size={22} />,
  },
  {
    title: "ACTIVE",
    value: "5",
    icon: <UserCheck size={22} />,
  },
  {
    title: "INACTIVE",
    value: "1",
    icon: <UserX size={22} />,
  },
  {
    title: "SUPER ADMINS",
    value: "2",
    icon: <Shield size={22} />,
  },
];

const AdminManagementStats = () => {
  return (
    <section className="admin-management-stats">
      {stats.map((stat) => (
        <article className="admin-stat-card" key={stat.title}>
          <div className="admin-stat-copy">
            <span>{stat.title}</span>
            <h3>{stat.value}</h3>
          </div>

          <div className="admin-stat-icon">{stat.icon}</div>
        </article>
      ))}
    </section>
  );
};

export default AdminManagementStats;