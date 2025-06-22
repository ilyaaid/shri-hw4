import type React from 'react';
import styles from './CrossButton.module.css';
import CrossIcon from '@components/Icons/CrossIcon/CrossIcon';
import classNames from 'classnames';

type CrossButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  className?: string;
};

const CrossButton: React.FC<CrossButtonProps> = ({ className, onClick, ...other }) => {
  return (
    <button className={classNames(styles.default, className)} onClick={onClick} {...other}>
      <CrossIcon />
    </button>
  );
};

export default CrossButton;
