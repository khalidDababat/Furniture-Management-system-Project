import type { ElementType, ReactNode } from "react";
import cx from "@/utility/cx"; // You Can Use CLSX Liprary
import styles from "./Container.module.scss";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cx(styles.container, className)}>{children}</Tag>;
}
