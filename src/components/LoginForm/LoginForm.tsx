import cn from 'classnames';
import styles from './LoginForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {LoginCredits} from '../../store/user/user.types.ts';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../../store/store.ts';
import {LoginFormProps} from './LoginForm.props.ts';
import {loginUser, requestResetPassword} from '../../store/user/user.slice.ts';
import {useState} from 'react';

interface LoginFormInputs extends ResetPasswordFormInputs{
	password: string;
}

interface ResetPasswordFormInputs {
	email: string;
}

function LoginForm(props: LoginFormProps) {
	const {register: registerLoginForm, handleSubmit: handleSubmitLoginForm} = useForm<LoginFormInputs>();
	const {register: registerResetPasswordForm, handleSubmit: handleSubmitResetPasswordForm} = useForm<ResetPasswordFormInputs>();
	const [resetPasswordMode, setResetPasswordMode] = useState(false);

	const dispatch = useDispatch<DispatchType>();

	const onLoginFormSubmit: SubmitHandler<LoginFormInputs> = (data: LoginCredits) => {
		dispatch(loginUser(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onResetPasswordsFormSubmit: SubmitHandler<ResetPasswordFormInputs> = (data: ResetPasswordFormInputs) => {
		dispatch(requestResetPassword(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<form
				onSubmit={handleSubmitLoginForm(onLoginFormSubmit)}
				{...props}
				className={cn(styles['login-form'], {
					[styles['login-form__hide']]: resetPasswordMode
				})}
				onTransitionEnd={(e) => {
					const form = e.target as HTMLFormElement;
					if (resetPasswordMode)	form.style.maxHeight = '0px';
				}}
				style={{
					maxHeight: resetPasswordMode ? '0px' : ''
				}}
			>
				<label className={cn(styles['input-wrapper'])}>
					<span>Ваша электронная почта:</span>
					<input {...registerLoginForm('email')} type="email"/>
				</label>
				<label className={cn(styles['input-wrapper'])}>
					<span>Пароль учётной записи:</span>
					<input {...registerLoginForm('password')} type="password"/>
				</label>
				<input type="submit" value='Авторизация'/>
			</form>
			<form
				onSubmit={handleSubmitResetPasswordForm(onResetPasswordsFormSubmit)}
				{...props}
				className={cn(styles['login-form'], {
					[styles['login-form__hide']]: !resetPasswordMode
				})}
				onTransitionEnd={(e) => {
					const form = e.target as HTMLFormElement;
					if (!resetPasswordMode)	form.style.maxHeight = '0px';
				}}
				style={{
					maxHeight: !resetPasswordMode ? '0px' : ''
				}}
			>
				<label className={cn(styles['input-wrapper'])}>
					<span>Ваша электронная почта:</span>
					<input {...registerResetPasswordForm('email')} type="email"/>
				</label>
				<input type="submit" value='Выслать запрос на восстановление'/>
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