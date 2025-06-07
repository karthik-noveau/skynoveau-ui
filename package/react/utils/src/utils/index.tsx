import React from "react";

export type FormateDateProps = {
  label?: string;
};

export const FormateDate: React.FC<FormateDateProps> = ({ label = "Date" }) => {
  const date = "new date"; // or use new Date().toDateString()

  return (
    <span>
      {label}: {date}
    </span>
  );
};

export default FormateDate;
