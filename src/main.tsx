import './styles/global.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFound } from './components/NotFound';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);
