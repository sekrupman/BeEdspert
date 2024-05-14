const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'product.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'error get product' });
            return;
        }
        const products = JSON.parse(data);
        res.status(200).json({ message: 'success', product: products });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
