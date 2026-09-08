"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  orderService,
  adminService,
  categotyService,
  jobService,
} from "@/services/api";

import type { Job, JobApplication, Order, Category } from "@/types";
import WorkRounded from "@mui/icons-material/WorkRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import CategoryRounded from "@mui/icons-material/CategoryRounded";
import styles from "@/styles/admin.module.scss";

export default function DashboardAdmin() {
  const { t } = useLanguage();
  const adminT = t.admin;
  const [dashboardData, setDashboardData] = useState<{
    jobs: Job[];
    apps: JobApplication[];
    orders: Order[];
    cats: Category[];
  } | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [jobs, apps, orders, cats] = await Promise.all([
          jobService.getJobs(),
          adminService.getApplications(),
          orderService.getOrders(),
          categotyService.getCategories(),
        ]);
        setDashboardData({ jobs, apps, orders, cats });
      } catch {
        setErr(true);
      }
    })();
  }, []);

  if (err) return <p className={styles.center}>{adminT.common.error}</p>;
  if (!dashboardData)
    return <p className={styles.center}>{adminT.common.loading}</p>;

  const cards: [string, number, ReactNode][] = [
    [adminT.dashboard.jobs, dashboardData.jobs.length, <WorkRounded key="j" />],
    [
      adminT.dashboard.applications,
      dashboardData.apps.length,
      <DescriptionRounded key="a" />,
    ],
    [
      adminT.dashboard.orders,
      dashboardData.orders.length,
      <ShoppingBagRounded key="o" />,
    ],
    [
      adminT.dashboard.categories,
      dashboardData.cats.length,
      <CategoryRounded key="c" />,
    ],
  ];

  return (
    <>
      <div className={styles.pageHead}>
        <h1>{adminT.dashboard.title}</h1>
      </div>
      <div className={styles.statGrid}>
        {cards.map(([label, count, icon], index) => (
          <div className={styles.statCard} key={index}>
            <div className={styles.statIco}>{icon}</div>
            <div>
              <div className={styles.statNum}>{count}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.panelHead}>{adminT.dashboard.recentApps}</div>
          <div className={styles.list}>
            {dashboardData.apps.length ? (
              [...dashboardData.apps]
                .slice(-5)
                .reverse()
                .map((application) => (
                  <div className={styles.listItem} key={application.id}>
                    <b>{application.fullName}</b>
                    <span>{application.jobTitle}</span>
                  </div>
                ))
            ) : (
              <div className={styles.listItem}>
                <span>{adminT.dashboard.none}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            {adminT.dashboard.recentOrders}
          </div>
          <div className={styles.list}>
            {dashboardData.orders.length ? (
              [...dashboardData.orders]
                .slice(-5)
                .reverse()
                .map((order) => (
                  <div className={styles.listItem} key={order.id}>
                    <b>{order.customerName}</b>
                    <span></span>
                  </div>
                ))
            ) : (
              <div className={styles.listItem}>
                <span>{adminT.dashboard.none}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
