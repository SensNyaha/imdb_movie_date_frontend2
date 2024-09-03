import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';

function RegistrationConfirmPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const [status, setStatus] = useState('');

	useEffect(() => {
		const confirmRegisterFunc = async () => {
			if (params.get('link')) {
				try {
					const response = await axios.get(params.get('link') as string);
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
        
		confirmRegisterFunc()
			.then(data => {
				if (data.message) setStatus(data.message);
				else setStatus('Some error!');
				setTimeout(() => navigate('/'), 3000);
			});
	}, []);

	return (
		<div>{status}</div>
	);
}

export default RegistrationConfirmPage;