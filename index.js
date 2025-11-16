import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const db = await mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'fruits'
});

app.get('/fruits', async (req, res) => {
	try {
		const [rows] = await db.query('SELECT * FROM fruits');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
	}
});

app.get('/fruits/:id', async (req, res) => {
	try {
		const [rows] = await db.query('SELECT * FROM fruits WHERE id = ?', [req.params.id]);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'A gyümölcs nem található' });
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
	}
});

app.post('/fruits', async (req, res) => {
	const { name, color, price } = req.body;
	if (!name || !color || price == null) {
		return res.status(400).json({ error: 'Hiányzó mezők' });
	}
	try {
		const [result] = await db.query('INSERT INTO fruits (name, color, price) VALUES (?, ?, ?)', [name, color, price]);
		res.status(201).json({ id: result.insertId, name, color, price });
	} catch (err) {
		res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
	}
});

app.put('/fruits/:id', async (req, res) => {
	const { name, color, price } = req.body;
	try {
		const [existing] = await db.query('SELECT * FROM fruits WHERE id = ?', [req.params.id]);
		if (existing.length === 0) {
			return res.status(404).json({ error: 'A gyümölcs nem található' });
		}
		await db.query('UPDATE fruits SET name = ?, color = ?, price = ? WHERE id = ?', [name, color, price, req.params.id]);
		res.json({ id: req.params.id, name, color, price });
	} catch (err) {
		res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
	}
});

app.delete('/fruits/:id', async (req, res) => {
	try {
		const [existing] = await db.query('SELECT * FROM fruits WHERE id = ?', [req.params.id]);
		if (existing.length === 0) {
			return res.status(404).json({ error: 'A gyümölcs nem található' });
		}
		await db.query('DELETE FROM fruits WHERE id = ?', [req.params.id]);
		res.json({ message: 'Gyümölcs törölve' });
	} catch (err) {
		res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
	}
});

app.listen(3000, () => {
	console.log('Szerver fut a 3000-es porton');
});