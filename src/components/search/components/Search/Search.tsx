import type { SearchProps } from "./Search.types";

export const Search = (props: SearchProps) => {
  const { value, onChange } = props;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
