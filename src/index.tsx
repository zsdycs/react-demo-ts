import ReactDOM from 'react-dom';
import routes from './router';
import './index.css'
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {renderRoutes(routes)}
        </HashRouter>
    </Provider>
, document.getElementById('root'));
