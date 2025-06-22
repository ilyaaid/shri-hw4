import React from 'react';
import styles from './ButtonUpload.module.css';
import classNames from 'classnames';
import UploadLoader from '@components/Icons/UploadLoader/UploadLoader';
import CrossButton from '@components/CrossButton/CrossButton';

export type ButtonUploadProps = React.HTMLAttributes<HTMLDivElement> & {
  view: 'active' | 'process' | 'parsing' | 'done' | 'error' | 'gen' | 'gen_done' | 'gen_error';
  filename?: string;
  onButton?: () => void;
  onClear?: () => void;
};

const ButtonUpload: React.FC<ButtonUploadProps> = ({ view, filename, className, onButton, onClear, ...other }) => {
  const viewToParams: Record<
    ButtonUploadProps['view'],
    {
      btnContent: React.JSX.Element;
      desc: string;
      deletable: boolean;
    }
  > = {
    active: {
      btnContent: <>Загрузить файл</>,
      desc: 'или перетащите сюда',
      deletable: false,
    },
    process: {
      btnContent: <>{filename}</>,
      desc: 'файл загружен!',
      deletable: true,
    },
    parsing: {
      btnContent: (
        <>
          <UploadLoader></UploadLoader>
        </>
      ),
      desc: 'идёт парсинг файла',
      deletable: false,
    },
    done: {
      btnContent: <>{filename}</>,
      desc: 'готово!',
      deletable: true,
    },
    error: {
      btnContent: <>{filename}</>,
      desc: 'упс, не то...',
      deletable: true,
    },
    gen: {
      btnContent: (
        <>
          <UploadLoader></UploadLoader>
        </>
      ),
      desc: 'идёт процесс генерации',
      deletable: false,
    },
    gen_done: {
      btnContent: <>Done!</>,
      desc: 'файл сгенерирован!',
      deletable: true,
    },
    gen_error: {
      btnContent: <>Ошибка</>,
      desc: 'упс, не то...',
      deletable: true,
    },
  };

  const params = viewToParams[view];

  const classes = classNames(className, styles.default, styles[view]);
  const classesActionsMain = classNames(styles['actions-main']);
  return (
    <div className={classes} {...other}>
      <div className={styles.actions}>
        <button className={classesActionsMain} onClick={onButton}>
          {params.btnContent}
        </button>
        {params.deletable && <CrossButton onClick={onClear} />}
      </div>
      <div className={styles.desc}>{params.desc}</div>
    </div>
  );
};

export default ButtonUpload;
