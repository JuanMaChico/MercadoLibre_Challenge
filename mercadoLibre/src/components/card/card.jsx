const Card = () => {
	return (
		<div className='card'>
			<div className='card__image-wrapper'>
				<img
					className='card__image'
					src='http://http2.mlstatic.com/D_728476-MLU78878973712_092024-I.jpg'
					alt='Apple iPhone 13 (128 GB) - Blanco estelar'
				/>
			</div>

			<div className='card__info'>
				<h2 className='card__title'>Apple iPhone 13 (128 GB) - Blanco estelar</h2>
				<p className='card__seller'>Por OCEANGREEN ARGENTINA</p>

				<div className='card__price-section'>
					<span className='card__price-off'>$ 362.836</span>
					<div className='card__price-wrapper'>
						<span className='card__price'>$ 1.362.836</span>
						<span className='card__discount'>6% OFF</span>
					</div>
					<span className='card__installments'>
						Mismo precio en 9 cuotas de $ 151.426
					</span>
				</div>

				<p className='card__shipping'>Envío gratis</p>
			</div>
		</div>
	);
};

export default Card;
