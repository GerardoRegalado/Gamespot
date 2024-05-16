import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './Routes';
import './styles/global.scss';
import { HeaderComponent } from './components/Body/HeaderComponent/HeaderComponent';
import { FooterComponent } from './components/Body/FooterComponent/FooterComponent';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HeaderComponent />
      <Router />
      <FooterComponent />
    </BrowserRouter>
  </Provider>
);
