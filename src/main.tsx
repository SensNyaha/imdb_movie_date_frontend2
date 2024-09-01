//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import store from './store/store.ts';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import Base from './Layouts/Base.tsx';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage.tsx';
import RegistrationConfirmPage from './pages/RegistrationConfirmPage/RegistrationConfirmPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Base/>,
		children:[
			{
				path: '/',
				element: <AuthorizationPage/>
			}
		]
	},
	{
		path: '/register/confirm',
		element: <RegistrationConfirmPage/>
	},
	{
		path: '*',
		element: <ErrorPage/>
	}
]);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router}/>
	</Provider>
);
