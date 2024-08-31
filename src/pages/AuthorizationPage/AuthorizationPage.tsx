import {SubmitHandler, useForm} from 'react-hook-form';
import cn from 'classnames';
import styles from './AuthorizationPage.module.css';
import {useState} from 'react';
import {LoginCredits, loginUser} from '../../store/user.slice.ts';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../../store/store.ts';
import {useNavigate} from 'react-router-dom';

interface LoginFormInputs {
	email: string;
	password: string;
}

function AuthorizationPage() {
	const {register, handleSubmit} = useForm<LoginFormInputs>();
	const dispatch = useDispatch<DispatchType>();
	const navigate = useNavigate();

	const [hide, setHide] = useState<'login' | 'register'>('register');

	const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginCredits) => {
		dispatch(loginUser(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
				alert(data.payload.data.accessToken);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className={cn(styles['authorization-wrapper'])}>
			<section className={cn(styles['login-section'])}>
				<h1 className={cn(styles.title)}>
					Авторизация
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label className={cn(styles['input-wrapper'])}>
						<span>Ваша электронная почта:</span>
						<input {...register('email')} type="email"/>
					</label>
					<label className={cn(styles['input-wrapper'])}>
						<span>Пароль учётной записи:</span>
						<input {...register('password')} type="password"/>
					</label>
					<input type="submit" value="Авторизация"/>
				</form>

				<div className={cn(styles['login-curtain'], {
					[styles['login-curtain__active']]: hide === 'register'
				})} onClick={() => {
					setHide('login');
				}}>
					Уже бывали у нас?
				</div>
			</section>
			<section className={cn(styles['register-section'])}>
				<h1 className={cn(styles.title)}>
					Регистрация
				</h1>
				<form >
					<label className={cn(styles['input-wrapper'])}>
						<span>Ваша электронная почта:</span>
						<input {...register('email')} type="email"/>
					</label>
					<label className={cn(styles['input-wrapper'])}>
						<span>Пароль учётной записи:</span>
						<input {...register('password')} type="password"/>
					</label>
					<input type="submit" value="Авторизация"/>
				</form>
				<div className={cn(styles['register-curtain'], {
					[styles['register-curtain__active']]: hide === 'login'
				})} onClick={() => {
					setHide('register');
				}}>
					Еще нет учётной записи?
				</div>
			</section>
		</div>
	);
}

export default AuthorizationPage;