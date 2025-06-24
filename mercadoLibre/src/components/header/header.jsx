import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @returns {JSX.Element}
 */
const Header = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const handleInputChange = (e) => setSearch(e.target.value);

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/items?search=${encodeURIComponent(search)}`);
		}
	};

	return (
		<header className='header'>
			<div className='header__container'>
				<img
					src='/logo_large_25years@2x.png'
					alt='Mercado Libre logo'
					className='header__logo'
				/>
				<form className='header__search-wrapper' onSubmit={handleSearch}>
					<input
						type='text'
						placeholder='Buscar productos, marcas y más…'
						className='header__search'
						value={search}
						onChange={handleInputChange}
					/>
					<button className='header__search-button' type='submit'>
						<img
							className='header__logo-search'
							src='/ic_Search@2x.png'
							alt='Buscar'
						/>
					</button>
				</form>
			</div>
		</header>
	);
};

export default Header;
