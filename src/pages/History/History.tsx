import React from 'react';
import styles from './History.module.css';
import { useHistoryAnalyticsStore } from '@store/historyAnalyticsStore/useHistoryAnalyticsStore';
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { history, removeItem, clear } = useHistoryAnalyticsStore();

  const handleHistoryRowClick = React.useCallback(() => {
    setIsModalOpen(true);
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
            {history.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <HistoryRow
                    id={item.id}
                    date={getFormattedDate(item.date)}
                    filename={item.filename}
                    success={item.success}
                    onDelete={handleDeleteItem}
                    onRowClick={handleHistoryRowClick}
                  />
                  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AggregationResult stats={item.result} columns={1} itemColor="#EACDFF" />
                  </Modal>
                </React.Fragment>
              );
            })}
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
