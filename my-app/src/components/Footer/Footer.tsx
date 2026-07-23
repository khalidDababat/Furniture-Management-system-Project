"use client";

import styles from "./Footer.module.scss";

// MUI Icons
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

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
              <FacebookRoundedIcon fontSize="small" />
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className={styles.social}>
              <InstagramIcon fontSize="small" />
            </a>
            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp" className={styles.social}>
              <WhatsAppIcon fontSize="small" />
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
              <PhoneRoundedIcon fontSize="small" />
              <a href="tel:+97059000000">+970 59 000 0000</a>
            </div>
            <div className={styles.contactItem}>
              <EmailRoundedIcon fontSize="small" />
              <a href="mailto:info@ziad-furniture.com">
                info@ziad-furniture.com
              </a>
            </div>
            <div className={styles.contactItem}>
              <LocationOnRoundedIcon fontSize="small" />
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
