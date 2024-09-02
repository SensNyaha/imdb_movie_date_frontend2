import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../store/user/user.slice.ts';
import {DispatchType, RootState} from '../../store/store.ts';

function AppPage() {
	const dispatch = useDispatch<DispatchType>();
	const accessToken = useSelector((state: RootState) => state?.user?.userInfo?.accessToken);

	return (
		<>
			<Link to="/me">Профиль</Link>
			<Link to="/app">Приложение</Link>
			<button onClick={() => {
				if (typeof accessToken !== 'undefined')
					dispatch(logoutUser({accessToken}))
						.then((data) => {
							console.log(data);
						})
						.catch((error) => {
							console.log(error);
						});
			}}>LOGOUT</button>
		    <div>APPLICATION</div>
		</>
	);
}

export default AppPage;