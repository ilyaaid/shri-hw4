import App from '@app/App';
import Analytics from '@pages/Analytics/Analytics';
import Generator from '@pages/Generator/Generator';
import History from '@pages/History/History';
import type { RouteObject } from 'react-router';

export const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Analytics />,
      },
      {
        path: '/generator',
        element: <Generator />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
];

export const routes = {
  analytics: {
    create: () => '/',
  },
  generator: {
    create: () => '/generator',
  },
  history: {
    create: () => '/history',
  },
};
