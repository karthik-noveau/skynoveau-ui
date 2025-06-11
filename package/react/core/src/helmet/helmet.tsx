import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

export interface HelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
}

const Helmet: React.FC<HelmetProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {children}
    </ReactHelmet>
  );
};

export default Helmet;
