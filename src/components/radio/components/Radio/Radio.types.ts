import { ChangeEventHandler } from "react";

export type RadioProps = {
  label: string;
  id: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler;
};
