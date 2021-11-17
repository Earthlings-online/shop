import React from 'react';
import Card from '../components/Card'

function Home({ 
	products,
	searchValue, 
	setSearchValue, 
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
	isLoading
}) {
	const renderProducts = () => {
		const filtredProducts = products.filter((item) => 
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(12)] : filtredProducts).map((item, index) => (
			<Card
				key={index}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onProduct={(obj) => onAddToCart(obj)}
				loading={isLoading}
				{...item}
			/>
		))
	};

	return (
		<div className="content">

			<div className="section-head">
				<h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
				<div className="search-block">
					<img src="/img/search.svg" alt="Поиск" />
					{searchValue && <img onClick={() => setSearchValue('')} className="search-block_clear" width={20} height={20} src="/img/btn-remove.svg" alt="Очистить поиск" />}
					<input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
				</div>
			</div>

			<div className="cards">{renderProducts()}</div>

		</div>
	);
}

export default Home