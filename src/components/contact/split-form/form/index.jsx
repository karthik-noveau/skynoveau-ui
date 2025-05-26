import styles from "./contactform.style.module.css";
import { AntForm } from "@components/form";

export const ContactForm = () => {
  return <AntForm className={`${styles.contactForm}`} />;
};
