export interface EmptyNavbarProps {
  height: number | string;
}

export const EmptyNavbar: React.FC<EmptyNavbarProps> = ({ height }) => {
  return <div style={{ height }} />;
};
