"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import Logo from "@/components/Logo";
import NotificationBell from "@/components/admin/NotificationBell";
import NotificationToaster from "@/components/admin/NotificationToaster";
import { AdminNotificationsProvider } from "@/context/AdminNotificationsProvider";
import cx from "@/utility/cx";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import WorkRounded from "@mui/icons-material/WorkRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import CategoryRounded from "@mui/icons-material/CategoryRounded";
import Inventory2Rounded from "@mui/icons-material/Inventory2Rounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PeopleRounded from "@mui/icons-material/PeopleRounded";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import { initials } from "@/utility/format";
import s from "@/styles/admin.module.scss";

export default function AdminShell({ children }: { children: ReactNode }) {
  const { admin, ready, logout } = useAdminAuth();
  const { t, lang, toggle } = useLanguage();
  const a = t.admin;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !admin) router.replace("/admin/login");
  }, [ready, admin, router]);

  if (!ready || !admin)
    return <div className={s.center}>{a.common.loading}</div>;

  const nav: [string, string, ReactNode][] = [
    ["/admin", a.nav.dashboard, <DashboardRounded key="d" />],
    ["/admin/jobs", a.nav.jobs, <WorkRounded key="j" />],
    ["/admin/applications", a.nav.applications, <DescriptionRounded key="a" />],
    ["/admin/orders", a.nav.orders, <ShoppingBagRounded key="o" />],
    ["/admin/products", a.nav.products, <Inventory2Rounded key="pr" />],
    ["/admin/categories", a.nav.categories, <CategoryRounded key="c" />],
    ["/admin/staff", a.nav.staff, <PeopleRounded key="s" />],
    ["/admin/profile", a.nav.profile, <AccountCircleRounded key="p" />],
  ];
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <AdminNotificationsProvider>
      <div className={s.shell}>
        <aside className={s.sidebar}>
          <Link className={s.sideBrand} href="/admin">
            <Logo size={34} />
            <div className={s.bt}>
              <b>{a.brand}</b>
              <span>Ziad Shakhshir</span>
            </div>
          </Link>
          <nav className={s.navList}>
            {nav.map(([href, label, icon]) => (
              <Link
                key={href}
                href={href}
                className={cx(s.navLink, isActive(href) && s.active)}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
          <div className={s.sideFoot}>
            <Link href="/admin/profile" className={s.userRow}>
              {admin.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={s.avatar} src={admin.avatar} alt="" />
              ) : (
                <span className={s.avatarInit}>{initials(admin.name)}</span>
              )}
              <span className={s.userName}>{admin.name}</span>
            </Link>
            <button className={s.navLink} onClick={toggle}>
              <LanguageRounded />
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <Link className={s.navLink} href="/">
              <OpenInNewRounded />
              {a.nav.viewSite}
            </Link>
            <button
              className={s.navLink}
              onClick={() => {
                logout();
                router.replace("/admin/login");
              }}
            >
              <LogoutRounded />
              {a.nav.logout}
            </button>
          </div>
        </aside>
        <div className={s.main}>
          <div className={s.topbar}>
            <div className={s.topbarGreet}>
              {a.dashboard.welcome} <b>{admin.name}</b>
            </div>
            <div className={s.topbarActions}>
              <NotificationBell />
            </div>
          </div>
          <div className={s.content}>{children}</div>
        </div>
      </div>
      <NotificationToaster />
    </AdminNotificationsProvider>
  );
}
