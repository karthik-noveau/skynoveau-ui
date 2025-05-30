export const EmptySpace = ({ bgColor, height }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: height,
        transition: "all 0.5s",
      }}
    />
  );
};
