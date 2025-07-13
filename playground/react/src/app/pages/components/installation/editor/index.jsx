import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { GrCheckmark } from "react-icons/gr";

import styles from "./editor.module.css";

export const InstallCommand = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <code className={`text-14 ${styles.command}`}>{command}</code>
      <div className={`text-16 ${styles.copyButton}`} onClick={handleCopy}>
        {copied ? (
          <GrCheckmark className={`${styles.copyIcon}`} />
        ) : (
          <FaRegCopy className={`${styles.copyIcon}`} />
        )}
      </div>
    </div>
  );
};
