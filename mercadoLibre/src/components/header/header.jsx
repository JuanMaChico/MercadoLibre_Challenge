import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WelcomeMessage from '../welcomeMessage/welcomeMessage';
/**
 *	Header component
 * @returns {JSX.Element}
 */
const Header = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [search, setSearch] = useState('');
	const [showWelcome, setShowWelcome] = useState(false);

	const handleInputChange = (e) => setSearch(e.target.value);

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/items?search=${encodeURIComponent(search)}`);
		}
	};

	// Cargar la búsqueda anterior del localStorage o de la URL
	useEffect(() => {
		const urlSearch = searchParams.get('search');
		const lastSearch = localStorage.getItem('lastSearch');

		if (urlSearch) {
			setSearch(urlSearch);
		} else if (lastSearch) {
			setSearch(lastSearch);
		}
	}, [searchParams]);

	useEffect(() => {
		const hasVisited = localStorage.getItem('hasVisited');
		if (!hasVisited) {
			setShowWelcome(true);
			localStorage.setItem('hasVisited', 'true');
		}
	}, []);

	return (
		<header className='header'>
			<div className='header__container'>
				<img
					src='/logo_large_25years@2x.png'
					alt='Mercado Libre logo'
					className='header__logo'
					onClick={() => {
						setSearch('');
						navigate('/');
					}}
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
				<div style={{ position: 'relative' }}>
					{showWelcome && <WelcomeMessage onClose={() => setShowWelcome(false)} />}
				</div>
			</div>
		</header>
	);
};

export default Header;
