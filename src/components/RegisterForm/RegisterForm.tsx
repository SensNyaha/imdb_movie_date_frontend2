import cn from 'classnames';
import styles from './RegisterForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../../store/store.ts';
import {RegisterFormProps} from './RegisterForm.props.ts';
import {RegisterCredits} from '../../store/user/user.types.ts';
import {registerUser} from '../../store/user/user.slice.ts';

interface RegisterFormInputs {
	username: string;
	email: string;
	password: string;
}

function RegisterForm(props: RegisterFormProps) {
	const {register, handleSubmit} = useForm<RegisterFormInputs>();

	const dispatch = useDispatch<DispatchType>();

	const onSubmit: SubmitHandler<RegisterFormInputs> = (data: RegisterCredits) => {
		dispatch(registerUser(data))
			.then((data) => {
				if (!data.payload.success) throw data.payload;
			})
			.catch(() => {
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<label className={cn(styles['input-wrapper'])}>
				<span>Имя для вашей учётной записи:</span>
				<input {...register('username')} type="text"/>
			</label>
			<label className={cn(styles['input-wrapper'])}>
				<span>Ваша электронная почта:</span>
				<input {...register('email')} type="email"/>
			</label>
			<label className={cn(styles['input-wrapper'])}>
				<span>Пароль учётной записи:</span>
				<input {...register('password')} type="password"/>
			</label>
			<input type="submit" value="Создать учётную запись"/>
		</form>
	);
}

export default RegisterForm;