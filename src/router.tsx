import App from '../src/APP/App';
import InputForm from '../src/APP/components/InputForm';
import Welcome from '../src/APP/components/Welcome';
import Error from '../src/APP/components/Error';
import Login from '../src/APP/components/Login';
import ConfirmForm from './APP/components/ConfirmForm';
import ConsentInfo from './APP/components/ConsentInfo';
import ResultMessage from './APP/components/ResultMessage';
import { RouteConfig } from 'react-router-config';

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/welcome',
                component: Welcome
            },
            {
                path: '/consentInfo',
                component: ConsentInfo
            },
            {
                path: '/inputForm',
                component: InputForm
            },
            {
                path:  '/confirmForm',
                component: ConfirmForm
            },
            {
                path: '/resultMessage',
                component: ResultMessage
            },
            {
                path: '*',
                component: Error
            }
        ]
    },
    {
        path: '*',
        component: Error
    }
] as RouteConfig[];

export default routes;