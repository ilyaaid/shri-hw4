import type React from 'react';
import styles from './HistoryRow.module.css';
import TrashIcon from '@components/Icons/TrashIcon/TrashIcon';
import FileIcon from '@components/Icons/FileIcon/FileIcon';
import SmileIcon from '@components/Icons/SmileIcon/SmileIcon';
import classNames from 'classnames';

type HistoryRowProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  filename: string;
  date: string;
  success: boolean;
  onDelete: (id: string) => void;
  onRowClick: () => void;
};

const HistoryRow: React.FC<HistoryRowProps> = ({ id, filename, date, success, onDelete, onRowClick }) => {
  return (
    <div className={styles.row}>
      <div className={styles.content} onClick={onRowClick}>
        <div className={styles.item}>
          <FileIcon />
          {filename}
        </div>
        <div className={styles.item}>{date}</div>

        <div className={classNames(styles.item, !success && styles['item-blur'])}>
          <div>Обработан успешно</div>
          <SmileIcon sad={false} {...(success ? {} : { color: '#8F64AE' })} />
        </div>

        <div className={classNames(styles.item, success && styles['item-blur'])}>
          <div>Не удалось обработать</div>
          <SmileIcon sad={true} {...(success ? { color: '#8F64AE' } : {})} />
        </div>
      </div>
      <div
        onClick={() => {
          onDelete(id);
        }}
        className={styles.delete}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default HistoryRow;
