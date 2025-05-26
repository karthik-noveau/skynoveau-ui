import * as React from "react";
import { Button as AntButton } from "antd";

/**
 * A primary button using Ant Design's Button.
 * @param {{ children: React.ReactNode }} props
 */
const Button = ({ children, ...rest }) => (
  <AntButton type="primary" {...rest}>
    {children}
  </AntButton>
);

export default Button;
