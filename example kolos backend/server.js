const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Połączenie z bazą danych MongoDB
const uri = 'mongodb://localhost:27017/kolosExample';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();

const productsCollection = client.db().collection('products');

// Endpoint do pobierania produktów z możliwością filtrowania i sortowania
app.get('/products', async (req, res) => {
    try {
        // Pobierz parametry zapytania
        const { filterBy, sortBy } = req.query;

        const query = {};

        if (filterBy) {
            query['nazwa'] = new RegExp(filterBy, 'i');
        }

        const sortOption = sortBy || 'nazwa';
        const sortDirection = 1;

        const products = await productsCollection.find(query).sort({ [sortOption]: sortDirection }).toArray();

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(express.json()); // Dodaj middleware do parsowania JSON !!!


app.post('/products', async (req, res) => {
    try {
        const { nazwa, cena, opis, ilość, jednostka_miary } = req.body;

        const existingProduct = await productsCollection.findOne({ nazwa });

        if (existingProduct) {
            return res.status(400).json({ error: 'Nazwa produktu musi być unikalna' });
        }

        const newProduct = {
            nazwa,
            cena,
            opis,
            ilość,
            jednostka_miary,
        };

        const result = await productsCollection.insertOne(newProduct);

        res.status(201).json({ message: 'Produkt dodany pomyślnie', productId: result.insertedId });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { nazwa, cena, opis, ilość, jednostka_miary } = req.body;

        const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Produkt o podanym ID nie istnieje' });
        }

        const updatedProduct = {
            nazwa: nazwa || existingProduct.nazwa,
            cena: cena || existingProduct.cena,
            opis: opis || existingProduct.opis,
            ilość: ilość || existingProduct.ilość,
            jednostka_miary: jednostka_miary || existingProduct.jednostka_miary,
        };

        const result = await productsCollection.updateOne({ _id: new ObjectId(productId) }, { $set: updatedProduct });

        if (result.modifiedCount > 0) {
            res.json({ message: 'Produkt zaktualizowany pomyślnie' });
        } else {
            res.status(500).json({ error: 'Nie udało się zaktualizować produktu' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Sprawdź, czy istnieje produkt o podanym ID
        const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Produkt o podanym ID nie istnieje' });
        }

        // Usuń produkt
        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount > 0) {
            res.json({ message: 'Produkt usunięty pomyślnie' });
        } else {
            res.status(500).json({ error: 'Nie udało się usunąć produktu' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/inventory-report', async (req, res) => {
    try {
        // Użyj agregacji, aby uzyskać ilość poszczególnych produktów i ich łączną wartość
        const inventoryReport = await productsCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$cena', '$ilość'] } },
                    products: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalProducts: 1,
                    totalValue: 1,
                    products: {
                        $map: {
                            input: '$products',
                            as: 'product',
                            in: {
                                nazwa: '$$product.nazwa',
                                ilość: '$$product.ilość',
                                cena: '$$product.cena',
                                wartość: { $multiply: ['$$product.cena', '$$product.ilość'] }
                            }
                        }
                    }
                }
            }
        ]).toArray();

        if (inventoryReport.length > 0) {
            res.json(inventoryReport[0]);
        } else {
            res.json({ message: 'Brak danych do wygenerowania raportu' });
        }
    } catch (error) {
        console.error('Error generating inventory report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Uruchom serwer
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
