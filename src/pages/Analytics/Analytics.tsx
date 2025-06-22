import React from 'react';
import styles from './Analytics.module.css';
import ButtonUpload, { type ButtonUploadProps } from '@components/ButtonUpload/ButtonUpload';
import Button from '@components/Button/Button';
import classNames from 'classnames';
import { useFileStore } from '@store/fileStore/useFileStore';
import AggregationResult from '@components/AggregationResult/AggregationResult';

const Analytics: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { file, status, fileStats, loadFile, destroy: clear, parse } = useFileStore();
  const [dragHover, setDragHover] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  // обработка drag and drop
  const zoneDragDrop: React.DragEventHandler = React.useCallback(
    (evt) => {
      if (status !== 'not') {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.type === 'dragenter') {
        setDragHover(true);
      } else if (evt.type === 'dragleave') {
        if (evt.target === evt.currentTarget) {
          setDragHover(false);
        }
      } else if (evt.type === 'drop') {
        setDragHover(false);
        if (evt.dataTransfer.files.length === 1) {
          loadFile(evt.dataTransfer.files[0]);
        }
      }
    },
    [loadFile, status],
  );

  // загрузка файла по клику
  const zoneClick = React.useCallback(() => {
    if (status !== 'not') {
      return;
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [status]);

  const zoneLoad: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (evt) => {
      if (status !== 'not') {
        return;
      }
      const file = evt.target.files?.[0];
      if (file) {
        loadFile(file);
      }
    },
    [loadFile, status],
  );

  // очистка зоны
  const zoneClear = React.useCallback(() => {
    if (status === 'invalid' || status === 'loaded' || status === 'done') {
      if (formRef.current) {
        formRef.current.reset();
      }
      clear();
    }
  }, [clear, status]);

  // отправка файла
  const zoneAction = React.useCallback(() => {
    if (status === 'loaded') {
      parse();
    }
  }, [parse, status]);

  const statusToButtonUploadView: Record<typeof status, ButtonUploadProps['view']> = {
    not: 'active',
    invalid: 'error',
    loaded: 'process',
    parsing: 'parsing',
    done: 'done',
  };

  return (
    <div className="container">
      <div className={styles.inner}>
        <div className={styles.upload}>
          <div className={styles.title}>
            Загрузите <span>csv</span> файл и получите <span>полную информацию</span> о нём за сверхнизкое время
          </div>

          <div
            className={classNames(styles.zone, {
              [styles.zone_active]: dragHover,
              [styles.zone_loaded]: status === 'loaded',
              [styles.zone_error]: status === 'invalid',
              [styles.zone_parsing]: status === 'parsing',
            })}
            onDragEnter={zoneDragDrop}
            onDragOver={zoneDragDrop}
            onDragLeave={zoneDragDrop}
            onDrop={zoneDragDrop}
          >
            <form ref={formRef}>
              <input ref={inputRef} type="file" className={styles.zone__input} onChange={zoneLoad} />
            </form>

            <ButtonUpload
              view={statusToButtonUploadView[status]}
              filename={file?.name}
              onButton={zoneClick}
              onClear={zoneClear}
            />
          </div>
          {['not', 'loaded'].includes(status) && (
            <div className={styles.actions}>
              <Button onClick={zoneAction} view={status === 'not' ? 'unactive' : 'active'}>
                Отправить
              </Button>
            </div>
          )}
        </div>
        <AggregationResult stats={fileStats} columns={2} />
      </div>
    </div>
  );
};

export default Analytics;
