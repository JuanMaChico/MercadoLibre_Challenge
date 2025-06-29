const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const fs = require('fs').promises;
const path = require('path');

app.use(cors());

// Función para buscar en los archivos JSON de Mocks
const searchInMocks = async (searchTerm) => {
	try {
		const mocksPath = path.join(__dirname, '..', 'Mocks');
		const categories = await fs.readdir(mocksPath);
		const results = [];

		for (const category of categories) {
			const categoryPath = path.join(mocksPath, category);
			const categoryStats = await fs.stat(categoryPath);

			if (categoryStats.isDirectory()) {
				const files = await fs.readdir(categoryPath);

				// Buscar archivos de búsqueda (search-*.json)
				const searchFiles = files.filter(
					(file) => file.startsWith('search-') && file.endsWith('.json'),
				);

				for (const searchFile of searchFiles) {
					const filePath = path.join(categoryPath, searchFile);
					const fileContent = await fs.readFile(filePath, 'utf8');
					const searchData = JSON.parse(fileContent);

					if (searchData.results && Array.isArray(searchData.results)) {
						// Filtrar resultados que coincidan con el término de búsqueda
						const filteredResults = searchData.results.filter((item) => {
							const title = item.title ? item.title.toLowerCase() : '';
							const searchLower = searchTerm.toLowerCase();
							return title.includes(searchLower);
						});

						results.push(...filteredResults);
					}
				}
			}
		}

		return results;
	} catch (error) {
		console.error('Error buscando en Mocks:', error);
		throw error;
	}
};

// Endpoint para buscar productos en los archivos JSON de Mocks
app.get('/api/search/:query', async (req, res) => {
	try {
		const { query } = req.params;
		const offset = parseInt(req.query.offset) || 0;
		const limit = parseInt(req.query.limit) || 50;

		if (!query || query.trim() === '') {
			return res.status(400).json({
				error: 'El parámetro de búsqueda es requerido',
			});
		}

		const allResults = await searchInMocks(query);

		// Aplicar paginación
		const startIndex = offset;
		const endIndex = startIndex + limit;
		const paginatedResults = allResults.slice(startIndex, endIndex);

		// Transformar los resultados al formato que espera el frontend
		const transformedResults = paginatedResults.map((item) => ({
			id: item.id,
			title: item.title,
			thumbnail: item.thumbnail,
			price: item.price,
			original_price: item.original_price,
			seller: {
				nickname: item.seller?.nickname || null,
			},
			official_store_name: item.official_store_name || null,
			shipping: {
				free_shipping: item.shipping?.free_shipping || false,
			},
		}));

		res.json({
			query: query,
			results: transformedResults,
			total: allResults.length,
			paging: {
				total: allResults.length,
				offset: offset,
				limit: limit,
				primary_results: allResults.length,
			},
		});
	} catch (error) {
		console.error('Error en endpoint de búsqueda:', error);
		res.status(500).json({
			error: 'Error interno del servidor',
			details: error.message,
		});
	}
});

// Endpoint para obtener un item específico por ID
app.get('/api/item/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				error: 'El ID del item es requerido',
			});
		}

		const mocksPath = path.join(__dirname, '..', 'Mocks');
		const categories = await fs.readdir(mocksPath);
		let itemData = null;

		for (const category of categories) {
			const categoryPath = path.join(mocksPath, category);
			const categoryStats = await fs.stat(categoryPath);

			if (categoryStats.isDirectory()) {
				const files = await fs.readdir(categoryPath);

				// Buscar archivo específico del item
				const itemFile = files.find((file) => file === `item-${id}.json`);

				if (itemFile) {
					const filePath = path.join(categoryPath, itemFile);
					const fileContent = await fs.readFile(filePath, 'utf8');
					itemData = JSON.parse(fileContent);
					break;
				}
			}
		}

		if (!itemData) {
			return res.status(404).json({
				error: 'Item no encontrado',
			});
		}

		res.json(itemData);
	} catch (error) {
		console.error('Error obteniendo item:', error);
		res.status(500).json({
			error: 'Error interno del servidor',
			details: error.message,
		});
	}
});

// Endpoint para obtener la descripción de un item
app.get('/api/item/:id/description', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				error: 'El ID del item es requerido',
			});
		}

		const mocksPath = path.join(__dirname, '..', 'Mocks');
		const categories = await fs.readdir(mocksPath);
		let descriptionData = null;

		for (const category of categories) {
			const categoryPath = path.join(mocksPath, category);
			const categoryStats = await fs.stat(categoryPath);

			if (categoryStats.isDirectory()) {
				const files = await fs.readdir(categoryPath);

				// Buscar archivo de descripción del item
				const descriptionFile = files.find(
					(file) => file === `item-${id}-description.json`,
				);

				if (descriptionFile) {
					const filePath = path.join(categoryPath, descriptionFile);
					const fileContent = await fs.readFile(filePath, 'utf8');
					descriptionData = JSON.parse(fileContent);
					break;
				}
			}
		}

		if (!descriptionData) {
			return res.status(404).json({
				error: 'Descripción no encontrada',
			});
		}

		res.json(descriptionData);
	} catch (error) {
		console.error('Error obteniendo descripción:', error);
		res.status(500).json({
			error: 'Error interno del servidor',
			details: error.message,
		});
	}
});

// Endpoint para obtener la categoría de un item
app.get('/api/item/:id/category', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				error: 'El ID del item es requerido',
			});
		}

		const mocksPath = path.join(__dirname, '..', 'Mocks');
		const categories = await fs.readdir(mocksPath);
		let categoryData = null;

		for (const category of categories) {
			const categoryPath = path.join(mocksPath, category);
			const categoryStats = await fs.stat(categoryPath);

			if (categoryStats.isDirectory()) {
				const files = await fs.readdir(categoryPath);

				// Buscar archivo de categoría del item
				const categoryFile = files.find((file) => file === `item-${id}-category.json`);

				if (categoryFile) {
					const filePath = path.join(categoryPath, categoryFile);
					const fileContent = await fs.readFile(filePath, 'utf8');
					categoryData = JSON.parse(fileContent);
					break;
				}
			}
		}

		if (!categoryData) {
			return res.status(404).json({
				error: 'Categoría no encontrada',
			});
		}

		res.json(categoryData);
	} catch (error) {
		console.error('Error obteniendo categoría:', error);
		res.status(500).json({
			error: 'Error interno del servidor',
			details: error.message,
		});
	}
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
