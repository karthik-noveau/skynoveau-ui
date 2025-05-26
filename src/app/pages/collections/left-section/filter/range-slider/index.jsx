import React, { useEffect, useState } from "react";
import { Slider as AntSlider } from "antd";

import styles from "./slider.override.module.css";
import { useDebounce } from "@hooks";

export const RangeSlider = ({ data, value, onChange }) => {
  const [range, setRange] = useState(data);
  const debouncedOnChange = useDebounce(onChange);

  // Sync with external value changes
  useEffect(() => {
    setRange(value);
  }, [value]);

  const handleSliderChange = (value) => {
    setRange(value);
    debouncedOnChange(value);
  };

  return (
    <>
      <div className={`text-14 default-font`}>
        <span className="text-14">₹ {range[0].toFixed(0)}</span> &ensp; - &ensp;
        <span className="text-14">₹ {range[1].toFixed(0)}</span>
      </div>
      <AntSlider
        range
        min={data[0]}
        max={data[1]}
        value={range}
        onChange={handleSliderChange}
        className={styles.suiRangeSlider}
        tooltip={{
          open: false,
        }}
      />
    </>
  );
};
