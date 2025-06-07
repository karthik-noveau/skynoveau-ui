import styles from "./contactform.style.module.css";
import { AntForm } from "package/react/src/components/form";

export const ContactForm = () => {
  return <AntForm className={`${styles.contactForm}`} />;
};
