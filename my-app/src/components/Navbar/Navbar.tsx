"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "اخر المنتجات", href: "/latest" },
  { label: "الصفحة الرئيسية", href: "/" },

  { label: "المنتجات", href: "/products" },
  { label: "العملاء", href: "/customers" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "الوظائف", href: "/careers" },
];

// ─────────────────────────────────────────────
//  SVG Icon Components
// ─────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─────────────────────────────────────────────
//  Navbar Component
// ─────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

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
        {/* ── Brand / Logo (left in LTR) ── */}
        <Link href="/" className={styles.brand} aria-label="Home">
          <div className={styles.brandDecor} aria-hidden="true" />
          <div className={styles.brandName}>
            Ziad Al-Shakhshir
            <span>Furniture</span>
          </div>
        </Link>

        {/* ── Desktop Nav Links (center) ── */}
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

        {/* ── Actions / Icons (right in LTR) ── */}
        <div
          className={styles.actions}
          role="group"
          aria-label="Navigation tools"
        >
          {/* Search */}
          <button
            id="nav-search-btn"
            className={styles.iconBtn}
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <SearchIcon />
          </button>

          <div className={styles.divider} aria-hidden="true" />

          {/* User */}
          <Link
            href="/login"
            id="nav-user-btn"
            className={styles.iconBtn}
            aria-label="My Account"
          >
            <UserIcon />
          </Link>

          {/* Wishlist */}
          <button
            id="nav-wishlist-btn"
            className={styles.iconBtn}
            aria-label="Wishlist"
          >
            <HeartIcon />
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
            <CartIcon />
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
          <SearchIcon />
          <input
            id="nav-search-input"
            type="search"
            className={styles.searchInput}
            placeholder="Search for a product, category or brand..."
            autoComplete="off"
            autoFocus={searchOpen}
          />
          <button
            className={styles.searchClose}
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <CloseIcon />
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
