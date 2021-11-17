import React from 'react'
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import styles from './Card.module.sass'

function Card({ 
	id, 
	imgUrl, 
	name, 
	price, 
	onFavorite, 
	onProduct, 
	loading = false 
}) {
	const { isProductAdded, isFavoriteAdded } = React.useContext(AppContext);
	const obj = { id, parentId: id, name, imgUrl, price };

	const onClickPlus = () => {
		onProduct(obj);
	}

	const onClickFavorite = () => {
		onFavorite(obj);
	}

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader 
					speed={2}
					width={155}
					height={187}
					viewBox="0 0 155 187"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="155" height="90" /> 
					<rect x="0" y="106" rx="3" ry="3" width="155" height="15" /> 
					<rect x="0" y="125" rx="3" ry="3" width="93" height="15" /> 
					<rect x="0" y="162" rx="8" ry="8" width="80" height="24" /> 
					<rect x="123" y="154" rx="8" ry="8" width="32" height="32" />
				</ContentLoader>
				) : (
					<>
						{onFavorite &&(
							<div className={styles.favorite} onClick={onClickFavorite}>
								<img src={isFavoriteAdded(id) ? "/img/heart-active.svg" : "/img/heart.png"} alt="" />
							</div>
						)}
						<img width={133} height={112} src={imgUrl} alt="Nike Blazer Mid Suede" />
						<h3>{name}</h3>
						<div className={styles.bottom}>
							<div>
								<span>Цена: </span>
								<b>{price} руб.</b>
							</div>
							{onProduct && (
								<img 
									className={styles.plus} 
									onClick={onClickPlus} 
									width={32} 
									height={32} 
									src={isProductAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Добавить товар" 
								/>
							)}
						</div>
					</>
			)}
		</div>
	);
}

export default Card;