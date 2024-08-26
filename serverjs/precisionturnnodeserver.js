// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();
const port = process.env.PORT || 3000;

// Token Generation Values - Apple Maps JS SDK
const teamId = '76P4S4JL68';
const keyId = 'UBA8BYKDU9';
const privateKey = fs.readFileSync('AuthKey_UBA8BYKDU9.p8');

app.use(cors()); // Enable CORS for all routes

// Token generation endpoint
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

// Task retrieval endpoint
app.get('/tasks', (req, res) => {
    try {
        const fileContents = fs.readFileSync('../Data/tasks.yaml', 'utf8');
        const tasks = yaml.load(fileContents);
        //res.send(tasks);
        res.json(tasks);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error loading tasks');
    }
});

app.listen(port, () => {
    console.log(`Precision Turn Services Running at http://localhost:${port}`);
});