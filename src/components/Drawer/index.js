import React from 'react'
import axios from 'axios'
import Info from '../Info'
import styles from './Drawer.module.sass'
import { useCart } from '../../hooks/useCart'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, products = [], opened }) {
	const {cartProducts, setCartProducts, totalPrice} = useCart();
	const [orderId, setOrderId] = React.useState(null);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.post('https://60ee9562eb4c0a0017bf44f1.mockapi.io/orders', {
				products: cartProducts
			});
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartProducts([]);

			for (let i = 0; i < cartProducts.length; i++) {
        const item = cartProducts[i];
        await axios.delete('https://60ee9562eb4c0a0017bf44f1.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		setIsLoading(false);
	};

	return (
		<div className={`${styles.overlay} ${opened ? styles.visible : ''}`}>
			<div className={styles.drawer}>

				<h2>Корзина <img onClick={onClose} src="/img/btn-remove.svg" alt="Закрыть корзину" /></h2>

				{products.length > 0 ? (
						<>
							<div className={styles.items}>
								{products.map((obj) => (
									<div className={styles.item} key={obj.id}>
										<img className={styles.img} width={70} height={70} src={obj.imgUrl} alt="" />
										<div className={styles.text}>
											<h3>{obj.name}</h3>
											<b>{obj.price} руб.</b>
										</div>
										<img onClick={() => onRemove(obj.id)} className={styles.remove} src="/img/btn-remove.svg" alt="Удалить товар" />
									</div>
								))}
							</div>
							<div className={styles.total}>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<b>{totalPrice} руб.</b>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
									</li>
								</ul>
								<button disabled={isLoading} onClick={onClickOrder} className="btn btn-order">Оформить заказ <img src="/img/btn-arrow.svg" alt="Стрелка" /></button>
							</div>
						</>
					) : (
						<Info 
							title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
							description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
							image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.png"}
						/>
				)}

			</div>
		</div>
	);
}

export default Drawer;