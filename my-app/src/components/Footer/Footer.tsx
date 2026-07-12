import styles from "./Footer.module.scss";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/" },
  { label: "Latest Collections", href: "/" },
  { label: "About Us", href: "/" },
  { label: "Careers", href: "/" },
];

function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <div className={styles.brandDecor} />
            <div className={styles.brandName}>
              Ziad Al-Shakhshir
              <span>Furniture</span>
            </div>
          </div>
          <p className={styles.tagline}>
            نصنع أثاثًا استثنائيًا لمساحات استثنائية منذ عام ١٩٩٩. الدقة والجودة
            والأناقة في كل قطعة.
          </p>
          <div className={styles.socials}>
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className={styles.social}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className={styles.social}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp" className={styles.social}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <ul className={styles.list}>
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact Us</h3>
          <address className={styles.contact}>
            <div className={styles.contactItem}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+97059000000">+970 59 000 0000</a>
            </div>
            <div className={styles.contactItem}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:info@ziad-furniture.com">
                info@ziad-furniture.com
              </a>
            </div>
            <div className={styles.contactItem}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Ramallah, Palestine</span>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} أثاث زياد الشخشير. جميع الحقوق محفوظة.
        </p>
        <div className={styles.bottomLinks}>
          <a href="/privacy">Privacy Policy</a>
          <span>·</span>
          <a href="/terms">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
