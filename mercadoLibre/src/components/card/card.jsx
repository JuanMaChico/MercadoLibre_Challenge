const Card = ({ item, onClick }) => {
	return (
		<div className='card' onClick={onClick}>
			<div className='card__image-wrapper'>
				<img className='card__image' src={item.thumbnail} alt={item.title} />
			</div>

			<div className='card__info'>
				<h2 className='card__title'>{item.title}</h2>
				<p className='card__seller'>
					{item.seller?.nickname || item.official_store_name || 'Vendedor'}
				</p>

				<div className='card__price-section'>
					{item.original_price && (
						<span className='card__price-off'>${item.original_price}</span>
					)}
					<div className='card__price-wrapper'>
						<span className='card__price'>${item.price}</span>
						{item.original_price && (
							<span className='card__discount'>
								{Math.round(100 - (item.price / item.original_price) * 100)}%
								OFF
							</span>
						)}
					</div>
					{/* Si tienes info de cuotas, puedes mostrarla aquí */}
				</div>

				{item.shipping?.free_shipping && (
					<p className='card__shipping'>Envío gratis</p>
				)}
			</div>
		</div>
	);
};

export default Card;
