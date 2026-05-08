const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// URL de la API Django
const DJANGO_API_URL = 'http://localhost:8000/api/videojuegos/';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para servir HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy de API - Obtener todos los videojuegos
app.get('/api/videojuegos', async (req, res) => {
  try {
    const response = await axios.get(DJANGO_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener videojuegos:', error.message);
    res.status(500).json({ error: 'Error al obtener los videojuegos' });
  }
});

// Proxy de API - Obtener un videojuego por ID
app.get('/api/videojuegos/:id', async (req, res) => {
  try {
    const response = await axios.get(`${DJANGO_API_URL}${req.params.id}/`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener videojuego:', error.message);
    res.status(500).json({ error: 'Error al obtener el videojuego' });
  }
});

// Proxy de API - Crear un videojuego
app.post('/api/videojuegos', async (req, res) => {
  try {
    const response = await axios.post(DJANGO_API_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al crear videojuego:', error.message);
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
});

// Proxy de API - Actualizar un videojuego
app.put('/api/videojuegos/:id', async (req, res) => {
  try {
    const response = await axios.put(`${DJANGO_API_URL}${req.params.id}/`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error al actualizar videojuego:', error.message);
    res.status(500).json({ error: 'Error al actualizar el videojuego' });
  }
});

// Proxy de API - Eliminar un videojuego
app.delete('/api/videojuegos/:id', async (req, res) => {
  try {
    await axios.delete(`${DJANGO_API_URL}${req.params.id}/`);
    res.json({ mensaje: 'Videojuego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar videojuego:', error.message);
    res.status(500).json({ error: 'Error al eliminar el videojuego' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Frontend ejecutándose en http://localhost:${PORT}`);
});
