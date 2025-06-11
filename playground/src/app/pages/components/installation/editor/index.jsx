import React, { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

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
      <button className={`text-16 ${styles.copyButton}`} onClick={handleCopy}>
        {copied ? <FaCheck /> : <FaRegCopy />}
      </button>
    </div>
  );
};
