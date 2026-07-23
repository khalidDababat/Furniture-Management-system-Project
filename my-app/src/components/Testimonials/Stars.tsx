"use client";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import styles from "./Testimonials.module.scss";

export function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < count ? (
          <StarRoundedIcon
            key={i}
            fontSize="small"
            style={{ color: "#c9a84c" }}
          />
        ) : (
          <StarOutlineRoundedIcon
            key={i}
            fontSize="small"
            style={{ color: "#c9a84c", opacity: 0.4 }}
          />
        ),
      )}
    </div>
  );
}
