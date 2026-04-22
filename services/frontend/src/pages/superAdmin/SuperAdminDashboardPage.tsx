import { useState, useEffect } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./SuperAdminDashboardPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import StatCard from "../../components/superAdmin/StatCard/StatCard";
import UserGrowthChart from "../../components/superAdmin/UserGrowthChart/UserGrowth";
import SystemHealth from "../../components/superAdmin/SystemHealth/SystemHealth";
import RecentLogs from "../../components/superAdmin/RecentLogs/RecentLogs";

import { fetchAdminStats } from "../../api/admin";
import GuestLeads from "../../components/superAdmin/GuestLeads/GuestLeads";

const SuperAdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // Trigger the API connection immediately when the dashboard loads
  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const data = await fetchAdminStats(token);
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className={layout.page}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
            <StatCard 
              title="TOTAL USERS"     
              value={stats?.users?.total?.toLocaleString() || "..."}  
              change={`+${stats?.users?.new || 0} this month`} 
            />
            <StatCard 
              title="ACTIVE ADMINS"   
              value={stats?.admins?.active?.toLocaleString() || "..."}      
              change="Verified Core Roles" 
            />
            <StatCard 
              title="MONTHLY REVENUE" 
              value={`$${(stats?.revenue?.total || 0).toLocaleString()}`} 
              change="Total Processed" 
            />
            <StatCard 
              title="NEW SIGNUPS"     
              value={stats?.users?.new?.toLocaleString() || "..."}   
              change="From the last 30 Days" 
            />
          </section>

          <section className={styles.contentGrid}>
            <UserGrowthChart />
            <SystemHealth />
          </section>

          <RecentLogs />
          <GuestLeads />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminPage;
