import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Detail = () => {
	const { id } = useParams(); // Obtener el ID de la URL
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [description, setDescription] = useState(null);
	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Efecto para cargar los datos cuando cambie el ID
	useEffect(() => {
		// Función para obtener los datos del producto
		const fetchProductData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Hacer las peticiones en paralelo
				const [productResponse, descriptionResponse, categoryResponse] =
					await Promise.allSettled([
						fetch(`http://localhost:3001/api/item/${id}`),
						fetch(`http://localhost:3001/api/item/${id}/description`),
						fetch(`http://localhost:3001/api/item/${id}/category`),
					]);

				// Procesar respuesta del producto
				if (productResponse.status === 'fulfilled' && productResponse.value.ok) {
					const productData = await productResponse.value.json();
					setProduct(productData);
				} else {
					// Mostrar un mensaje de error
					throw new Error('No se pudo obtener la información del producto');
				}

				// Procesar respuesta de la descripción
				if (
					descriptionResponse.status === 'fulfilled' &&
					descriptionResponse.value.ok
				) {
					const descriptionData = await descriptionResponse.value.json();
					setDescription(descriptionData);
				}

				// Procesar respuesta de la categoría
				if (categoryResponse.status === 'fulfilled' && categoryResponse.value.ok) {
					const categoryData = await categoryResponse.value.json();
					setCategory(categoryData);
				}
			} catch (error) {
				console.error('Error obteniendo datos del producto:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProductData();
		}
	}, [id]);

	// Función para navegar de vuelta al listado
	const handleBackToList = () => {
		// Obtener la búsqueda anterior del localStorage
		const lastSearch = localStorage.getItem('lastSearch') || '';
		const lastSearchPath = lastSearch
			? `/items?search=${encodeURIComponent(lastSearch)}`
			: '/items';
		navigate(lastSearchPath);
	};

	// Mostrar loading
	if (loading) {
		return (
			<div className='product-detail container'>
				<div className='product-detail__loading'>
					<p>Cargando producto...</p>
				</div>
			</div>
		);
	}

	// Mostrar error
	if (error) {
		return (
			<div className='product-detail container'>
				<div className='product-detail__error'>
					<p>Error: {error}</p>
					<button onClick={handleBackToList}>Volver al listado</button>
				</div>
			</div>
		);
	}

	// Mostrar mensaje si no hay producto
	if (!product) {
		return (
			<div className='product-detail container'>
				<div className='product-detail__not-found'>
					<p>Producto no encontrado</p>
					<button onClick={handleBackToList}>Volver al listado</button>
				</div>
			</div>
		);
	}

	// Calcular cuotas (ejemplo: 9 cuotas sin interés)
	const installmentAmount = product.price ? Math.round(product.price / 9) : 0;

	// Obtener la primera imagen como imagen principal
	const mainImage =
		product.pictures && product.pictures.length > 0
			? product.pictures[0].secure_url || product.pictures[0].url
			: product.thumbnail;

	// Obtener todas las imágenes para la galería
	const thumbnails =
		product.pictures && product.pictures.length > 0
			? product.pictures.map((pic) => pic.secure_url || pic.url)
			: [product.thumbnail];

	return (
		<div className='product-detail container'>
			{/* Navegación superior */}
			<div className='product-detail__breadcrumb'>
				<div className='product-detail__breadcrumb-navigation'>
					<button
						onClick={handleBackToList}
						className='product-detail__breadcrumb-back'
					>
						Volver al listado
					</button>
					<span>|</span>
					{category &&
						category.path_from_root &&
						category.path_from_root.map((cat, index) => (
							<span key={cat.id}>
								{cat.name}
								{index < category.path_from_root.length - 1 && ' > '}
							</span>
						))}
				</div>
				<div>
					<span className='product-detail__breadcrumb-id'>
						Publicación:{' '}
						<span className='product-detail__breadcrumb-id-value'>
							# {product.id}
						</span>
					</span>
				</div>
			</div>

			<div className='product-detail__main'>
				{/* Galería de imágenes */}
				<aside className='product-detail__gallery'>
					{thumbnails.map((img, i) => (
						<img
							key={i}
							className='product-detail__thumbnail'
							src={img}
							alt={`Vista ${i + 1}`}
						/>
					))}
				</aside>

				{/* Imagen principal */}
				<div className='product-detail__image'>
					<img src={mainImage} alt={product.title} />
				</div>

				{/* Información del producto */}
				<div className='product-detail__info'>
					<p className='product-detail__info-status'>
						{product.condition === 'new' ? 'Nuevo' : 'Usado'} |
						{product.initial_quantity
							? ` ${product.initial_quantity} disponibles`
							: ''}
					</p>

					<h1 className='product-detail__title'>{product.title}</h1>

					<p className='product-detail__seller'>
						Por{' '}
						{product.official_store_name || product.seller?.nickname || 'Vendedor'}
					</p>

					<div className='product-detail__price'>
						{product.original_price && product.original_price > product.price && (
							<p className='product-detail__price-original'>
								${product.original_price}
							</p>
						)}
						<p className='product-detail__price-value'>${product.price}</p>

						{product.price && (
							<p className='product-detail__price-installments'>
								Mismo precio en 9 cuotas de ${installmentAmount}
							</p>
						)}
					</div>

					{product.shipping?.free_shipping && (
						<p className='product-detail__shipping'>Envío gratis</p>
					)}

					{/* Mostrar atributos relevantes */}
					{product.attributes && (
						<div className='product-detail__attributes'>
							{product.attributes
								.filter((attr) =>
									['COLOR', 'BRAND', 'MODEL'].includes(attr.id),
								)
								.map((attr) => (
									<p key={attr.id} className='product-detail__attribute'>
										{attr.name}: <strong>{attr.value_name}</strong>
									</p>
								))}
						</div>
					)}
				</div>
			</div>

			{/* Descripción */}
			{description && (
				<section className='product-detail__description'>
					<div className='product-detail__description-separator' />
					<div className='product-detail__description-content'>
						<h2 className='product-detail__description-title'>Descripción</h2>
						<p className='product-detail__description-text'>
							{description.plain_text ||
								description.text ||
								'Sin descripción disponible'}
						</p>
					</div>
				</section>
			)}
		</div>
	);
};

export default Detail;
