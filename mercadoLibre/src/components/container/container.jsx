import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../card/card';
import Pagination from '../pagination/pagination';
import { useEffect, useState, useCallback } from 'react';

const Container = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	// Estados para paginación
	const [allResults, setAllResults] = useState([]); // Todos los resultados en caché
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [currentOffset, setCurrentOffset] = useState(0);
	const [hasMoreData, setHasMoreData] = useState(true);

	const ITEMS_PER_PAGE = 10;
	const API_LIMIT = 50;

	const handleCardClick = (id) => {
		navigate(`/item/${id}`);
	};

	// Función para obtener datos de la API
	const fetchData = useCallback(async (searchTerm, offset = 0) => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3001/api/search/${searchTerm}?offset=${offset}&limit=${API_LIMIT}`,
			);
			const result = await response.json();

			if (result.results && result.results.length > 0) {
				// Agregar nuevos resultados al caché
				setAllResults((prev) => {
					const newResults = [...prev];
					// Reemplazar o agregar resultados desde el offset
					result.results.forEach((item, index) => {
						newResults[offset + index] = item;
					});
					return newResults;
				});

				// Actualizar información de paginación
				setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
				setHasMoreData(result.results.length === API_LIMIT);
			} else {
				setHasMoreData(false);
			}
		} catch (error) {
			console.error('Error en la búsqueda:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	// Función para cambiar de página
	const handlePageChange = useCallback(
		(newPage) => {
			setCurrentPage(newPage);
			const newOffset = (newPage - 1) * ITEMS_PER_PAGE;
			setCurrentOffset(newOffset);

			// Verificar si necesitamos cargar más datos
			const maxCachedIndex = allResults.length - 1;
			const requiredIndex = newOffset + ITEMS_PER_PAGE - 1;

			if (requiredIndex > maxCachedIndex && hasMoreData) {
				// Calcular el offset para la API (múltiplos de 50)
				const apiOffset = Math.floor(requiredIndex / API_LIMIT) * API_LIMIT;
				const searchTerm = searchParams.get('search');
				if (searchTerm) {
					fetchData(searchTerm, apiOffset);
				}
			}
		},
		[allResults.length, hasMoreData, fetchData, searchParams],
	);

	// Efecto para manejar cambios en la búsqueda
	useEffect(() => {
		const searchTerm = searchParams.get('search');

		if (searchTerm) {
			// Guardar la búsqueda en localStorage
			localStorage.setItem('lastSearch', searchTerm);

			// Resetear estados para nueva búsqueda
			setAllResults([]);
			setCurrentPage(1);
			setCurrentOffset(0);
			setHasMoreData(true);

			// Cargar primera página
			fetchData(searchTerm, 0);
		} else {
			// Si no hay búsqueda, limpiar localStorage y estados
			localStorage.removeItem('lastSearch');
			setAllResults([]);
			setData([]);
			setCurrentPage(1);
			setTotalPages(0);
		}
	}, [searchParams, fetchData]);

	// Efecto para actualizar los datos mostrados cuando cambie la página
	useEffect(() => {
		const startIndex = currentOffset;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		const pageResults = allResults.slice(startIndex, endIndex);
		setData(pageResults);
	}, [allResults, currentOffset]);

	if (loading && allResults.length === 0) {
		return (
			<div className='container'>
				<div className='loading'>
					<p>Buscando productos...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='container'>
				{data && data.length > 0 ? (
					data.map((item) => (
						<Card
							key={item.id}
							item={item}
							onClick={() => handleCardClick(item.id)}
						/>
					))
				) : (
					<div className='no-results'>
						<p>No se encontraron productos</p>
					</div>
				)}
			</div>

			{/* Mostrar paginación solo si hay resultados */}
			{data && data.length > 0 && totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					loading={loading}
				/>
			)}
		</>
	);
};

export default Container;
