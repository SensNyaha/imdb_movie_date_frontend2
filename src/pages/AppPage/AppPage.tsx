import {Link} from 'react-router-dom';

function AppPage() {
	return (
		<>
			<Link to="/me">Профиль</Link>
			<Link to="/app">Приложение</Link>
		    <div>APPLICATION</div>
		</>
	);
}

export default AppPage;