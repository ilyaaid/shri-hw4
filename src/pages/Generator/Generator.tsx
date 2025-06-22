import React from 'react';
import styles from './Generator.module.css';
import Button from '@components/Button/Button';
import type { ButtonUploadProps } from '@components/ButtonUpload/ButtonUpload';
import { useFileGeneratorStore } from '@store/fileGeneratorStore/useFileGeneratorStore';
import ButtonUpload from '@components/ButtonUpload/ButtonUpload';

const Generator: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { status, generate, destroy } = useFileGeneratorStore();

  const handleStartGenerate = React.useCallback(() => {
    generate();
  }, [generate]);

  const handleClear = React.useCallback(() => {
    destroy();
  }, [destroy]);

  const statusToButtonUploadView: Record<typeof status, ButtonUploadProps['view']> = {
    not: 'active',
    error: 'gen_error',
    generate: 'gen',
    done: 'gen_done',
  };

  return (
    <div className="container">
      <div className={styles.inner}>
        <div className={styles.upload}>
          <div className={styles.title}>Сгенерируйте готовый csv-файл нажатием одной кнопки</div>

          {status === 'not' ? (
            <Button onClick={handleStartGenerate} view="active">
              Начать генерацию
            </Button>
          ) : (
            <ButtonUpload onClear={handleClear} view={statusToButtonUploadView[status]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
