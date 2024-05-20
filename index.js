const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors'); 

app.use(cors({
    origin: 'https://edspert-nu.vercel.app'
  }));
app.use(express.json());

app.get('/api/products', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'product.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'error getting products' });
            return;
        }
        const products = JSON.parse(data);
        res.status(200).json({ message: 'success', products });
    });
});

app.get('/api/products/:id', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'product.json');
    const productId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'error getting product' });
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);

        if (!product) {
            res.status(404).json({ message: 'product not found' });
            return;
        }
        res.status(200).json({ message: 'success', product });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
