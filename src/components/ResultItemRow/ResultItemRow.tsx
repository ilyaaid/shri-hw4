import type React from 'react';
import styles from './ResultItemRow.module.css';

type ResultItemRowProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string | number;
  desc: string;
  color?: string;
};

const ResultItemRow: React.FC<ResultItemRowProps> = ({ value, desc, color }) => {
  return (
    <div className={styles.default} style={{ backgroundColor: color }}>
      <div className={styles.value}>{value}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};

export default ResultItemRow;
