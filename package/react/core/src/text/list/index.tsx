import React, { cloneElement, FC, isValidElement, ReactNode } from "react";
import { MdCheck } from "react-icons/md"; // Default icon

import styles from "./styles.module.css";

type ListProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode; // shared icon
};

type ItemProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode; // overrides list icon if needed
};

// ✅ List
export const List: FC<ListProps> = ({ children, icon, className = "" }) => {
  // Use default icon if none provided
  const sharedIcon = icon ?? <MdCheck />;

  const childrenArray = React.Children.map(children, (child) => {
    if (isValidElement<ItemProps>(child)) {
      return cloneElement(child, {
        icon: (child.props as ItemProps).icon ?? sharedIcon,
      });
    }
    return child;
  });

  return <div className={`${styles.list} ${className}`}>{childrenArray}</div>;
};

// ✅ Item
export const Item: FC<ItemProps> = ({
  title,
  children,
  icon,
  className = "",
}) => {
  return (
    <div className={`${styles.item} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={styles.description}>{children}</div>
      </div>
    </div>
  );
};
