import type { RadioProps } from "./Radio.types";

export const Radio = (props: RadioProps) => {
  const { id, name, value, onChange, label } = props;

  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
