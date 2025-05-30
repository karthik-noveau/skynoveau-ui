import { LOADER_SIZE } from "../constant";
import styles from "./loader.module.css";

export const Loader = ({
  size = LOADER_SIZE.SMALL,
  showText = true,
  transparent = true,
  color = "var(--black-color)",
}) => {
  return (
    <div
      style={{
        backgroundColor: transparent ? "transparent" : "var(--white-color)",
      }}
      className={`${styles.loaderContainer}`}
    >
      <div
        style={{ color: color }}
        className={`${styles.circle} ${
          size === LOADER_SIZE["BASE"] && styles.base
        } ${size === LOADER_SIZE["MEDIUM"] && styles.medium} ${
          size === LOADER_SIZE["SMALL"] && styles.small
        } ${size === LOADER_SIZE["TINY"] && styles.tiny}
        `}
      ></div>
      {showText && <p>Loading</p>}
    </div>
  );
};

export default Loader;
