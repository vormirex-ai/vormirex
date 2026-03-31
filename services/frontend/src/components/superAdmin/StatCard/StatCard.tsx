import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard = ({ title, value, change }: StatCardProps) => {
  return (
    <article className="super-admin-stat-card">
      <div className="super-admin-stat-card-top">
        <span className="super-admin-stat-title">{title}</span>
        <div className="super-admin-stat-icon"></div>
      </div>

      <h3 className="super-admin-stat-value">{value}</h3>
      <p className="super-admin-stat-change">{change}</p>
    </article>
  );
};

export default StatCard;
