import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./notfound.module.css";
import { Button } from "package/react/src/components/button/ripple";

export default function PageNotFound({ className }) {
  const navigate = useNavigate();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={`weight-300 ${styles.status}`}>404</div>
      <div className={`text-20 ${styles.description}`}>
        Oops! Page not found.
      </div>
      <Button
        onClick={() => navigate("/")}
        className={`text-16 ${styles.button}`}
      >
        Back to Home
      </Button>
    </div>
  );
}
