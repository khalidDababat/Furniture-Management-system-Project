"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import Logo from "@/components/Logo";
import Socials from "@/components/Socials";
import Container from "@/components/Container";
import type { Category, Company } from "@/types";
import styles from "./Footer.module.scss";

export default function Footer({
  company,
  categories,
}: {
  company: Company;
  categories: Category[];
}) {
  const { t, tr, lang } = useLanguage();
  const year = new Date().getFullYear();
  const links: [string, string][] = [
    ["/#projects", t.nav.latestWork],
    ["/#catalog", t.nav.products],
    ["/#clients", t.nav.clients],
    ["/#about", t.nav.about],
    ["/#contact", t.nav.contact],
    ["/#careers", t.nav.careers],
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <Link className={styles.brand} href="/">
              <Logo />
              <div className={styles.bt}>
                <b>{t.brand}</b>
              </div>
            </Link>
            <p className={styles.about}>{t.footer.about}</p>
            <div className={styles.social}>
              <Socials
                socials={company.socials}
                anchorClass={styles.socialBtn}
              />
            </div>
          </div>

          <div className={styles.col}>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              {links.map((l) => (
                <li key={l[0]}>
                  <Link href={l[0]}>{l[1]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>{t.footer.ourCategories}</h4>
            <ul>
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/categories/${c.id}`}>{tr(c, "name")}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>{t.footer.contactUs}</h4>
            <ul>
              <li>
                <a
                  href={`tel:${company.phones[0].replace(/\s/g, "")}`}
                  dir="ltr"
                >
                  {company.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                {tr(company.branches[0], "city")} —{" "}
                {tr(company.branches[0], "address")}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {year} {t.brand}. {t.footer.rights}.
          </span>
          <span className={styles.bottomEnd}>
            <Link className={styles.adminLink} href="/admin/login">
              {t.admin.brand}
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
