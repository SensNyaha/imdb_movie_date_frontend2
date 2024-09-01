import styles from './Base.module.css';
import cn from 'classnames';
import {Outlet} from 'react-router-dom';
import store, {DispatchType} from '../store/store.ts';
import {useEffect} from 'react';
import {ADD_USERINFO_FROM_LOCALSTORAGE, getUserInfoByAccessToken} from '../store/user/user.slice.ts';
import {useDispatch} from 'react-redux';

function Base() {
	const dispatch = useDispatch<DispatchType>();

	store.subscribe(() => {
		const accessToken = store.getState().user.userInfo?.accessToken;
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken);
		}
		else {
			localStorage.removeItem('accessToken');
		}
	});

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			dispatch(getUserInfoByAccessToken({accessToken: localStorage.getItem('accessToken')}))
				.then((data) => {
					if (!data.payload.success) throw data.payload;
					alert(JSON.stringify(data.payload.data));
					dispatch(ADD_USERINFO_FROM_LOCALSTORAGE(data.payload.data));
				})
				.catch((error) => {
					console.log(error);
					alert(error.message || error);
				});
		}
	}, []);

	return (
		<div className={cn(styles['base-layout'])}>
			<Outlet/>
		</div>
	);
}

export default Base;