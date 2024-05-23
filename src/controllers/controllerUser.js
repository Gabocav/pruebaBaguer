const user = require('../models/users');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await user.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

const getUsuario = async (req, res) => {
    try {
        const usuario = await user.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.render('show', {
            nombre: usuario.name.first,
            apellido: usuario.name.last,
            genero: usuario.gender,
            fotoPerfil: usuario.picture.large,
            celular: usuario.cell,
            telefono: usuario.phone,
            email: usuario.email,
            direccion: usuario.location.street.name + ', ' + usuario.location.street.number,
            pais: usuario.location.country,
            estado: usuario.location.state,
            ciudad: usuario.location.city
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
};

const createUser = async (req, res) => {
    try {
        const usuario = await user.create(req.body);
        res.json(usuario);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
}

const updateUser = async (req, res) => {
    try {
        const usuario = await user.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'User not found' });
        }
        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const usuario = await user.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'User not found' });
        }
        await usuario.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = {
    getUsuarios,
    getUsuario,
    createUser,
    updateUser,
    deleteUser
};
