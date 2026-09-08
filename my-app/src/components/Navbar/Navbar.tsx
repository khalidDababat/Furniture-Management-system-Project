"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import Logo from "@/components/Logo/Logo";
import SafeImage from "@/components/SafeImage/SafeImage";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import cx from "@/utility/cx";
import type { Company, Project } from "@/types";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ChatRounded from "@mui/icons-material/ChatRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import styles from "./Navbar.module.scss";

export default function Navbar({
  company,
  projects,
}: {
  company: Company;
  projects: Project[];
}) {
  const { t, tr, lang, dir, toggle } = useLanguage();

  const { count, setOpen } = useCart();

  const [menu, setMenu] = useState(false);
  const Chevron = dir === "rtl" ? ChevronLeftRounded : ChevronRightRounded;

  // Order: Our Latest Work (mega), Home, Products, Clients, About Us, Contact Us, Careers
  const links: [string, string][] = [
    ["/#top", t.nav.home],
    ["/#catalog", t.nav.products],
    ["/#clients", t.nav.clients],
    ["/#about", t.nav.about],
    ["/#contact", t.nav.contact],
    ["/#careers", t.nav.careers],
  ];
  const megaProjects = projects.slice(0, 3);

  return (
    <header className={styles.hdr}>
      <Container>
        <nav className={styles.nav}>
          <Link className={styles.brand} href="/">
            <Logo />
            <div className={styles.bt}>
              <b>{t.brand}</b>
            </div>
          </Link>

          <div className={styles.menu}>
            <div className={styles.hasMega}>
              <Link className={styles.megaTrigger} href="/#projects">
                {t.nav.latestWork}
                <ExpandMoreRounded
                  className={styles.caret}
                  sx={{ fontSize: 18 }}
                />
              </Link>
              <div className={styles.mega}>
                <Container>
                  <div className={styles.megaHead}>
                    <h4>{t.sections.projectsTitle}</h4>
                    <Link className={styles.megaAll} href="/#projects">
                      {t.actions.viewAll} <Chevron sx={{ fontSize: 18 }} />
                    </Link>
                  </div>
                  <div className={styles.megaGrid}>
                    {megaProjects.map((p) => (
                      <Link
                        className={styles.megaCard}
                        href="/#projects"
                        key={p.id}
                      >
                        <div className={styles.megaMedia}>
                          <SafeImage src={p.image} alt={tr(p, "title")} />
                        </div>
                        <div className={styles.megaCap}>
                          <span className={styles.tag}>{tr(p, "sector")}</span>
                          <h5>{tr(p, "title")}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Container>
              </div>
            </div>

            {links.map((link) => (
              <Link key={link[0]} href={link[0]}>
                {link[1]}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.langBtn}
              onClick={toggle}
              aria-label="language"
            >
              <LanguageRounded sx={{ fontSize: 20 }} />
              {t.langSwitch}
            </button>
            <Link
              className={styles.iconBtn}
              href="/admin/login"
              aria-label={t.nav.adminLogin}
              title={t.nav.adminLogin}
            >
              <PersonRounded sx={{ fontSize: 21 }} />
            </Link>
            <button
              className={styles.iconBtn}
              onClick={() => setOpen(true)}
              aria-label="cart"
            >
              <ShoppingCartRounded sx={{ fontSize: 21 }} />
              {count > 0 && <span className={styles.cartBadge}>{count}</span>}
            </button>
            <button
              className={cx(styles.iconBtn, styles.hamburger)}
              onClick={() => setMenu(true)}
              aria-label="menu"
            >
              <MenuRounded sx={{ fontSize: 22 }} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cx(styles.overlay, menu && styles.open)}
        onClick={() => setMenu(false)}
      />
      <div className={cx(styles.mobileMenu, menu && styles.open)}>
        <div className={styles.mmHead}>
          <Link
            className={styles.mmBrand}
            href="/"
            onClick={() => setMenu(false)}
          >
            <Logo size={36} />
            <b style={{ fontFamily: "var(--font-head)" }}>{t.brand}</b>
          </Link>
          <button
            className={styles.iconBtn}
            onClick={() => setMenu(false)}
            aria-label="close"
          >
            <CloseRounded />
          </button>
        </div>
        <Link href="/#projects" onClick={() => setMenu(false)}>
          {t.nav.latestWork}
        </Link>
        {links.map((link) => (
          <Link key={link[0]} href={link[0]} onClick={() => setMenu(false)}>
            {link[1]}
          </Link>
        ))}
        <Link href="/admin/login" onClick={() => setMenu(false)}>
          <PersonRounded
            sx={{ fontSize: 20, verticalAlign: "-4px", marginInlineEnd: "8px" }}
          />
          {t.nav.adminLogin}
        </Link>
        <div className={styles.mmCta}>
          <Button variant="ghost" onClick={toggle}>
            <LanguageRounded sx={{ fontSize: 20 }} />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
          <Button variant="primary" href={`https://wa.me/${company.whatsapp}`}>
            <ChatRounded sx={{ fontSize: 20 }} />
            {t.contact.whatsapp}
          </Button>
        </div>
      </div>
    </header>
  );
}
