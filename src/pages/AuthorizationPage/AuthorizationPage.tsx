import cn from 'classnames';
import styles from './AuthorizationPage.module.css';
import {useState} from 'react';

import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.tsx';



function AuthorizationPage() {
	const [hide, setHide] = useState<'login' | 'register'>('register');

	return (
		<div className={cn(styles['authorization-wrapper'])}>
			<section className={cn(styles['login-section'])}>
				<h1 className={cn(styles.title)}>
					Авторизация
				</h1>

				<LoginForm/>

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

				<RegisterForm/>

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