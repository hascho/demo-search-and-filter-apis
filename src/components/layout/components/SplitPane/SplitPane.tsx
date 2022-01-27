import type { SplitPaneProps } from "./SplitPane.types";
import { useStyles } from "./useStyles";

export const SplitPane = (props: SplitPaneProps) => {
  const { children } = props;
  const styles = useStyles();
  return <div className={styles.container}>{children}</div>;
};
