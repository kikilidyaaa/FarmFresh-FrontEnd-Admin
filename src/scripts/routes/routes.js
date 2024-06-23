import Home from '../views/pages/home';
import Location from '../views/pages/location';
import History from '../views/pages/history';
import Review from '../views/pages/review';
import Items from '../views/pages/item';
import Store from '../views/pages/store';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/location': Location,
  '/history': History,
  '/review': Review,
  '/item': Items,
  '/store': Store,
};

export default routes;
