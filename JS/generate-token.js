// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const port = 3000;

// Replace with your actual values
const teamId = '76P4S4JL68';
const keyId = 'UBA8BYKDU9';
const privateKey = fs.readFileSync('AuthKey_UBA8BYKDU9.p8');

app.use(cors()); // Enable CORS for all routes

app.get('/generate-token', (req, res) => {
    const token = jwt.sign({}, privateKey, {
        algorithm: 'ES256',
        expiresIn: '1h', // Token expires in 1 hour
        issuer: teamId,
        header: {
            alg: 'ES256',
            kid: keyId
        }
    });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Token generation service running at http://localhost:${port}`);
});