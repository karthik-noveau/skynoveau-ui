import styles from "./loader.module.css";

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`${styles.loaderWrapper} ${className ?? ""}`}>
      <div className={styles.circle}></div>
      <div className={styles.imageContainer}>
        <p>The Making Wonders</p>
      </div>
    </div>
  );
};
