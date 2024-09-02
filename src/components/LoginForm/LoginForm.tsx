import cn from 'classnames';
import styles from './LoginForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {LoginCredits} from '../../store/user/user.types.ts';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../../store/store.ts';
import {LoginFormProps} from './LoginForm.props.ts';
import {loginUser} from '../../store/user/user.slice.ts';
import {useState} from 'react';

interface LoginFormInputs {
	email: string;
	password: string;
}

function LoginForm(props: LoginFormProps) {
	const {register, handleSubmit} = useForm<LoginFormInputs>();
	const [resetPasswordMode, setResetPasswordMode] = useState(false);

	const dispatch = useDispatch<DispatchType>();

	const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginCredits) => {
		if (!resetPasswordMode)
			dispatch(loginUser(data))
				.then((data) => {
					if (!data.payload.success) throw data.payload;
				})
				.catch((error) => {
					console.log(error);
				});
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} {...props}>
				<label className={cn(styles['input-wrapper'])}>
					<span>Ваша электронная почта:</span>
					<input {...register('email')} type="email"/>
				</label>
				<label className={cn(styles['input-wrapper'], {
					[styles['input-wrapper__hide']]: resetPasswordMode
				})}>
					<span>Пароль учётной записи:</span>
					<input {...register('password')} type="password"/>
				</label>
				<input type="submit" value={resetPasswordMode ? 'Запросить сброс пароля' : 'Авторизация'}/>
			</form>
			<button onClick={() => setResetPasswordMode(state => !state)}>
				{
					resetPasswordMode ? 'Вспомнили пароль самостоятельно?' : 'Забыли пароль? Восстановим!'
				}
			</button>
		</>
	);
}

export default LoginForm;