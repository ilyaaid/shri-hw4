import React from 'react';
import styles from './History.module.css';
import { useHistoryAnalyticsStore, type HistoryItem } from '@store/historyAnalyticsStore/useHistoryAnalyticsStore';
import HistoryRow from '@components/HistoryRow/HistoryRow';
import Button from '@components/Button/Button';
import { NavLink } from 'react-router';
import { routes } from '@config/routes';
import Modal from '@components/Modal/Modal';
import AggregationResult from '@components/AggregationResult/AggregationResult';

function getFormattedDate(rawDate: string) {
  const date = new Date(rawDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}

const History: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const [selectedItem, setSelectedItem] = React.useState<HistoryItem | null>(null);

  // const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { history, removeItem, clear } = useHistoryAnalyticsStore();

  const handleHistoryRowClick = React.useCallback((item: HistoryItem) => {
    setSelectedItem(item);
  }, []);

  const handleDeleteItem = React.useCallback(
    (id: string) => {
      removeItem(id);
    },
    [removeItem],
  );

  const handleClear = React.useCallback(() => {
    clear();
  }, [clear]);

  return (
    <div className="container">
      <div className={styles.inner}>
        {history.length === 0 ? (
          <div className={styles.empty}>История пуста</div>
        ) : (
          <div className={styles.upload}>
            {history.map((item) => (
              <HistoryRow
                key={item.id}
                id={item.id}
                date={getFormattedDate(item.date)}
                filename={item.filename}
                success={item.success}
                onDelete={handleDeleteItem}
                onRowClick={() => handleHistoryRowClick(item)}
              />
            ))}

            {selectedItem && (
              <Modal isOpen={true} onClose={() => setSelectedItem(null)}>
                <AggregationResult
                  emptyMessage="При анализе была обнаружена ошибка"
                  stats={selectedItem.result}
                  columns={1}
                  itemColor="#EACDFF"
                />
              </Modal>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <NavLink to={routes.generator.create()}>
            <Button view="active"> Сгенерировать больше</Button>
          </NavLink>
          <Button view="clear" onClick={handleClear}>
            Очистить всё
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
