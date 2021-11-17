import React from 'react'
import Card from '../components/Card'
import axios from 'axios';

function Orders() {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://60ee9562eb4c0a0017bf44f1.mockapi.io/orders');
				setOrders(data.map((obj) => obj.products).flat());
			} catch (error) {
				alert('Не удалось загрузить мои покупки');
			}
			setIsLoading(false);
		})();
	}, []);

	return (
		<div className="content">

			<div className="section-head">
				<h1>Мои покупки</h1>
			</div>

			<div className="cards">

				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
						<Card
							key={index}
							loading={isLoading}
							{...item}
						/>
					))
				}

			</div>

		</div>
	);
}

export default Orders