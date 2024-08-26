const express = require('express');
const app = express();
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];
// Obtener lista de productos
app.get('/productos', (req, res) => {
    res.json(productos);
});
// Agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});
// Actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});
// Eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (productoIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });

    productos.splice(productoIndex, 1);
    res.status(204).send();
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
