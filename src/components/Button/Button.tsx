import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  view: 'active' | 'unactive' | 'download' | 'clear';
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ view, className, children, ...other }) => {
  const classes = classNames(className, styles.main, styles[`main-${view}`]);
  return (
    <button className={classes} disabled={view === 'unactive'} {...other}>
      {children}
    </button>
  );
};

export default Button;
