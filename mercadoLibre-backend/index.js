const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Ruta de ejemplo para servir un mock específico
app.get('/api/mocks/:categoria/:archivo', (req, res) => {
	const { categoria, archivo } = req.params;
	const filePath = path.join(__dirname, 'Mocks', categoria, archivo);

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			return res.status(404).json({ error: 'Archivo no encontrado' });
		}
		res.json(JSON.parse(data));
	});
});

app.get('/api/items', async (req, res) => {
	const query = req.query.q;
	if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });

	// Construir la ruta al archivo
	const filePath = path.join(__dirname, 'Mocks', query, `search-MLA-${query}.json`);

	// Leer el archivo
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) return res.status(404).json({ error: 'No se encontraron resultados' });
		const results = JSON.parse(data);
		res.json(results);
	});
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
