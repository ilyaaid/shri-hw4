import type React from 'react';
import styles from './AggregationResult.module.css';
import { aggregationStatsParamToDesc, type AggregationStatsModel } from '@models/AggregationStats';
import ResultItemRow from '@components/ResultItemRow/ResultItemRow';
import classNames from 'classnames';

type AggregationResultProps = React.HTMLAttributes<HTMLDivElement> & {
  stats: AggregationStatsModel | null;
  columns: number;
  itemColor?: string;
};

const AggregationResult: React.FC<AggregationResultProps> = ({ stats, columns, itemColor, ...other }) => {
  const classes = classNames({ [styles.empty]: !stats, [styles.result]: stats });
  return (
    <div className={classes} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} {...other}>
      {!stats
        ? 'Здесь появятся хайлайты'
        : Object.keys(stats).map((key) => {
            const newKey = key as keyof AggregationStatsModel;
            const desc = aggregationStatsParamToDesc(newKey);
            return <ResultItemRow key={desc} value={stats[newKey]} desc={desc} color={itemColor} />;
          })}
    </div>
  );
};

export default AggregationResult;
