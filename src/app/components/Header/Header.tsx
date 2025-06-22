import type React from 'react';
import Menu from './components/Menu/Menu';
import LogoIcon from '@components/Icons/LogoIcon/LogoIcon';
import styles from './Header.module.css';

const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <header>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles['logo-container']}>
            <LogoIcon />
            <div className={styles.title}>Межгалактическая аналитика</div>
          </div>
          <Menu className={styles.menu}></Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
