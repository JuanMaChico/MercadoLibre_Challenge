const Pagination = () => {
	return (
		<footer className='pagination'>
			<ul className='pagination__list'>
				{Array.from({ length: 10 }, (_, i) => (
					<li key={i + 1}>
						<button
							className={`pagination__item ${
								i === 0 ? 'pagination__item--active' : ''
							}`}
						>
							{i + 1}
						</button>
					</li>
				))}
				<li>
					<button className='pagination__next'>Siguiente &gt;</button>
				</li>
			</ul>
		</footer>
	);
};

export default Pagination;
