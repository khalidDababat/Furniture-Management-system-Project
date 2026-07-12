"use client";

import { useEffect, useState } from "react";
import styles from "./ManufacturingProcess.module.scss";
import { getManufacturingSteps } from "@/services/api";
import { ManufacturingStep } from "@/types";

export default function ManufacturingProcess() {
  const [steps, setSteps] = useState<ManufacturingStep[]>([]);

  useEffect(() => {
    getManufacturingSteps()
      .then((data) => {
        setSteps(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div className={styles.inner}>
        {/* Left: image */}
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <img
              src="http://localhost:3001/hero3.png"
              alt="Manufacturing Process"
              className={styles.img}
            />
            <div className={styles.imageAccent} />
          </div>

          <div className={styles.badge}>
            <span className={styles.badgeValue}>25+</span>
            <span className={styles.badgeLabel}>
              سنوات من
              <br />
              الحرفية
            </span>
          </div>
        </div>

        {/* Right */}
        <div className={styles.contentCol}>
          <span className="gold-bar" />

          <h2 id="process-title" className="section-title">
            عملية التصنيع لدينا
          </h2>

          <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
            من الفكرة إلى التنفيذ | اكتشف كيف نحول رؤيتك إلى واقع بدقة وشغف.
          </p>

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.id} className={styles.step}>
                <div className={styles.stepNum}>
                  {String(step.id).padStart(2, "0")}
                </div>

                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
