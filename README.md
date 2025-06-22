# React + TypeScript + Vite

### Версии и настройка

Версия Node.js: v22.13.1  
Версия npm: 10.9.2

Установка зависимостей:

```bash
npm install
```

Запуск:

```bash
npm run dev
```

Запуск линтера и форматировщика(prettier):

```bash
npm run lint
npm run format
```

### Архитектура

Поддерживается модульная архитектура.  
Pages:

- Analytics - страница аналитики
- Generator - генератор файла
- History - история операций

Shared компоненты:

- AggregationResult - компонента с результатом анализа
- Button - кнопка
- ButtonUpload - кнопки загрузки
- CrossButton - кнопка закрытия и очистки
- HistoryRow - один ряд в истории
- Icons/\* - иконки
- Modal - модальное окно
- ResultItemRow - одно поле из блока результатов  

Store:

 - fileGeneratorStore - стор для генератора
 - fileStore - стор для анализа файла и валидации
 - historyAnalyticsStore - стор для истории и синхронизации с localStorage

Models:

 - AggregationStats - модель для нормализации данных, приходящих с бекенда