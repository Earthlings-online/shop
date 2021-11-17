import React from 'react'
import Card from '../components/Card'
import Info from '../components/Info'
import AppContext from '../context'

function Favorites() {
	const { favorites, onAddToFavorite, onAddToCart } = React.useContext(AppContext);

	return (
		<div className="content">

			{favorites.length > 0 ? (
				<>
					<div className="section-head">
						<h1>Мои закладки</h1>
					</div>
					
					<div className="cards">
						{favorites.map((item) => (
								<Card
									key={item.id}
									onFavorite={(obj) => onAddToFavorite(obj)}
									onProduct={(obj) => onAddToCart(obj)}
									{...item}
								/>
							))
						}
					</div>
				</>
			) : (
				<Info 
					title="Закладок нет :("
					description="Вы ничего не добавили в закладки."
					image="/img/empty-favorites.png"
				/>
			)

			}

		</div>
	);
}

export default Favorites