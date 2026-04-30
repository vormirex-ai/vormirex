import "./AdminManagement.css";
import { Shield, UserCheck, UserX, Users } from "lucide-react";

interface StatsProps {
  admins: any[];
}

const AdminManagementStats = ({ admins }: StatsProps) => {

  // Dynamically calculate actual MongoDB properties
  const activeCount = admins.filter(a => a.isVerified).length;
  const inactiveCount = admins.filter(a => !a.isVerified).length;
  const superCount = admins.filter(a => a.role === 'super-admin').length;

  const stats = [
    {
      title: "TOTAL ADMINS",
      value: admins.length.toString(),
      icon: <Users size={22} />,
    },
    {
      title: "ACTIVE",
      value: activeCount.toString(),
      icon: <UserCheck size={22} />,
    },
    {
      title: "INACTIVE",
      value: inactiveCount.toString(),
      icon: <UserX size={22} />,
    },
    {
      title: "SUPER ADMINS",
      value: superCount.toString(),
      icon: <Shield size={22} />,
    },
  ];

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