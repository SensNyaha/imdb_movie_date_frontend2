import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {SubmitHandler, useForm} from 'react-hook-form';
import {SetPasswordCredits} from '../../store/user/user.types.ts';
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../store/user/user.slice.ts';
import {DispatchType} from '../../store/store.ts';

function ResetPasswordConfirmPage() {
	const [params] = useSearchParams();
	const dispatch = useDispatch<DispatchType>();
	const navigate = useNavigate();

	const [status, setStatus] = useState('');
	const [successReset, setSuccessReset] = useState(false);
	const [passwordToken, setPasswordToken] = useState('');

	const {register, handleSubmit} = useForm<SetPasswordCredits>();

	useEffect(() => {
		const confirmResetPasswordFunc = async () => {
			if (params.get('confirm') && params.get('token')) {
				try {
					const response = await axios.get(params.get('confirm') as string + params.get('token') as string);
					return response.data;
				}
				catch (error) {
					if (error instanceof AxiosError)
						setStatus(error?.response?.data?.message || error.message);
				}
			} else {
				setStatus('No confirmation link was provided! Try again later');
			}
		};

		confirmResetPasswordFunc()
			.then(data => {
				if (data.message && data.data.recoveryToken) {
					setPasswordToken(data.data.recoveryToken);
					setStatus(data.message);
					setSuccessReset(true);
				}
				else setStatus('Some error!');
			});
	}, []);

	const onSetNewPasswordFormSubmit: SubmitHandler<SetPasswordCredits> = (data: SetPasswordCredits) => {
		data.resetToken = passwordToken;
		dispatch(setNewPassword(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
				setStatus(data.payload.message);
				setTimeout(() => navigate('/'), 3000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div>{status}</div>
			{successReset && (
				<form onSubmit={handleSubmit(onSetNewPasswordFormSubmit)}>
					<span>Новый пароль: </span>
					<input {...register('password')} type="password"/>
					<input type="submit" value='Установить новый пароль'/>
				</form>
			)}
		</>
	);

}

export default ResetPasswordConfirmPage;