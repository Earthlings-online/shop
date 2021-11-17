import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import AppContext from './context'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
	const [products, setProducts] = React.useState([]);
	const [cartProducts, setCartProducts] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, productsResponse] = await Promise.all([
					axios.get('https://60ee9562eb4c0a0017bf44f1.mockapi.io/cart'),
					axios.get('https://60ee9562eb4c0a0017bf44f1.mockapi.io/favorites'),
					axios.get('https://60ee9562eb4c0a0017bf44f1.mockapi.io/products')
				]);

				setIsLoading(false);
				setCartProducts(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setProducts(productsResponse.data);
			} catch (error) {
				alert('Ошибка при запросе данных');
			}
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try	{
			const findProduct = cartProducts.find((prodObj) => prodObj.parentId === obj.id);
			if (findProduct) {
				setCartProducts((prev) => prev.filter((item) => item.parentId !== obj.id));
				await axios.delete(`https://60ee9562eb4c0a0017bf44f1.mockapi.io/cart/${findProduct.id}`);
			} else {
				setCartProducts((prev) => [...prev, obj]);
				const {data} = await axios.post('https://60ee9562eb4c0a0017bf44f1.mockapi.io/cart', obj);
				setCartProducts((prev) => prev.map(item => {
					if (item.parentId === data.parentId ) {
						return {...item, id: data.id}
					}
					return item;
				}));
			}
			
		} catch (error) {
			alert('Не удалось добавить в корзину');
		}
	};

	const onRemoveProduct = (id) => {
		axios.delete(`https://60ee9562eb4c0a0017bf44f1.mockapi.io/cart/${id}`);
		setCartProducts((prev) => prev.filter((item) => item.id !== id));
	}

	const onAddToFavorite = async (obj) => {
		try {
			const findFavorites = favorites.find((favObj) => favObj.parentId === obj.id)
			if (findFavorites) {
				setFavorites(prev => prev.filter((item) => item.parentId !== obj.id));
				axios.delete(`https://60ee9562eb4c0a0017bf44f1.mockapi.io/favorites/${findFavorites.id}`);
			} else {
				await axios.post('https://60ee9562eb4c0a0017bf44f1.mockapi.io/favorites', obj);
				setFavorites((prev) => [...prev, obj]);
			}
		} catch (error) {
			alert('Не удалось добавить в мои закладки');
		}
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isProductAdded = (id) => {
		return cartProducts.some((obj) => obj.parentId === id);
	}

	const isFavoriteAdded = (id) => {
		return favorites.some((obj) => obj.parentId === id);
	}

  return (
		<AppContext.Provider value={{ 
			products, 
			cartProducts, 
			favorites, 
			isProductAdded,
			isFavoriteAdded,
			onAddToFavorite, 
			onAddToCart, 
			setCartOpened,
			setCartProducts
		}}>
			<div className="wrapper">

				<Drawer products={cartProducts} onClose={() => setCartOpened(false)} onRemove={onRemoveProduct} opened={cartOpened}/>

				<Header onClickCart={() => setCartOpened(true)} />

				<Route path="/" exact>
					<Home 
						products={products} 
						cartProducts={cartProducts}
						searchValue={searchValue} 
						setSearchValue={setSearchValue} 
						onChangeSearchInput={onChangeSearchInput}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>
				</Route>

				<Route path="/favorites" exact>
					<Favorites />
				</Route>

				<Route path="/orders" exact>
					<Orders />
				</Route>

			</div>
		</AppContext.Provider>
	)
}

export default App
