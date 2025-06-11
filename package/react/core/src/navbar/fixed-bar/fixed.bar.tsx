import React from "react";

interface FixedBarProps {
  height: number | string;
}

export const FixedBar: React.FC<FixedBarProps> = ({ height }) => {
  return <div style={{ height }} />;
};
