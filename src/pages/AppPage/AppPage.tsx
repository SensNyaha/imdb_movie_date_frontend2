import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, resendEmailVerification} from '../../store/user/user.slice.ts';
import {DispatchType, RootState} from '../../store/store.ts';

function AppPage() {
	const dispatch = useDispatch<DispatchType>();
	const {accessToken, emailVerified} = useSelector((state: RootState) => state?.user?.userInfo || {});

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
			{
				emailVerified ?
					<div>EMAIL VERIFIED!!!</div>
					:
					<button onClick={() => {
						dispatch(resendEmailVerification({accessToken}))
							.then((data) => {
								console.log(data);
							})
							.catch((error) => {
								console.log(error);
							});
					}
					}>RESEND EMAIL VERIFICATION</button>
			}
			<div>APPLICATION</div>
		</>
	);
}

export default AppPage;