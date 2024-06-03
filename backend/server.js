
const express = require('express');
const cors = require('cors');
const { Product, initializeDatabase } = require('./models');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
});
