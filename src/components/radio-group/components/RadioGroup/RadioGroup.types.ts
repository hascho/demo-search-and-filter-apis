import { ChangeEventHandler, ReactNode } from "react";

export type RadioGroupProps = {
  legend: string;
  legendId: string;
  name: string;
  // value: string;
  onChange: ChangeEventHandler;
  children: ReactNode | ReactNode[];
};
