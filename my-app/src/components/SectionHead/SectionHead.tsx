import Reveal from "@/components/Reveal";
import styles from "./SectionHead.module.scss";

export default function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className={styles.head}>
      {/* {kicker ? <p className={styles.kicker}>{kicker}</p> : null} */}
      <h2 className={styles.title}>{title}</h2>
      {sub ? <p className={styles.sub}>{sub}</p> : null}
    </Reveal>
  );
}
