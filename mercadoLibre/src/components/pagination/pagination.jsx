const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange, loading = false }) => {
	// Calcular el rango de páginas a mostrar (máximo 5 páginas)
	const getPageRange = () => {
		const delta = 2; // Páginas a mostrar antes y después de la actual
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const handleNext = () => {
		if (currentPage < totalPages && !loading) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page) => {
		if (page !== currentPage && !loading && typeof page === 'number') {
			onPageChange(page);
		}
	};

	if (totalPages <= 1) {
		return null;
	}

	return (
		<footer className='pagination'>
			<ul className='pagination__list'>
				{/* Números de página */}
				{getPageRange().map((page, index) => (
					<li key={index}>
						{page === '...' ? (
							<span className='pagination__dots'>...</span>
						) : (
							<button
								className={`pagination__item ${
									currentPage === page ? 'pagination__item--active' : ''
								}`}
								onClick={() => handlePageClick(page)}
								disabled={currentPage === page || loading}
							>
								{page}
							</button>
						)}
					</li>
				))}

				{/* Botón Siguiente */}
				<li>
					<button
						className='pagination__next'
						onClick={handleNext}
						disabled={currentPage === totalPages || loading}
					>
						Siguiente &gt;
					</button>
				</li>
			</ul>
		</footer>
	);
};

export default Pagination;
