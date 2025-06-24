import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../card/card';
import Pagination from '../pagination/pagination';
import zapatillasData from '../../../Mocks/zapatilhas/search-MLA-zapatillas.json';

const Container = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	console.log('searchParams', searchParams.get('search'));

	console.log(zapatillasData.results);

	const handleCardClick = (id) => {
		navigate(`/items/${id}`);
	};

	return (
		<>
			<div className='container'>
				{zapatillasData.results.map((item) => (
					<Card key={item.id} item={item} onClick={() => handleCardClick(item.id)} />
				))}
			</div>
			<Pagination />
		</>
	);
};

export default Container;
