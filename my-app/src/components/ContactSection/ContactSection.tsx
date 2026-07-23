"use client";

import { useState } from "react";
import styles from "./ContactSection.module.scss";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      {/* Dark CTA banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <blockquote className={styles.bannerQuote}>
            &ldquo;Allow our expert team to help you furnish your space with
            exclusive designs crafted for a life of elegance and
            distinction.&rdquo;
          </blockquote>
          <p className={styles.bannerSig}>— Ziad Al-Shakhshir, Founder</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <span className="gold-bar" />
          <h2 id="contact-title" className="section-title">
            Get in Touch
          </h2>
          <p className="section-subtitle">
            We&apos;d love to hear from you — fill in the form and we&apos;ll
            get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <div className={styles.success} role="alert">
            <CheckCircleRoundedIcon
              fontSize="large"
              style={{ color: "#c9a84c" }}
            />
            <p>
              Thank you! Your message has been sent. We&apos;ll contact you
              soon.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-phone">Phone Number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="+970 59 000 0000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell us about your project, requirements or any questions..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" id="contact-submit" className={styles.submit}>
              Send Message
              <SendRoundedIcon fontSize="small" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
