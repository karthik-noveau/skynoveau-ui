import React, { useState } from "react";
import { HiOutlineClipboard } from "react-icons/hi2";
import { VscCheck } from "react-icons/vsc";
import copy from "copy-to-clipboard";

import styles from "./styles.module.css";

export const CopyCode = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.copyWrapper} onClick={handleCopy}>
      {copied ? (
        <VscCheck className={`text-12 ${styles.copyIcon}`} />
      ) : (
        <HiOutlineClipboard className={`text-12 ${styles.copyIcon}`} />
      )}

      <div className={`text-12 weight-400 ${styles.copyText}`}>{text}</div>
    </div>
  );
};
