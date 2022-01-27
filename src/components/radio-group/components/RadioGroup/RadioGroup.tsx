import { Children, ReactElement, PropsWithChildren, cloneElement } from "react";
import { Radio } from "../../../radio";
import type { RadioProps } from "../../../radio";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup = (props: RadioGroupProps) => {
  const { legend, legendId, name, onChange, children: childrenProp } = props;

  const children = Children.map(childrenProp, (child) => {
    const item = child as ReactElement<PropsWithChildren<RadioProps>>;

    if (item.type === Radio) {
      return cloneElement(item, {
        name,
        onChange
      });
    } else {
      return child;
    }
  });

  return (
    <fieldset>
      <legend id={legendId}>{legend}</legend>
      {children}
    </fieldset>
  );
};
