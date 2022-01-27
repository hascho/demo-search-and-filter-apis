import { ChangeEventHandler, ReactNode } from "react";

export type DropdownProps = {
  name: string;
  labelId: string;
  id: string;
  value: string;
  label: string;
  onChange: ChangeEventHandler;
  children: ReactNode | ReactNode[];
};
