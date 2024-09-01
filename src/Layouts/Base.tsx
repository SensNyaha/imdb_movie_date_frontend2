import styles from './Base.module.css';
import cn from 'classnames';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {DispatchType, RootState} from '../store/store.ts';
import {useEffect} from 'react';
import {ADD_USERINFO_FROM_LOCALSTORAGE, getUserInfoByAccessToken, REMOVE_USERINFO} from '../store/user/user.slice.ts';
import {useDispatch, useSelector} from 'react-redux';

function Base() {
	const dispatch = useDispatch<DispatchType>();
	const location = useLocation();
	const navigate = useNavigate();

	const accessToken = useSelector((state: RootState) => state?.user?.userInfo?.accessToken);

	function getUserInfoToAddToStore(accessToken: string) {
		dispatch(getUserInfoByAccessToken({accessToken}))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
				dispatch(ADD_USERINFO_FROM_LOCALSTORAGE(data.payload.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(REMOVE_USERINFO());
			});
	}

	useEffect(() => {
		if (localStorage.getItem('accessToken') && localStorage.getItem('accessToken') !== accessToken) {
			getUserInfoToAddToStore(localStorage.getItem('accessToken') as string);
		}
	}, []);

	useEffect(() => {
		if (accessToken) getUserInfoToAddToStore(accessToken);
	}, [location]);

	useEffect(() => {
		reactToAccessTokenFromStore();
	}, [accessToken]);


	async function reactToAccessTokenFromStore() {
		if (accessToken === localStorage.getItem('accessToken')) return;

		if (accessToken) {
			localStorage.setItem('accessToken', accessToken);
			if (location.pathname === '/') navigate('/app');
		}
		else {
			const data = await dispatch(getUserInfoByAccessToken({accessToken: localStorage.getItem('accessToken')}));

			if (data.payload && data.payload.success) return;

			localStorage.removeItem('accessToken');
			if (location.pathname !== '/') navigate('/');
		}
	}

	return (
		<div className={cn(styles['base-layout'])}>
			<Outlet/>
		</div>
	);
}

export default Base;