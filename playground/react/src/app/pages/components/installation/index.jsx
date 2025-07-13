import { InstallCommand } from "./editor";

import styles from "./styles.module.css";

export const Installation = () => {
  return (
    <div className={`${styles.container}`}>
      <h1 className={`text-24 weight-400 ${styles.title}`}>CLI</h1>
      <p className={`text-16 ${styles.description}`}>
        Installing skynoveau-ui with the CLI
      </p>

      <div className={`${styles.code}`}>
        <InstallCommand command="npm install @skynoveau-ui/core" />
      </div>
    </div>
  );
};
