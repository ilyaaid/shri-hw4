import GeneratorIcon from '@components/Icons/GeneratorIcon/GeneratorIcon';
import HistoryIcon from '@components/Icons/HistoryIcon/HistoryIcon';
import UploadIcon from '@components/Icons/UploadIcon/UploadIcon';
import type React from 'react';
import styles from './Menu.module.css';
import { NavLink } from 'react-router';
import { routes } from '@config/routes';
import classNames from 'classnames';

const Menu: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const menuData = [
    {
      icon: <UploadIcon />,
      text: 'CSV Аналитик',
      link: routes.analytics.create(),
    },
    {
      icon: <GeneratorIcon />,
      text: 'CSV Генератор',
      link: routes.generator.create(),
    },
    {
      icon: <HistoryIcon />,
      text: 'История',
      link: routes.history.create(),
    },
  ];
  return (
    <nav className={styles.menu}>
      {menuData.map((menuItem) => {
        return (
          <NavLink
            key={menuItem.text}
            to={menuItem.link}
            className={({ isActive }) => {
              if (isActive) {
                return classNames(styles.item, styles['item-active']);
              }
              return styles.item;
            }}
          >
            {menuItem.icon}
            <div className={styles['item-text']}>{menuItem.text}</div>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Menu;
