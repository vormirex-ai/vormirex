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
        <div className="super-admin-stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7C3 5.9 3.9 5 5 5h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
            <line x1="9" y1="12" x2="9" y2="16" />
            <line x1="12" y1="10" x2="12" y2="16" />
            <line x1="15" y1="13" x2="15" y2="16" />
          </svg>
        </div>
      </div>

      <h3 className="super-admin-stat-value">{value}</h3>
      <p className="super-admin-stat-change">{change}</p>
    </article>
  );
};

export default StatCard;
