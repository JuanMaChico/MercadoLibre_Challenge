const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange }) => {
	return (
		<footer className='pagination'>
			<ul className='pagination__list'>
				{Array.from({ length: totalPages }, (_, i) => (
					<li key={i + 1}>
						<button
							className={`pagination__item ${
								currentPage === i + 1 ? 'pagination__item--active' : ''
							}`}
							onClick={() => onPageChange(i + 1)}
							disabled={currentPage === i + 1}
						>
							{i + 1}
						</button>
					</li>
				))}
				<li>
					<button
						className='pagination__next'
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Siguiente &gt;
					</button>
				</li>
			</ul>
		</footer>
	);
};

export default Pagination;
