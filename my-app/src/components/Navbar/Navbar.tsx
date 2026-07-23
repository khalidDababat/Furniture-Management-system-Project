"use client";

import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import styles from "./Navbar.module.scss";

// MUI Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS_AR: NavLink[] = [
  { label: "اخر المنتجات", href: "/latest" },
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "العملاء", href: "/customers" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "الوظائف", href: "/careers" },
];

const NAV_LINKS_EN: NavLink[] = [
  { label: "Latest Products", href: "/latest" },
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Clients", href: "/customers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { lang, toggleLang } = useLang();
  const NAV_LINKS = lang === "ar" ? NAV_LINKS_AR : NAV_LINKS_EN;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      {/* ── Main bar ── */}
      <div className={styles.inner}>
        {/* ── Brand / Logo ── */}
        <Link href="/" className={styles.brand} aria-label="Home">
          <div className={styles.brandDecor} aria-hidden="true" />
          <div className={styles.brandName}>
            Ziad Al-Shakhshir
            <span>Furniture</span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav aria-label="Main navigation">
          <ul className={styles.navLinks} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${activeLink === link.href ? styles.active : ""}`}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={activeLink === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Actions / Icons ── */}
        <div
          className={styles.actions}
          role="group"
          aria-label="Navigation tools"
        >
          {/* Language Toggle */}
          <button
            id="nav-lang-btn"
            className={`${styles.iconBtn} ${styles.langBtn}`}
            onClick={toggleLang}
            aria-label={
              lang === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
            title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <TranslateRoundedIcon fontSize="small" />
            <span className={styles.langLabel}>
              {lang === "ar" ? "EN" : "AR"}
            </span>
          </button>

          <div className={styles.divider} aria-hidden="true" />

          {/* Search */}
          <button
            id="nav-search-btn"
            className={styles.iconBtn}
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <SearchRoundedIcon fontSize="small" />
          </button>

          <div className={styles.divider} aria-hidden="true" />

          {/* User */}
          <Link
            href="/login"
            id="nav-user-btn"
            className={styles.iconBtn}
            aria-label="My Account"
          >
            <PersonRoundedIcon fontSize="small" />
          </Link>

          {/* Wishlist */}
          <button
            id="nav-wishlist-btn"
            className={styles.iconBtn}
            aria-label="Wishlist"
          >
            <FavoriteBorderRoundedIcon fontSize="small" />
            <span className={styles.badge} aria-label="3 items in wishlist">
              3
            </span>
          </button>

          {/* Cart */}
          <button
            id="nav-cart-btn"
            className={styles.iconBtn}
            aria-label="Shopping Cart"
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
            <span className={styles.badge} aria-label="2 items in cart">
              2
            </span>
          </button>

          {/* Hamburger (mobile only) */}
          <button
            id="nav-hamburger-btn"
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Inline Search Bar ── */}
      <div
        className={`${styles.searchBar} ${searchOpen ? styles.open : ""}`}
        role="search"
        aria-hidden={!searchOpen}
        id="nav-search-bar"
      >
        <div className={styles.searchInner}>
          <SearchRoundedIcon fontSize="small" />
          <input
            id="nav-search-input"
            type="search"
            className={styles.searchInput}
            placeholder={
              lang === "ar"
                ? "ابحث عن منتج أو فئة أو علامة تجارية..."
                : "Search for a product, category or brand..."
            }
            autoComplete="off"
            autoFocus={searchOpen}
          />
          <button
            className={styles.searchClose}
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer Menu ── */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}
        role="navigation"
        aria-label="Mobile main navigation"
        aria-hidden={!mobileOpen}
      >
        <ul className={styles.mobileNavLinks} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.mobileNavLink} ${activeLink === link.href ? styles.active : ""}`}
                onClick={() => handleNavClick(link.href)}
                aria-current={activeLink === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
