export type formatDateProps = {
  label?: string;
};
 
export const gehl = "asdfa             ";

export function formatDate({ label = "Date" }: formatDateProps = {}): string {
  const date = new Date().toDateString();
  return `${label}: ${date}`;
}

export default formatDate;
