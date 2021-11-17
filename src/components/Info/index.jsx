import React from 'react'
import AppContext from '../../context';
import styles from './Info.module.sass'

const Info = ({ image, title, description }) => {
	const {setCartOpened} = React.useContext(AppContext);

	return (
		<div className={styles.empty}>
			<img src={image} alt={title} />
			<h2>{title}</h2>
			<p>{description}</p>
			<button onClick={() => setCartOpened(false)} className="btn">
				<img src="/img/btn-arrow.svg" alt="Стрелка назад" />
				Вернуться назад
			</button>
		</div>
	)
}

export default Info;