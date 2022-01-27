import type { DropdownProps } from "./Dropdown.types";

export const Dropdown = (props: DropdownProps) => {
  const { name, labelId, id, value, label, onChange, children } = props;

  return (
    <div>
      <label id={labelId} htmlFor={`${id}-select`}>
        {label}
      </label>
      <select name={name} id={`${id}-select`} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};
