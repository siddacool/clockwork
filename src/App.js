import { Router } from 'domr-framework';
import Home from './views/Home';
import SearchAndAdd from './views/SearchAndAdd';

const routes = [
  {
    path: '/',
    view: Home,
    title: 'homepage',
    isDefault: true,
  },
  {
    path: '/add',
    view: SearchAndAdd,
    title: 'Search And Add',
  },
];

const router = new Router(routes);

router.Start();
