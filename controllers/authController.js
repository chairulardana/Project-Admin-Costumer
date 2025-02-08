const db = require('../config/db');
const bcrypt = require('bcrypt');

// Registrasi
const register = async (req, res) => {
    const { username, password, role } = req.body;

    // Cek apakah username sudah ada
    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserSql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ status: 'error', message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru ke database
        const insertUserSql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(insertUserSql, [username, hashedPassword, role], (err, results) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Database error' });
            }
            res.status(201).json({ status: 'success', message: 'User registered successfully' });
        });
    });
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ status: 'error', message: 'User not found' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ status: 'error', message: 'Invalid password' });
        }

        res.status(200).json({
            status: 'success',
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
};

module.exports = { register, login };