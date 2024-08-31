import styles from './Base.module.css';
import cn from 'classnames';
import {Outlet} from 'react-router-dom';

function Base() {
	return (
		<div className={cn(styles['base-layout'])}>
			<Outlet/>
		</div>
	);
}

export default Base;