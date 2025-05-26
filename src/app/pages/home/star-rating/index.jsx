import React from "react";
import { Rate } from "antd";

export const StarRating = () => {
  return (
    <Rate disabled defaultValue={5} style={{ color: "var(--primary-color)" }} />
  );
};
