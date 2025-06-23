/**
 *
 * @returns {JSX.Element}
 */
const Header = () => {
	return (
		<header className='header'>
			<div className='header__container'>
				<img
					src='/logo_large_25years@2x.png'
					alt='Mercado Libre logo'
					className='header__logo'
				/>
				<div className='header__search-wrapper'>
					<input
						type='text'
						placeholder='Buscar productos, marcas y más…'
						className='header__search'
					/>
					<button className='header__search-button'>
						<img
							className='header__logo-search'
							src='/ic_Search@2x.png'
							alt='Buscar'
						/>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
