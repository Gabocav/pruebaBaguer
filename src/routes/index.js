import express from 'express';
import axios from 'axios';

const router = express.Router();

// Ruta para obtener usuarios aleatorios desde la API de RandomUser
router.get('/random-users', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10'); // Obtén 10 usuarios aleatorios
        const users = response.data.results;
        res.render('index', { users }); // Envía los usuarios a la plantilla Handlebars
    } catch (error) {
        console.error('Error fetching random users:', error);
        res.status(500).json({ error: 'Error fetching random users' });
    }
});

// Ruta para mostrar los detalles de un usuario
router.get('/show/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=1&seed=${req.params.id}`);
        const user = response.data.results[0];
        res.render('partials/show', { user });
    } catch (error) {
        console.error('Error fetching random user:', error);
        res.status(500).json({ error: 'Error fetching random user' });
    }
});

// Ruta para crear un usuario
router.post('/create', async (req, res) => {
    try {
        const response = await axios.post('https://randomuser.me/api/', req.body);
        const user = response.data.results[0];
        res.render('partials/show', { user });
    } catch (error) {
        console.error('Error creating random user:', error);
        res.status(500).json({ error: 'Error creating random user' });
    }
});

// Ruta para actualizar un usuario
router.put('/update/:id', async (req, res) => {
    try {
        const response = await axios.put(`https://randomuser.me/api/?seed=${req.params.id}`, req.body);
        const user = response.data.results[0];
        res.render('partials/show', { user });
    } catch (error) {
        console.error('Error updating random user:', error);
        res.status(500).json({ error: 'Error updating random user' });
    }
});

// Ruta para eliminar un usuario
router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await axios.delete(`https://randomuser.me/api/?seed=${req.params.id}`);
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting random user:', error);
        res.status(500).json({ error: 'Error deleting random user' });
    }
});


// Exportar el router
export default router;
