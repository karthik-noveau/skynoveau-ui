import React, { useEffect } from "react";

export const GoogleMap = ({
  latitude = "12.972420",
  longitude = "80.221270",
}) => {
  useEffect(() => {
    const ifameData = document.getElementById("iframeId");
    ifameData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`;
  });
  return (
    <iframe
      id="iframeId"
      height="480px"
      width="100%"
      title="map"
      style={{ border: 0 }}
    ></iframe>
  );
};
