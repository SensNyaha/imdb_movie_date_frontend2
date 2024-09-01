import cn from 'classnames';
import styles from './LoginForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {LoginCredits} from '../../store/user/user.types.ts';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../../store/store.ts';
import {LoginFormProps} from './LoginForm.props.ts';
import {loginUser} from '../../store/user/user.slice.ts';

interface LoginFormInputs {
	email: string;
	password: string;
}

function LoginForm(props: LoginFormProps) {
	const {register, handleSubmit} = useForm<LoginFormInputs>();

	const dispatch = useDispatch<DispatchType>();

	const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginCredits) => {
		dispatch(loginUser(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
				alert(data.payload.data.accessToken);
			})
			.catch((error) => {
				console.log(error);
				alert(error.message || error);
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
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
	);
}

export default LoginForm;