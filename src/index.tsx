import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

import Router from './Routes'
import './styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router />
);

