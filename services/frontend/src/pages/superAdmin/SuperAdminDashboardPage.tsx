import { useState } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./SuperAdminDashboardPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import StatCard from "../../components/superAdmin/StatCard/StatCard";
import UserGrowthChart from "../../components/superAdmin/UserGrowthChart/UserGrowth";
import SystemHealth from "../../components/superAdmin/SystemHealth/SystemHealth";
import RecentLogs from "../../components/superAdmin/RecentLogs/RecentLogs";

const SuperAdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={layout.page}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

      <main className={layout.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
          
        <div className={`${layout.body} ${styles.body}`}>
          <section className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSubtitle}>
              Welcome to the Super Admin dashboard. Full system overview and control.
            </p>
          </section>

          <section className={styles.stats}>
            <StatCard title="TOTAL USERS"     value="24,589"  change="+ 12% vs last month" />
            <StatCard title="ACTIVE ADMINS"   value="12"      change="+ 12% vs last month" />
            <StatCard title="MONTHLY REVENUE" value="$48,200" change="+ 12% vs last month" />
            <StatCard title="NEW SIGNUPS"     value="1,243"   change="+ 12% vs last month" />
          </section>

          <section className={styles.contentGrid}>
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