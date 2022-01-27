import type { DropdownItemProps } from "./DropdownItem.types";

export const DropdownItem = (props: DropdownItemProps) => {
  const { value, children } = props;
  return <option value={value}>{children}</option>;
};
