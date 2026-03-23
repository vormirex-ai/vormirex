import "./SuperAdminPage.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import StatCard from "../../components/superAdmin/StatCard/StatCard";
import UserGrowthChart from "../../components/superAdmin/UserGrowthChart/UserGrowth";
import SystemHealth from "../../components/superAdmin/SystemHealth/SystemHealth";
import RecentLogs from "../../components/superAdmin/RecentLogs/RecentLogs";

const SuperAdminPage = () => {
  return (
    <div className="super-admin-page">
      <Sidebar />

      <main className="super-admin-main">
        <Topbar />

        <div className="super-admin-body">
          <section className="super-admin-page-header">
            <h1 className="super-admin-page-title">Dashboard</h1>
            <p className="super-admin-page-subtitle">
              Welcome to the Super Admin dashboard. Full system overview and control.
            </p>
          </section>

          <section className="super-admin-stats">
            <StatCard
              title="TOTAL USERS"
              value="24,589"
              change="+ 12% vs last month"
            />
            <StatCard
              title="ACTIVE ADMINS"
              value="12"
              change="+ 12% vs last month"
            />
            <StatCard
              title="MONTHLY REVENUE"
              value="$48,200"
              change="+ 12% vs last month"
            />

            <StatCard
              title="NEW SIGNUPS"
              value="1,243"
              change="+ 12% vs last month"
            />
          </section>

          <section className="super-admin-content-grid">
            <UserGrowthChart />
            <SystemHealth />
          </section>
          <RecentLogs />

        </div>
      </main>
    </div>
  );
};

export default SuperAdminPage;