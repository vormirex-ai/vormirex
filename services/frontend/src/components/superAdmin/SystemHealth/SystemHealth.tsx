import "./SystemHealth.css";
import { Server, BadgeCheck, AlertCircle } from "lucide-react";

const statusItems = [
  {
    label: "SERVER STATUS",
    value: "OK",
    icon: Server,
    valueClass: "success",
  },
  {
    label: "API UPTIME",
    value: "99.9%",
    icon: BadgeCheck,
    valueClass: "success",
  },
  {
    label: "SECURITY ALERTS",
    value: "2",
    icon: AlertCircle,
    valueClass: "danger",
  },
];

const SystemHealth = () => {
  return (
    <section className="system-health-card">
      <h3 className="system-health-title">SYSTEM HEALTH</h3>

      <div className="system-health-list">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="system-health-item">
              <div className="system-health-left">
                <Icon size={15} strokeWidth={1.8} className="system-health-icon" />
                <span className="system-health-label">{item.label}</span>
              </div>
              <span className={`system-health-value ${item.valueClass}`}>{item.value}</span>
            </div>
          )

        })}

      </div>
    </section>
  )
}

export default SystemHealth;